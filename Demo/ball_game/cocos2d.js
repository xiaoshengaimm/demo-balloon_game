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

 (function(){
 	var d = document;
 	var c = {
 		COCOS2d_DEBUG:2,
 		box2d:false,
 		chipmunk:false,
 		showFPS:true,
 		frameRate:60,
 		tag:'gameCanvas',
 		engineDir:'../../cocos2d/',
 		appFiles:['src/myApp_2.js', 'src/myApp.js']
 	};
 	window.addEventListener('DOMContentLoaded', function(){
 		var s = d.createElement('script');
 		if(c.SingleEngineFile && !c.engineDir){
 			s.src = c.SingleEngineFile;
 		} else if (c.engineDir && !c.SingleEngineFile){
 			s.src = c.engineDir + 'platform/jsloader.js';
 		} else {
 			window.alert('you must sepcify eigher the single engine file or the engine directory in ');
 		}

 		document.ccConfig = c;
 		s.id = "cocos2d-html5";
 		d.body.appendChild(s);
 	});
 })();