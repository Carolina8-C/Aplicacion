import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Button } from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import dayjs from "dayjs";


function GoToButton({ screenName }) {
    const navigation = useNavigation();
  
    return (
      <Button
        title={`Mas informacion`}
        resizeMode="contain"
        onPress={() => navigation.navigate(screenName)}
        color="#cb69c1"
      />
    );
}

export default class App extends React.Component {
  
  state = {
    dataDolar: '',
    dataEuro:'',
    dataLibra:''
  }
  componentDidMount = () => {
    //var date = new Date();
    //const formatDate = (date)=>{
    //let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1)  + "-" + date.getDate() 
    //return formatted_date;
    //}
    //console.log(formatDate(date));
    var fechita= dayjs(new Date()).format('YYYY-MM-DD');
    console.log(fechita);
    fetch(`https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=196998594&pass=mCHniBD5Qcs6&firstdate=${fechita}&lastdate=${fechita}&timeseries=F073.TCO.PRE.Z.D&function=GetSeries`,{
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson.Series.Obs[0].value);
      //console.log(responseJson.Series.Obs);
      console.log(responseJson);
      this.setState({
        dataDolar: responseJson.Series.Obs[0]
      })
    })
    .catch((error) => {
      console.error(error);
    });
    fetch(`https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=196998594&pass=mCHniBD5Qcs6&firstdate=${fechita}&lastdate=${fechita}&timeseries=F072.CLP.EUR.N.O.D&function=GetSeries`,{
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson.Series.Obs[0].value);
      //console.log(responseJson.Series.Obs);
      console.log(responseJson);
      this.setState({
        dataEuro: responseJson.Series.Obs[0]
      })
    })
    .catch((error) => {
      console.error(error); 
    }); 
    fetch(`https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=196998594&pass=mCHniBD5Qcs6&firstdate=${fechita}&lastdate=${fechita}&timeseries=F072.CLP.GBP.N.O.D&function=GetSeries`,{
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson.Series.Obs[0].value);
      //console.log(responseJson.Series.Obs);
      console.log(responseJson);
      this.setState({
        dataLibra: responseJson.Series.Obs[0]
      })
    })
    .catch((error) => {
      console.error(error); 
    }); 
    
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title1}>
          MoneyView!
        </Text>
        {this.state.isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <View>
              <Text style={styles.title2}>
                Dolar Observado:
              </Text>
              <View style={styles.image}>
                <FontAwesome5 name="dollar-sign" size={35} color="#eeedf0"  />
              </View>
              <Text style={styles.title3}>
                {' '}
                Valor actual: 1 dolar = {this.state.dataDolar.value} CLP
              </Text>
            </View>
            <View style={styles.container2}>
              <GoToButton screenName="Vista_Dolar_Observado" />
            </View>
          </View>
        )}

        {this.state.isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <View>
              <Text style={styles.title2}>
                Euro:
              </Text>
              <View style={styles.image}>
                <FontAwesome5 name="euro-sign" size={35} color="#eeedf0" />
              </View>
              <Text style={styles.title3}>
                {' '}
                Valor actual: 1 euro = {this.state.dataEuro.value} CLP
              </Text>
            </View>
            <View style={styles.container2}>
              <GoToButton screenName="Vista_Euro" />
            </View>
          </View>
        )}

        {this.state.isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <View>
              <Text style={styles.title2}>
                Libra Esterlina:
              </Text>
              <View style={styles.image}>
                <FontAwesome5 name="pound-sign" size={35} color="#eeedf0" />
              </View>
              <Text style={styles.title3}>
                {' '}
                Valor actual: 1 libra = {this.state.dataLibra.value} CLP
              </Text>
            </View>
            <View style={styles.container2}>
              <GoToButton screenName="Vista_Libra_esterlina" />
            </View>
          </View>
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#17181f' 
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title1: {
    frontSize: 18,
    color: '#eeedf0',
    marginTop: 13,
    padding: 13,
    backgroundColor: '#6c72cb',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  title2: {
    frontSize: 30,
    color: '#cb69c1',
    marginTop: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  title3: {
    frontSize: 30,
    color: '#eeedf0',
    marginTop: 10,
    backgroundColor: '#6c72cb',
    textAlign: 'center',
    marginEnd: 50,
    marginRight: 50,
    marginLeft: 50,
  },
  // subtitle: {
  //   frontSize: 30,
  //   color: '#eeedf0',
  //   textAlign: 'center',
  //   marginEnd: 50,
  //   marginLeft: 50,
  // },
  image: {
    height: 50,
    width: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
    //borderRadius: 2,
    //borderWidth: 3,
    //borderColor: '#d4a413',
  },
  // button: {
  //   frontSize: 30,
  //   color: '#eeedf0',
  //   marginTop: 10,
  //   backgroundColor: '#17181f',
  //   textAlign: 'center',
  //   marginEnd: 50,
  //   marginRight: 70,
  //   marginLeft: 50,
  //   resizeMode: 'contain',
  //   borderRadius: 15,
  //   borderWidth: 5,
  //   borderColor: '#6c72cb',
  // },
});
