import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import { fetchCurrencyLatest, convertCurrencyAPI } from '../components/api';
const screen = Dimensions.get('window');

const App = () => {
  const [currencyList, setCurrencyList] = useState([]);
  const [open, setOpen] = useState(false);
  const [ targetOpen, setTargetOpen ] = useState(false);
  const [sourceAmount, setSourceAmount] = useState("0");
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetAmount, setTargetAmount] = useState("0");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCurrencyLatest()
      .then(list => setCurrencyList(list))
  }, [])

  const convertCurrency = (amount, sourceCurrency, targetCurrency) => {
    setLoading(true);
    convertCurrencyAPI(amount, sourceCurrency, targetCurrency)
      .then(data => {
        const { rates } = data;
        setTargetAmount(String(rates[targetCurrency]));
        setLoading(false);
      })
  }

  return (
    <SafeAreaView>
      <View>
        <View
          style={styles.mainContainer}
        >
          <Text style={styles.textHeader}>Convertidor de monedas</Text>
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
            <View style={styles.inputContainer}>
              <Text style={styles.text}>Cantidad</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={value => setSourceAmount(value)}
                value={sourceAmount}
                keyboardType="numeric"
              />
              <View>
                <Text style={styles.text}>Seleccionar moneda base</Text>
                <DropDownPicker
                  style={styles.textInput}
                  onChangeText={value => setSourceCurrency(value)}
                  open={open}
                  value={sourceCurrency}
                  items={currencyList.map(currency => ({
                    label: currency,
                    value: currency,
                  }))}
                  setOpen={setOpen}
                  setValue={setSourceCurrency}
                  placeholder="Seleccionar moneda"
                  zIndex={1000}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>Resultado</Text>
              <TextInput
                style={styles.textInput}
                editable={false}
                value={targetAmount}
              />
              <View>
                <Text style={styles.text}>Seleccionar moneda a cotizar</Text>
                <DropDownPicker
                  style={styles.textInput}
                  onChangeText={value => setTargetCurrency(value)}
                  open={targetOpen}
                  value={targetCurrency}
                  items={currencyList.map(currency => ({
                    label: currency,
                    value: currency,
                  }))}
                  setOpen={setTargetOpen}
                  setValue={setTargetCurrency}
                  placeholder="Seleccionar moneda"
                />
              </View>
            </View>
            <View>
              {
                loading
                  ? <ActivityIndicator color="#6c72cb" size="large" />
                  : <Button onPress={() => convertCurrency(sourceAmount, sourceCurrency, targetCurrency)} color="#6c72cb" title="Convertir" />
              }
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    height: 800,
    backgroundColor: "#17181f",
    alignContent:"center",
    justifyContent:"center"
    
  },
  textInput: {
    marginBottom: 15,
    backgroundColor: "#F0F0F0",
    color: "#6c72cb"
  },
  textHeader: {
    color: "#eeedf0",
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 18,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoBackground: {
    width: screen.width * 0.45,
    height: screen.width * 0.45,
  },
  logo: {
    position: 'absolute',
    width: screen.width * 0.25,
    height: screen.width * 0.25,
  },
  text: {
    fontSize: 18,
    color: "#cb69c1",
    textAlign: 'center',
 
  },
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default App;