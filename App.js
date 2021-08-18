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

import { NativeBaseProvider } from 'native-base';
import Theme from "./theme/theme";
const Tab = createBottomTabNavigator();
const App: () => Node = () => {
 

  return (
     <NativeBaseProvider theme={Theme}>
      <NavigationContainer>
        <Tab.Navigator 
        screenOptions={({route})=>({
          tabBarIcon: ({focused, color, size})=>{
            let iconName;
            if(route.name == "Spending"){
              iconName = focused ? 'analytics-sharp' : 'analytics-outline';
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
          activeTintColor: Theme.colors.primary["500"],
          inactiveTintColor: 'gray'
        }}>
          <Tab.Screen name="Spending" component={Home} />
          <Tab.Screen name="Chart" component={ChartView} />
          <Tab.Screen name="Add" component={AddExpense} />
        </Tab.Navigator>
      </NavigationContainer>
       </NativeBaseProvider>
  );
};



export default App;
