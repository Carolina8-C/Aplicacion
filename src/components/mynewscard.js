import {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity,FlatList, Linking} from "react-native";

export default function Mynewscard(){
  const [currnewsdata,setnewsdata] = useState();
  const mynewsdata = async()=>{
    try{
      const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=597687de1cd248b892f50b3c78469401');
      const MyNewsdata = await response.json();
      setnewsdata(MyNewsdata.articles)
    }catch (error){
      console.log(console.error)
    }
  }

  useEffect(()=>{
    mynewsdata();
  },[]);

  return(
    <FlatList
    data={currnewsdata}
    keyExtractor={(Item,index) => index}
    renderItem={({item,index})=>{
      return(
        <View style={styles.mynewscard}>
          <Text style={styles.newstitle}>    
            {item.title}
          </Text>
          <View styles={{flex:0, width:'100%', alignItems:'center' }}>
            <Image
              source={{ 
                uri: item.urlToImage, 
              }}
              style={{width:'100%', height:200}}
            />
          </View>

          <Text style={styles.newsdescription}>
            {item.description}
          </Text>

          <TouchableOpacity style={styles.readmorecontainer} onPress={()=>{Linking.openURL(item.url)}}>
            <Text style={styles.readmorebtn}>
              Leer Mas {">"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }}
    />
  );
}

const styles = StyleSheet.create({
  mynewscard:{
    borderColor:'#6c72cb',
    borderWidth: 2.8,
    backgroundColor:'#eeedf0',
    width:'95%',
    borderRadius:10,
    marginVertical:10,
  },
  newstitle:{
    fontSize:25,
    padding:5,
    fontWeight:'700',
  },
  newsdescription:{
    fontSize:17,
    margin:10,
  },
  readmorecontainer:{
    flex:0,
    flexDirection:'row',
    justifyContent:'center',

  },
  readmorebtn:{
    backgroundColor:'#6c72cb',
    color:'white',
    fontSize: 20,
    fontWeight:'700',
    margin: 10,
    padding: 10,
    borderRadius:10,
  },
});