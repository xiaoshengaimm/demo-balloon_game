/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var MySprite = cc.Sprite.extend({
	_touchEnabled:false,
	_touchBegin:false,
	_frameLeft:0,
	_frameTop:0,
	_frameWidth:85,
	_frameHeight:100,
	_count:0,
	ctor:function(){
		this._super();
		this.getRandColor();
		this._frame1 = cc.SpriteFrame.create("res/images/a_balloon.png", cc.rect(
			this._frameLeft, this._frameTop, this._frameWidth, this._frameHeight));
		this.initWithSpriteFrame(this._frame1);
		var action = cc.ScaleTo.create(0.2, 1.1, 1.1);
		var actionBack = cc.ScaleTo.create(0.2, 1.0, 1.0);
		this.runAction(cc.RepeatForever.create(cc.Sequence.create(action, actionBack)));
		this.setTouchEnabled(true);
		this.setAnchorPoint(cc.p(0, 0));
	},
	touchRect:function(){
		return this.getBoundingBox();
		//return this.getTextureRect();
		//return this.getBoundingBoxToWorld();
	},
	isTouchSprite:function(touches){
		console.log(touches[0]);
		return cc.Rect.CCRectContainsPoint(this.touchRect(), touches[0].getLocation());
	},
	onTouchesEnded:function(touches, event){
		if(this.isTouchSprite(touches)){
			if(this._fallAction){
				this._fallAction.stop();  //停止下落动作
			}
			var s = cc.Director.getInstance().getWinSize();
			var action = cc.MoveTo.create(1, cc.p(0, 500));
			this.runAction(action);
		}
	},
	setTouchEnabled:function(enabled){
		if(enabled && !this._touchEnabled){
			cc.Director.getInstance().getTouchDispatcher().addStandardDelegate(this, 0);
			this._touchEnabled = true;
		} else if(!enabled && this._touchEnabled){
			cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
			this._touchEnabled = false;
		}
	},
	onTouchesBegan:function(touches, event){
		/*if(this.isTouchSprite(touches)){
		}*/
	},
	updateSprite:function(){
		this._count += 1;
		if(this._count >= 6){
			this._count = 0;
		}
		this._frameLeft = (this._count % 3) * this._frameLeft;
		this._frameTop = Math.floor(this._count / 3) * this._frameHeight;
		this._frame1.setRect(cc.rect(this._frameLeft, this._frameTop, this._frameWidth, this._frameHeight));
	},
	fall:function(left, height){
		this.setPosition(cc.p(left, height));
		this._fallAction = cc.MoveTo.create(4, cc.p(left, -200));
		this.runAction(this._fallAction);
	},
	getRandColor:function(){
		var r = Math.floor(Math.random() * 6);
		if(r == 2 || r >= 6){
			r = 0;
		}
		this._frameLeft = (r % 3) * this._frameWidth;
		this._frameTop = Math.floor(r / 3) * this._frameHeight;
	}
});

var myLayer = cc.Layer.extend({
	init:function(){
		this._super();
		var size = cc.Director.getInstance().getWinSize();

		var layer1 = cc.LayerColor.create(cc.c4(255, 255, 0, 255), size.width, size.height);
		layer1.setPosition(cc.p(0, 0));
		this.addChild(layer1);

		var layer2 = cc.LayerColor.create(cc.c4(255, 0, 0, 58), 100, 100);
		layer2.setPosition(cc.p(0, 0));
		this.addChild(layer2);

		/*var sprite1 = cc.Sprite.create("res/images/a_balloon.png");
		console.log(sprite1);
		sprite1.setPosition(cc.p(size.width/2, size.height/2));*/

		this.setKeyboardEnabled(true); 
		this.setTouchEnabled(true);

		this.makeBalloons();
		return true;
	},
	onTouchesEnded:function(touches){
		
	},
	onKeyDown:function(key){
		//console.log(key);
	},
	makeBalloons:function(){
		var that = this,
			s = cc.Director.getInstance().getWinSize();
		window.setInterval(function(){
			var r = Math.random(),
				left = s.width * r;
			if(left < 85 || left > s.width - 85){
				return;
			}
			var sprite = new MySprite();
			sprite.fall(left, s.height);
			that.addChild(sprite);
		}, 800);
		/*var sprite = new MySprite();
		sprite.setPosition(cc.p(100, 100));
		that.addChild(sprite);*/
	}
});

var myScene = cc.Scene.extend({
 	onEnter:function(){
 		this._super();
 		var layer = new myLayer();
 		layer.init();
 		this.addChild(layer);
 	}
 });
