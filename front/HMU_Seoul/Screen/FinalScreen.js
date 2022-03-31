import {StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image, Pressable} from 'react-native';
import React, {Component, useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'react-native-axios';

const FinalScreen = (props) => {

const [station, setStation]=useState(props.route.params.Station);
const [stores, setStores]=useState([]);
const [category, setCategory]=useState(props.route.params.Selected);
const [cg_split, setCg_Split]=useState(' ');
const [selectedId, setSelectedId] = useState(null);

var dict={}
dict['산책']='공원'; dict['힐링']='공원'; dict['영화']='영화관'; dict['역사']='박물관'; 
dict['예술']='미술관'; dict['작품']='전시회'; dict['액티비티']='볼링'; dict['분위기']='카페';
dict['맛집']='음식점'; dict['신앙']='교회'; dict['공방']='공방'; 
dict['오락']='pc방'; dict['응원']='야구장'; dict['봉사']='헌혈'; 
dict['지식']='도서관'; dict['아늑함']='만화방';  


 
  useEffect(() => {
      console.log('가져오기 : '+ category);
      splitCategory(); 
      requestSearch();
      return () => {

    }
  }, []);


    const goToSimilarity = () => {
        const Selected=props.route.params.Selected;
        props.navigation.navigate('SimilarityScreen', {station, Selected});
    }

    function splitCategory() {
      let sc = ' ';
      for(let i=0; i<category.length; i++){
        sc=sc+category[i]+', ';
      }    
      sc = sc.replace(/,\s$/, '');

      setCg_Split(sc);
    }

    function rename(name) {
      name = name.replace('<b>', '');
      name = name.replace('</b>', '');
      return name;
    }

    const selectedCategory = () => {
    var sc = '';
    for(let i=0; i<category.length; i++){
        sc= category[i]+', ';
    }

    console.log(sc);
    
  }

  const requestSearch = () => {
      for(let keyword of category){
          console.log(dict[keyword]);
        try{
            axios.get('https://openapi.naver.com/v1/search/local.json?query='+station+'역 '+dict[keyword]+'&display=5',
            { 
                headers: 
                { 
                    'X-Naver-Client-Id': '8tizu2MTYk6dAb3nK_a4', 
                    'X-Naver-Client-Secret': 'fJ0yme775W',
                }, 
            },
            )
            .then( (res) => {
                    console.log(dict[keyword]+'장소가져오기 성공');
                    res.data.items.map((item, i) => {
                    item.name = rename(item.title);
                    setStores( stores => [...stores, item]);
                });
                console.log(dict[keyword]+" 검색 완료");
              });
        } catch (err) {
            console.log('requestSearch 오류 : '+err.message);
        };
      }
     }

     const Item = ({item, onPress, backgroundColor, textColor})=> (
        <TouchableOpacity style={[styles.item, backgroundColor]} onPress={onPress}>
            <Text style={[styles.title, textColor]}>{item.name}</Text>
            <Text style={[styles.text, textColor]}>{item.roadAddress}</Text>
            <Text style={[styles.text, textColor]}>{item.address}</Text>
            <Text style={[styles.text, textColor]}>{item.category}</Text>
        </TouchableOpacity>   
    );

    const renderItem = ({ item }) => {
    const backgroundColor = item.name === selectedId ? "#02343F" : "white";
    const color = item.name === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        name={item.name}
        text={item.text}
        onPress={() => setSelectedId(item.name)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };


    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize:14, color:'white'}}> 선택하신 키워드는  
            <Text style={{fontSize:17, color:'#F0EDCC',fontWeight:'bold'}}> {cg_split} </Text> 
            입니다!</Text> 
        </View>

        <FlatList
          data={stores}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          extraData={selectedId}
          style={styles.flatlistArea}>
        </FlatList>

        <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.btn}><Text style={{fontSize:14, color:'#F0EDCC'}} onPress={()=> goToSimilarity()}>다른장소 추천받기</Text></TouchableOpacity>
        </View>

      </View>
    );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  header: {
  backgroundColor: '#02343F',
  height:hp(7),
  padding:14,
  alignItems: 'center',
  textAlign:'justify'  
  },

  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom:15,
  },

  text: {
    fontSize: 12,
    marginBottom:12,
  },

  btn: {
      width: wp(36),
      height:hp(7),
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#02343F',
    },

    bottomArea: {
      justifyContent:'center',
      alignItems:'center',
      flex:0.01,
      marginBottom:30
    },

    flatlistArea: {
      flex: 0.99
    }

});

export default FinalScreen;