/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';


import {AppRegistry } from 'react-native';
import ReactNative from 'react-native';
var {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  PanResponder,
  View
} = ReactNative;

var NUM_ITEMS = 20;

class ScrollViewSimpleExample extends React.Component {
  static title = '<ScrollView>';
  static description = 'Component that enables scrolling through child components.';

  makeItems = (nItems: number, styles) => {
    var items = [];
    for (var i = 0; i < nItems; i++) {
       items[i] = (
         <TouchableOpacity key={i} style={styles}>
           <Text>{'Item ' + i}</Text>
         </TouchableOpacity>
       );
    }
    return items;
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const dx=Math.abs(gestureState.dx);
        console.log('onMoveShouldSetPanResponder',dx);
        return dx>20;//发生大于20的水平偏移时才作为响应者
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.{x,y}0 will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        const dx=gestureState.dx;
        console.log('onPanResponderMove',dx);
        this._scrollView.scrollTo({y: dx}); //左右移动hello控制大滚动试图
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  render() {
    const me=this;
    // One of the items is a horizontal scroll view
    var items = this.makeItems(NUM_ITEMS, styles.itemWrapper);
    items[4] = (
      <ScrollView key={'scrollView'} horizontal={true} >
        {this.makeItems(NUM_ITEMS, [styles.itemWrapper, styles.horizontalItemWrapper])}
      </ScrollView>
    );
    items[5] = (
      <View {...this._panResponder.panHandlers} style={styles.itemWrapper}>
      <Text>HELLO</Text>
      </View>
    );

    var verticalScrollView = (
      <ScrollView style={styles.verticalScrollView} ref={(scrollView) => { me._scrollView = scrollView; }}>
        {items}
      </ScrollView>
    );

    return verticalScrollView;
  }
}

var styles = StyleSheet.create({
  verticalScrollView: {
    margin: 10,
  },
  itemWrapper: {
    backgroundColor: '#dddddd',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#a52a2a',
    padding: 30,
    margin: 5,
  },
  horizontalItemWrapper: {
    padding: 50
  }
});

AppRegistry.registerComponent('AwesomeProject', () => ScrollViewSimpleExample);

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
