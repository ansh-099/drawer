import _slicedToArray from"@babel/runtime/helpers/slicedToArray";import _objectSpread from"@babel/runtime/helpers/objectSpread";import _classCallCheck from"@babel/runtime/helpers/classCallCheck";import _createClass from"@babel/runtime/helpers/createClass";import _possibleConstructorReturn from"@babel/runtime/helpers/possibleConstructorReturn";import _getPrototypeOf from"@babel/runtime/helpers/getPrototypeOf";import _inherits from"@babel/runtime/helpers/inherits";var _jsxFileName="/Users/brentvatne/coding/react-navigation-drawer/src/views/Drawer.tsx";import*as React from'react';import{StyleSheet,I18nManager,Platform,Keyboard,StatusBar}from'react-native';import{PanGestureHandler,TapGestureHandler,State}from'react-native-gesture-handler';import Animated from'react-native-reanimated';var Clock=Animated.Clock,Value=Animated.Value,onChange=Animated.onChange,clockRunning=Animated.clockRunning,startClock=Animated.startClock,stopClock=Animated.stopClock,interpolate=Animated.interpolate,spring=Animated.spring,abs=Animated.abs,add=Animated.add,and=Animated.and,block=Animated.block,call=Animated.call,cond=Animated.cond,divide=Animated.divide,eq=Animated.eq,event=Animated.event,greaterThan=Animated.greaterThan,lessThan=Animated.lessThan,max=Animated.max,min=Animated.min,multiply=Animated.multiply,neq=Animated.neq,or=Animated.or,set=Animated.set,sub=Animated.sub;var TRUE=1;var FALSE=0;var NOOP=0;var UNSET=-1;var PROGRESS_EPSILON=0.05;var DIRECTION_LEFT=1;var DIRECTION_RIGHT=-1;var SWIPE_DISTANCE_THRESHOLD_DEFAULT=60;var SWIPE_DISTANCE_MINIMUM=5;var SPRING_CONFIG={damping:30,mass:0.5,stiffness:150,overshootClamping:true,restSpeedThreshold:0.001,restDisplacementThreshold:0.001};var DrawerView=function(_React$PureComponent){_inherits(DrawerView,_React$PureComponent);function DrawerView(){var _getPrototypeOf2;var _this;_classCallCheck(this,DrawerView);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this=_possibleConstructorReturn(this,(_getPrototypeOf2=_getPrototypeOf(DrawerView)).call.apply(_getPrototypeOf2,[this].concat(args)));_this.clock=new Clock();_this.isDrawerTypeFront=new Value(_this.props.drawerType==='front'?TRUE:FALSE);_this.isLocked=new Value(_this.props.locked?TRUE:FALSE);_this.isOpen=new Value(_this.props.open?TRUE:FALSE);_this.nextIsOpen=new Value(UNSET);_this.isSwiping=new Value(FALSE);_this.gestureState=new Value(State.UNDETERMINED);_this.touchX=new Value(0);_this.velocityX=new Value(0);_this.gestureX=new Value(0);_this.offsetX=new Value(0);_this.position=new Value(0);_this.containerWidth=new Value(0);_this.drawerWidth=new Value(0);_this.drawerOpacity=new Value(0);_this.drawerPosition=new Value(_this.props.drawerPosition==='right'?DIRECTION_RIGHT:DIRECTION_LEFT);_this.touchDistanceFromDrawer=cond(_this.isDrawerTypeFront,cond(eq(_this.drawerPosition,DIRECTION_LEFT),max(sub(sub(_this.touchX,_this.gestureX),_this.drawerWidth),0),min(multiply(sub(sub(_this.containerWidth,_this.drawerWidth),sub(_this.touchX,_this.gestureX)),DIRECTION_RIGHT),0)),0);_this.swipeDistanceThreshold=new Value(_this.props.swipeDistanceThreshold!==undefined?_this.props.swipeDistanceThreshold:SWIPE_DISTANCE_THRESHOLD_DEFAULT);_this.swipeVelocityThreshold=new Value(_this.props.swipeVelocityThreshold);_this.currentOpenValue=_this.props.open;_this.isStatusBarHidden=false;_this.manuallyTriggerSpring=new Value(FALSE);_this.transitionTo=function(isOpen){var toValue=new Value(0);var frameTime=new Value(0);var state={position:_this.position,time:new Value(0),finished:new Value(FALSE),velocity:new Value(0)};return block([cond(clockRunning(_this.clock),NOOP,[set(toValue,multiply(isOpen,_this.drawerWidth,_this.drawerPosition)),set(frameTime,0),set(state.time,0),set(state.finished,FALSE),set(state.velocity,_this.velocityX),set(_this.isOpen,isOpen),startClock(_this.clock),set(_this.manuallyTriggerSpring,FALSE)]),spring(_this.clock,state,_objectSpread({},SPRING_CONFIG,{toValue:toValue})),cond(state.finished,[set(_this.touchX,0),set(_this.gestureX,0),set(_this.velocityX,0),set(_this.offsetX,0),stopClock(_this.clock),call([_this.isOpen],function(_ref){var _ref2=_slicedToArray(_ref,1),value=_ref2[0];var open=Boolean(value);if(open!==_this.props.open){_this.toggleDrawer(_this.props.open);}})])]);};_this.dragX=block([onChange(_this.isOpen,call([_this.isOpen],function(_ref3){var _ref4=_slicedToArray(_ref3,1),value=_ref4[0];var open=Boolean(value);_this.currentOpenValue=open;if(open!==_this.props.open){if(open){_this.props.onOpen();}else{_this.props.onClose();}_this.pendingOpenValue=open;_this.forceUpdate();}})),onChange(_this.nextIsOpen,cond(neq(_this.nextIsOpen,UNSET),[cond(clockRunning(_this.clock),stopClock(_this.clock)),set(_this.isOpen,_this.nextIsOpen),set(_this.gestureX,0),set(_this.nextIsOpen,UNSET)])),onChange(_this.isSwiping,call([_this.isSwiping],function(_ref5){var _ref6=_slicedToArray(_ref5,1),value=_ref6[0];var keyboardDismissMode=_this.props.keyboardDismissMode;if(value===TRUE){if(keyboardDismissMode==='on-drag'){Keyboard.dismiss();}_this.toggleStatusBar(true);}else{_this.toggleStatusBar(_this.currentOpenValue);}})),cond(eq(_this.gestureState,State.ACTIVE),[cond(_this.isSwiping,NOOP,[set(_this.isSwiping,TRUE),set(_this.offsetX,_this.position)]),set(_this.position,add(_this.offsetX,_this.gestureX,_this.touchDistanceFromDrawer)),stopClock(_this.clock)],[set(_this.isSwiping,FALSE),set(_this.touchX,0),_this.transitionTo(cond(_this.manuallyTriggerSpring,_this.isOpen,cond(or(and(greaterThan(abs(_this.gestureX),SWIPE_DISTANCE_MINIMUM),greaterThan(abs(_this.velocityX),_this.swipeVelocityThreshold)),greaterThan(abs(_this.gestureX),_this.swipeDistanceThreshold)),cond(eq(_this.drawerPosition,DIRECTION_LEFT),greaterThan(cond(eq(_this.velocityX,0),_this.gestureX,_this.velocityX),0),lessThan(cond(eq(_this.velocityX,0),_this.gestureX,_this.velocityX),0)),_this.isOpen)))]),_this.position]);_this.translateX=cond(eq(_this.drawerPosition,DIRECTION_RIGHT),min(max(multiply(_this.drawerWidth,-1),_this.dragX),0),max(min(_this.drawerWidth,_this.dragX),0));_this.progress=cond(eq(_this.drawerWidth,0),0,abs(divide(_this.translateX,_this.drawerWidth)));_this.handleGestureEvent=event([{nativeEvent:{x:_this.touchX,translationX:_this.gestureX,velocityX:_this.velocityX,state:_this.gestureState}}]);_this.handleTapStateChange=event([{nativeEvent:{oldState:function oldState(s){return cond(and(eq(s,State.ACTIVE),eq(_this.isLocked,FALSE)),set(_this.manuallyTriggerSpring,TRUE));}}}]);_this.handleContainerLayout=function(e){return _this.containerWidth.setValue(e.nativeEvent.layout.width);};_this.handleDrawerLayout=function(e){_this.drawerWidth.setValue(e.nativeEvent.layout.width);_this.toggleDrawer(_this.props.open);requestAnimationFrame(function(){return _this.drawerOpacity.setValue(1);});};_this.toggleDrawer=function(open){if(_this.currentOpenValue!==open){_this.nextIsOpen.setValue(open?TRUE:FALSE);_this.currentOpenValue=open;}};_this.toggleStatusBar=function(hidden){var _this$props=_this.props,hideStatusBar=_this$props.hideStatusBar,statusBarAnimation=_this$props.statusBarAnimation;if(hideStatusBar&&_this.isStatusBarHidden!==hidden){_this.isStatusBarHidden=hidden;StatusBar.setHidden(hidden,statusBarAnimation);}};return _this;}_createClass(DrawerView,[{key:"componentDidUpdate",value:function componentDidUpdate(prevProps){var _this$props2=this.props,open=_this$props2.open,drawerPosition=_this$props2.drawerPosition,drawerType=_this$props2.drawerType,locked=_this$props2.locked,swipeDistanceThreshold=_this$props2.swipeDistanceThreshold,swipeVelocityThreshold=_this$props2.swipeVelocityThreshold,hideStatusBar=_this$props2.hideStatusBar;if(prevProps.locked!==locked){this.isLocked.setValue(locked?TRUE:FALSE);}if(typeof this.pendingOpenValue!=='boolean'||open!==this.pendingOpenValue){this.toggleDrawer(open);}this.pendingOpenValue=undefined;if(open!==prevProps.open&&hideStatusBar){this.toggleStatusBar(open);}if(prevProps.drawerPosition!==drawerPosition){this.drawerPosition.setValue(drawerPosition==='right'?DIRECTION_RIGHT:DIRECTION_LEFT);}if(prevProps.drawerType!==drawerType){this.isDrawerTypeFront.setValue(drawerType==='front'?TRUE:FALSE);}if(prevProps.swipeDistanceThreshold!==swipeDistanceThreshold){this.swipeDistanceThreshold.setValue(swipeDistanceThreshold!==undefined?swipeDistanceThreshold:SWIPE_DISTANCE_THRESHOLD_DEFAULT);}if(prevProps.swipeVelocityThreshold!==swipeVelocityThreshold){this.swipeVelocityThreshold.setValue(swipeVelocityThreshold);}}},{key:"componentWillUnmount",value:function componentWillUnmount(){this.toggleStatusBar(false);}},{key:"render",value:function render(){var _this2=this;var _this$props3=this.props,open=_this$props3.open,locked=_this$props3.locked,drawerPosition=_this$props3.drawerPosition,drawerType=_this$props3.drawerType,swipeEdgeWidth=_this$props3.swipeEdgeWidth,contentContainerStyle=_this$props3.contentContainerStyle,drawerStyle=_this$props3.drawerStyle,overlayStyle=_this$props3.overlayStyle,onGestureRef=_this$props3.onGestureRef,renderDrawerContent=_this$props3.renderDrawerContent,renderSceneContent=_this$props3.renderSceneContent;var right=drawerPosition==='right';var contentTranslateX=drawerType==='front'?0:this.translateX;var drawerTranslateX=drawerType==='back'?I18nManager.isRTL?multiply(this.drawerWidth,DIRECTION_RIGHT):this.drawerWidth:this.translateX;var offset=I18nManager.isRTL?'100%':multiply(this.drawerWidth,-1);var hitSlop=right?{right:0,width:open?undefined:swipeEdgeWidth}:{left:0,width:open?undefined:swipeEdgeWidth};return React.createElement(PanGestureHandler,{ref:onGestureRef,activeOffsetX:[-SWIPE_DISTANCE_MINIMUM,SWIPE_DISTANCE_MINIMUM],failOffsetY:[-SWIPE_DISTANCE_MINIMUM,SWIPE_DISTANCE_MINIMUM],onGestureEvent:this.handleGestureEvent,onHandlerStateChange:this.handleGestureEvent,hitSlop:hitSlop,enabled:!locked,__source:{fileName:_jsxFileName,lineNumber:514}},React.createElement(Animated.View,{onLayout:this.handleContainerLayout,style:styles.main,__source:{fileName:_jsxFileName,lineNumber:523}},React.createElement(Animated.View,{style:[styles.content,{transform:[{translateX:contentTranslateX}]},contentContainerStyle],__source:{fileName:_jsxFileName,lineNumber:527}},renderSceneContent({progress:this.progress}),React.createElement(TapGestureHandler,{onHandlerStateChange:this.handleTapStateChange,__source:{fileName:_jsxFileName,lineNumber:537}},React.createElement(Animated.View,{style:[styles.overlay,{opacity:interpolate(this.progress,{inputRange:[PROGRESS_EPSILON,1],outputRange:[0,1]}),zIndex:cond(greaterThan(this.progress,PROGRESS_EPSILON),0,-1)},overlayStyle],__source:{fileName:_jsxFileName,lineNumber:538}}))),React.createElement(Animated.Code,{exec:block([onChange(this.manuallyTriggerSpring,[cond(eq(this.manuallyTriggerSpring,TRUE),[set(this.nextIsOpen,FALSE),call([],function(){return _this2.currentOpenValue=false;})])])]),__source:{fileName:_jsxFileName,lineNumber:560}}),React.createElement(Animated.View,{accessibilityViewIsModal:open,removeClippedSubviews:Platform.OS!=='ios',onLayout:this.handleDrawerLayout,style:[styles.container,right?{right:offset}:{left:offset},{transform:[{translateX:drawerTranslateX}],opacity:this.drawerOpacity,zIndex:drawerType==='back'?-1:0},drawerStyle],__source:{fileName:_jsxFileName,lineNumber:570}},renderDrawerContent({progress:this.progress}))));}}]);return DrawerView;}(React.PureComponent);DrawerView.defaultProps={locked:false,drawerPostion:I18nManager.isRTL?'left':'right',drawerType:'front',swipeEdgeWidth:32,swipeVelocityThreshold:500,keyboardDismissMode:'on-drag',hideStatusBar:false,statusBarAnimation:'slide'};export{DrawerView as default};var styles=StyleSheet.create({container:{backgroundColor:'white',position:'absolute',top:0,bottom:0,width:'80%',maxWidth:'100%'},overlay:_objectSpread({},StyleSheet.absoluteFillObject,{backgroundColor:'rgba(0, 0, 0, 0.5)'}),content:{flex:1},main:{flex:1,overflow:'hidden'}});
//# sourceMappingURL=Drawer.js.map