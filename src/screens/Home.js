import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Text,View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Lista_Monedas from '../screens/Lista_Monedas';
import Vista_Dolar_Observado from '../screens/Vista_Dolar_Observado';
import Vista_Euro from '../screens/Vista_Euro';
import Vista_Libra_esterlina from '../screens/Vista_Libra_esterlina';

const Stack = createStackNavigator()

export default function Home(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Lista_Monedas" component={Lista_Monedas}/>
      <Stack.Screen name="Vista_Dolar_Observado" component={Vista_Dolar_Observado}/>
      <Stack.Screen name="Vista_Euro" component={Vista_Euro}/>
      <Stack.Screen name="Vista_Libra_esterlina" component={Vista_Libra_esterlina}/>
    </Stack.Navigator>
    
  );
}