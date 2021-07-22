/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from "./screens/Home"
import ChartView from "./screens/ChartView"
import AddExpense from "./screens/AddExpense";

const Tab = createBottomTabNavigator();
const App: () => Node = () => {
 

  return (
      <NavigationContainer>
        <Tab.Navigator 
        screenOptions={({route})=>({
          tabBarIcon: ({focused, color, size})=>{
            let iconName;
            if(route.name == "Home"){
              iconName = focused ? 'home' : 'home-outline';
            }
            else if(route.name == "Chart"){
              iconName = focused ? 'pie-chart' : 'pie-chart-outline';
            }
            else{
              iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
        })}
        tabBarOptions={{
          activeTintColor: '#FF0000',
          inactiveTintColor: 'gray'
        }}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Chart" component={ChartView} />
          <Tab.Screen name="Add" component={AddExpense} />
        </Tab.Navigator>
      </NavigationContainer>
  );
};



export default App;
