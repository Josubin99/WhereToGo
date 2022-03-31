import React, {Component, useState, useEffect} from 'react';

import { SafeAreaView,StyleSheet,StatusBar, View, Text,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { style } from 'styled-system';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const SimilarityScreen = (props) => {

    const [station, setStation]=useState(props.route.params.station);
    const [stores, setStores]=useState([]);
    const [category, setCategory]=useState(props.route.params.Selected);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    var dict={}
    dict['산책']="011001"; dict['힐링']="011001"; dict['영화']="100110"; dict['역사']="100111";
    dict['예술']="100111"; dict['작품 ']="100111"; dict['액티비티']="111110"; dict['분위기']="110101";
    dict['맛집']="110101"; dict['신앙']="100010"; dict['공방']="100111";
    dict['오락']="110100"; dict['응원']="011111"; dict['봉사']="100000";
    dict['지식']="100110"; dict['아늑함']="100110";

    useEffect(() => {
        userFeature();
        return () => {

        }

    }, []);

    const goToThird = () => {
        props.navigation.navigate('ThirdRecScreen', {station});
    }

    async function userFeature() {
        console.log(category);
        console.log("첫벗째 : "+dict[category[0]].toString(2));
        console.log("두번째 : "+dict[category[1]].toString(2));
        let feature= parseInt("000000",2);
        if(category.length<=2){
            for(let i=0; i<category.length; i++) {
                feature = (parseInt(feature,2) | parseInt(dict[category[i]],2)).toString(2);
            }
        } else {
            for(let i=0; i<category.length; i++) {
                console.log(parseInt(dict[category[i]],2).toString(2));
                feature = (parseInt(feature,2) ^ parseInt(dict[category[i]],2)).toString(2);
                console.log(feature);
            }
        }

        let dataToSend = { user_feature : feature};
        let formBody = [];
        for(let key in dataToSend){
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

            await fetch('http://10.0.2.2:3000/feature/recommend', {
            method : 'POST',
            body : formBody,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });

            await axios.get('http://10.0.2.2:3000/result/', {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then(async (res) => {
                console.log(res.data);
                var arr=[];
                arr[0]= await res.data.feature_one;
                arr[1]= await res.data.feature_two;
                arr[2]= await res.data.feature_three;
                arr[3]= await res.data.feature_four;
                await requestSearch(arr);
            })
    };

    function rename(name) {
        name = name.replace('<b>', '');
        name = name.replace('</b>', '');
        return name;
    }

    function requestSearch(arr) {
        for(let keyword of arr){
            console.log(keyword);
            try{
                axios.get('https://openapi.naver.com/v1/search/local.json?query='+station+'역 '+keyword+'&display=5',
                    {
                        headers:
                            {
                                'X-Naver-Client-Id': '8tizu2MTYk6dAb3nK_a4',
                                'X-Naver-Client-Secret': 'fJ0yme775W',
                            },
                    },
                )
                    .then( (res) => {
                        console.log(keyword+'장소가져오기 성공');
                        res.data.items.map((item, i) => {
                            item.name = rename(item.title);
                            setStores( stores => [...stores, item]);
                        });
                        console.log(keyword+" 검색 완료");
                    });
            } catch (err) {
                console.log('requestSearch 오류 : '+err.message);
            };
        }
    }

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
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

    return (
        <View style={styles.container}>
            <FlatList
                data={stores}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={selectedId}
                style={styles.flatlistArea}>
            </FlatList>

            <View style={styles.bottomArea}>
                <TouchableOpacity style={styles.btn}><Text style={{fontSize:14, color:'#F0EDCC'}} onPress={()=> goToThird()}> 메인화면으로 이동 </Text></TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },

    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

    title: {
        fontSize: 12,
        marginBottom:15,
    },

    text: {
        fontSize: 10,
        marginBottom:5,
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


export default SimilarityScreen;