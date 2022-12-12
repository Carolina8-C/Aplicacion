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
  Dimensions,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { StatusBar } from 'expo-status-bar';
import Hyperlink from 'react-native-hyperlink';
import dayjs from "dayjs";



export default class Vista_Dolar_Observado extends React.Component {
  state = {
    dataDolar: '',
  }
  componentDidMount = () => {
    //var date = new Date();
    //var fecha = new Date();
    //const formatDate = (date)=>{
    //let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1)  + "-" + date.getDate() 
    //return formatted_date;
    //}
    //const formato = (fecha)=>{
    //let formato_date = fecha.getFullYear() + "-" + (fecha.getMonth() + 1)  + "-" + (fecha.getDate() - 7)
    //return formato_date;
    //}
    //console.log(formatDate(date));
    //console.log(formato(fecha));
    var fechita= dayjs(new Date()).format('YYYY-MM-DD');
    console.log(fechita);
    fetch(`https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=196998594&pass=mCHniBD5Qcs6&firstdate=2022-12-05&lastdate=${fechita}&timeseries=F073.TCO.PRE.Z.D&function=GetSeries`,{
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson.Series.Obs[0]);
      //console.log(responseJson.Series.Obs);
      console.log(responseJson);
      this.setState({
        dataDolar: responseJson.Series.Obs[0]
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render(){
    const mesActual = new Date();
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre",     "Octubre", "Noviembre", "Diciembre"];
    console.log(meses[mesActual.getMonth()]);
    return (
      <View style={styles.container}>
        <Text style={styles.title1}>
          MoneyView!
        </Text>
        <Text style={styles.title2}>
          Grafico de los ultmos dias
        </Text>
        <Text style={styles.paragraph}>
          {meses[mesActual.getMonth()]}
        </Text>
        <LineChart
          data={{
            labels:["05","06","07","09","12"],
            datasets: [
              {
                data: [
                  "881.87",
                  "886.26",
                  "884.74",
                  "878.58",
                  "861.51",
                  ],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={240}
          yAxisLabel="$"
          //yAxisSuffix="clp"
          xAxisLabel="d"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#5d64c7',
            backgroundGradientFrom: '#6c72cb',
            backgroundGradientTo: '#a8aded',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#cb69c1',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
       
        <SafeAreaView style={styles.container2}>
          <Text style={styles.sectionTittle}>
            Link para ver grafico
          </Text>
          <Hyperlink linkDefault ={true} >
            <Text style={styles.sectionDes}>
              Hacer click en https://si3.bcentral.cl/Bdemovil/BDE/Series/MOV_SC_TC1?nombreItem=D%C3%B3lar%20observado%20&nombrePadre=Series%20m%C3%A1s%20consultadas&idPadre=x&parametroMenu=Index&idMenuTree=MS1 
            </Text>
          </Hyperlink>
        </SafeAreaView>
        <View>
          <Text style={styles.title3}>
            Informacion sobre el Dolar observado
          </Text>
        </View>
        <View>
          <Text style={styles.title4}>
            Es un promedio ponderado por los volúmenes de las operaciones del mercado al contado (mercado spot) entre el CLP (Peso chileno) y USD (Dólar americano) realizadas en el mercado cambiario formal de divisas. 
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#17181f' 
  },
  title1: {
    frontSize: 20,
    color: '#eeedf0',
    marginTop: 26,
    padding: 18,
    backgroundColor: '#6c72cb',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  title2: {
    frontSize: 70,
    color: '#cb69c1',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  title3: {
    frontSize: 18,
    marginTop: 8,
    color: '#eeedf0',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title4: {
    fontSize: 11,
    fontWeight: '350',
    marginTop: 6,
    color: '#eeedf0',
  },
  paragraph: {
    margin: 5,
    fontSize: 18,
    color: '#eeedf0',
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  container2: {
    flex: 0.45,
    backgroundColor: '#cb69c1'
  },
  sectionTittle: {
    fontSize: 15,
    marginTop: 2,
  },
  sectionDes: {
    fontSize: 10,
    fontWeight: '350',
    marginTop: 8,
    backgroundColor: '#eeedf0',
    textDecorationLine: 'underline'
  },
});