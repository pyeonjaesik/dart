import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

import HomeScreen from './component/HomeScreen';
import MgScreen from './component/MgScreen';
import MgaScreen from './component/MgaScreen';
import LoginScreen from './component/LoginScreen';
import SetNameScreen from './component/SetNameScreen';
import SetPassScreen from './component/SetPassScreen';
import PostScreen from './component/PostScreen';
import PickerScreen from './component/PickerScreen';
import MissionScreen from './component/MissionScreen';
import MscpScreen from './component/MscpScreen';
import AlarmScreen from './component/AlarmScreen';
import SettingScreen from './component/SettingScreen';
import PayScreen from './component/PayScreen';
import ExchangeScreen from './component/ExchangeScreen';

const store = createStore(reducers);

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Mg: {
      screen: MgScreen,
    },
    Mga: {
      screen: MgaScreen,
    },
    Login: {
      screen: LoginScreen
    },
    SetName:{
      screen: SetNameScreen
    },
    SetPass:{
      screen: SetPassScreen
    },
    Post:{
      screen: PostScreen 
    },
    Picker:{
      screen: PickerScreen
    },
    Mission:{
      screen: MissionScreen 
    },
    Mscp:{
      screen: MscpScreen 
    },
    Alarm:{
      screen: AlarmScreen 
    },
    Setting:{
      screen: SettingScreen
    },
    Pay:{
      screen: PayScreen
    },
    Exchange:{
      screen: ExchangeScreen
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}