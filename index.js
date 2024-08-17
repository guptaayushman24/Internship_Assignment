// import { useEffect, useState } from "react";
// import { Text, View ,StyleSheet,Image,FlatList, TextInput} from "react-native";
// import axios from  'axios';
import Test from './Screens/test'
import Cart from './Screens/Cart'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { Provider } from 'react-redux';
// import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import store from './store'
const Tab = createBottomTabNavigator();
export default function Index() {


  return(

   
    <Provider store={store}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Test} />
        <Tab.Screen name="Cart" component={Cart} />
      </Tab.Navigator>
  </Provider>
);
}
const style = StyleSheet.create({
  main:{
    flex:1,
  }
})

