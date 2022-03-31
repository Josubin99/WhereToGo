import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

const Favorite = ({navigation}) => {
    // RN에서 ListView 용도의 컴포넌트
    // 1. FlatList
    // 2. SectionList
    const [liked, setLiked]=useState(false);
 
      const DATA = [
            {name:"상상과자점", message:"서울 노원구 동일로 186길 77-7", img: require('../Image/like_real.png')},
            {name:"서울과학기술대학교", message:"서울 노원구 공릉로 232", img: require('../Image/like_real.png')},
            {name:"중국집", message:"서울 노원구 공릉로 51길 7 2층", img: require('../Image/like_real.png')},
            {name:"지지고 과기대점", message:"서울 노원구 공릉로 225", img: require('../Image/like_real.png')},
            {name:"써브웨이 공릉점", message:"서울 노원구 공릉로 207", img: require('../Image/like_real.png')},
            {name:"베리모어", message:"서울 노원구 공릉로 208", img: require('../Image/like_real.png')},
            {name:"맥도날드 과학기술대점", message:"서울 노원구 공릉로 231 중앙빌딩", img: require('../Image/like_real.png')},
            {name:"샐러디 공릉점", message:"서울 노원구 공릉로 203", img: require('../Image/like_real.png')},

    ];

    const ItemView=({item})=>{
    return(
      <TouchableOpacity style={style.itemView} onPress={()=>{alert(item.name);}}>
        <Image source={item.img} style={style.itemImg}></Image>
        <View style={{flexDirection:'column', marginLeft:10}}>
          <Text style={style.itemName}>{item.name}</Text>
          <Text style={style.itemMsg}>{item.message}</Text>
        </View>
      </TouchableOpacity>
  
    );
    }

    return(
      <View style={style.root}>
        <View style={style.titleArea}>
           <Text style={style.titleText}>즐겨찾기</Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={ItemView}
          keyExtractor={item=>item.name}>
        </FlatList>
      </View>
    );
    }
  
const style= StyleSheet.create({
  root:{flex:1,backgroundColor:'white'},
  
  titleArea: {
      height:hp(12),
      justifyContent: 'center',
      alignItems:'center',
      borderBottomWidth:2,
      borderBottomColor:'#A5A5A5', 
    },
  
  titleText:{
      fontSize:25,
      color: '#02343F',
      fontWeight:'bold'

  },

  itemView:{
    flexDirection: 'row',
    borderBottomWidth:1, 
    borderBottomColor:'#A5A5A5',
    alignItems:'center',
    height:hp(12),
    padding:16,
  },

  itemImg:{
    width:30,
    height:30,
    resizeMode:'cover',
    marginRight:8,
  },
  itemName:{
    fontSize:20,
    fontWeight:'bold',
  },
  itemMsg:{
    fontSize:16,
  },
});


export default Favorite;