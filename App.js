import React, { Component } from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from './src/redux';
import JobList from './src/screens/JobList'
import BluetoothList from './src/screens/BluetoothList'
import BluetoothDetail from './src/screens/BluetoothDetail'

const AppNavigator = createStackNavigator({
  JobList: JobList,
  BluetoothList: BluetoothList,
  BluetoothDetail: BluetoothDetail,
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

/*const BluetoothStack = createStackNavigator({
  BluetoothList: BluetoothList,
})

const AppNavigator = createSwitchNavigator({
  DemoSelect: DemoSelect,
  Jobs: JobsStack,
  Bluetooth: BluetoothStack,
},{
  initialRouteName: 'DemoSelect',
})*/

const AppNavigatorContainer = createAppContainer(AppNavigator);

const client = axios.create({})
const middleware = [thunk, axiosMiddleware(client)]
const store = createStore(reducer, applyMiddleware(...middleware));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigatorContainer />
      </Provider>
    );
  }
}
