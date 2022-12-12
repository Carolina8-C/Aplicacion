import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from '../navigation/BottomTab';

const screen = Dimensions.get('window');

function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Button
      title={`Comenzar`}
      onPress={() => navigation.navigate(screenName)}
      color="#6c72cb"
    />
  );
}

const Welcome = () => {
  return (
    <View style={styles.container2}>
      <Text style={styles.textHeader}>MoneyView! </Text>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/pentagon-purple.png')}
          resizeMode="contain"
          style={styles.logoBackground}
        />
        <Image
          source={require('../assets/images/simbolo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <Image
        source={{ uri: 'https://acegif.com/wp-content/gifs/coin-flip-43.gif' }}
        style={styles.image2}
      />
      <Text style={styles.textHeader2}> </Text>
      <GoToButton screenName="BottomTab" />
    </View>
  );
};
const styles = StyleSheet.create({
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929',
  },
  textHeader: {
    color: '#eeedf0',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  textHeader2: {
    color: '#eeedf0',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 1,
  },
  image2: {
    height: 50,
    width: 50,
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logoBackground: {
    width: screen.width * 0.5,
    height: screen.width * 0.5,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    position: 'absolute',
    width: screen.width * 0.3,
    height: screen.width * 0.3,
  },
});
export default Welcome;
