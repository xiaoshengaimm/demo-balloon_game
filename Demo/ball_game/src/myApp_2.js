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

 var myLayer2 = cc.Layer.extend({
 	init:function(){
 		var s = cc.Director.getInstance().getWinSize();
 		var greenLayer = cc.LayerColor.create(cc.c4(0, 255, 0, 255), s.width, s.height);
 		var menuLabel1 = cc.LabelTTF.create("help", "Arial", 20);
 		var menuItem1 = cc.MenuItemLabel.create(menuLabel1, this.menuSelected, this);
 		

 		var menuLabel2 = cc.LabelTTF.create("begin", "Arial", 20);
 		var menuItem2 = cc.MenuItemLabel.create(menuLabel2, this.transitionSence, this);
 		menuItem2.setColor(cc.c3(0, 0, 0));

 		menuItem1.setPosition(cc.p(0,30));
 		menuItem2.setPosition(cc.p(0, -30));
 		var menu = cc.Menu.create(menuItem1, menuItem2); 

 		greenLayer.addChild(menu);
 		this.addChild(greenLayer);
 		return true;
 	},
 	menuSelected:function(m){
 		window.alert("click the balloon if you are a man!");
 	},
 	transitionSence:function(){
 		var tranScene = cc.TransitionMoveInL.create(0.5, new myScene());
 		cc.Director.getInstance().replaceScene(tranScene);
 	}
 });

 var myScene2 = cc.Scene.extend({
 	onEnter:function(){
 		this._super();
 		var layer = new myLayer2();
 		layer.init();
 		this.addChild(layer);
 	}
 });