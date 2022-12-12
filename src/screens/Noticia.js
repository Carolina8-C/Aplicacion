import * as React from 'react';
import { Text, View, StyleSheet,Image, TouchableOpacity } from 'react-native';
import {StatusBar} from 'expo-status-bar';

import Mynewscard from "../components/mynewscard";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color:'#eeedf0',fontSize:40, fontWeight:'700',padding:1}}>
        News
      </Text>
      <View style={styles.allnewscontainer}>
        <Mynewscard/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#6c72cb',
    alignContent: 'center',
    marginTop:40,
  },
  allnewscontainer:{
    marginTop:10,
    flex:1,
    backgroundColor:'#17181f',
    width:'100%',
    alignItems:'center',
  },
});
