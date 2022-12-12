import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import Noticia from '../screens/Noticia';
import Cambio from '../screens/Cambio';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#cb69c1",
        tabBarInactiveTintColor: "#b5b5b5",
        tabBarStyle: {
          backgroundColor: "black"
        }
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="ios-home" size={focused ? 27 : 25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Noticia'
        component={Noticia}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name="newspaper" size={focused ? 27 : 25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Cambio'
        component={Cambio}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Fontisto name="money-symbol" size={focused ? 27 : 25} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
