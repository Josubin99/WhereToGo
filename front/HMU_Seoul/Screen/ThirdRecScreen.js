import {StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image, Pressable} from 'react-native';
import React, {Component, useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'react-native-axios';

const ThirdRecScreen = (props) => {

const [station, setStation]=useState(props.route.params.Station);
const [stores, setStores]=useState([]);
const [age, setAge]=useState('20대 여자');
const [selectedId, setSelectedId] = useState(null);

var dict={}
dict['10대 남자']='박물관'; dict['10대 여자']='공원'; dict['20대 남자']='영화관'; dict['20대 여자']='공원'; 
dict['30대 남자']='야구장'; dict['30대 여자']='미술관'; dict['40대 남자']='카페'; dict['40대 여자']='공방';
dict['50대 남자']='카페'; dict['50대 여자']='교회'; dict['60대 남자']='공방'; dict['60대 여자']='pc방';

 
  useEffect(() => {
      requestSearch();
      return () => {
    }
  }, []);

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
        try{
            axios.get('https://openapi.naver.com/v1/search/local.json?query='+station+'역 '+dict[age]+'&display=5',
            { 
                headers: 
                { 
                    'X-Naver-Client-Id': '8tizu2MTYk6dAb3nK_a4', 
                    'X-Naver-Client-Secret': 'fJ0yme775W',
                }, 
            },
            )
            .then( (res) => {
                    console.log(dict[age]+'장소가져오기 성공');
                    res.data.items.map((item, i) => {
                    item.name = rename(item.title);
                    setStores( stores => [...stores, item]);
                });
                console.log(dict[age]+" 검색 완료");
              });
        } catch (err) {
            console.log('requestSearch 오류 : '+err.message);
        };
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
          <Text style={{fontSize:14, color:'white'}}> 성별, 연령에 따른 추천 결과입니다. </Text>
        </View>

        <FlatList
          data={stores}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          extraData={selectedId}
          style={styles.flatlistArea}>
        </FlatList>

        <View style={styles.bottomArea}>
            <TouchableOpacity style={styles.btn}><Text style={{fontSize:14, color:'#F0EDCC'}} onPress={()=>props.navigation.replace('Main')}>메인화면으로 이동</Text></TouchableOpacity>
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

export default ThirdRecScreen;