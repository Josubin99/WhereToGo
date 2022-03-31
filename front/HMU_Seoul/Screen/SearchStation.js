import React, {useEffect, useState} from 'react';
import {Alert, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, View, Text, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Subway from '../Data/subway.json';

const SearchStation = ({navigation}) => {
    const [filterData, setFilterData] = useState(Subway.DATA);
    const [masterData, setMasterData] = useState(Subway.DATA);
    const [search, setSearch] = useState('');

    const searchFilter = (text) => {
        if(text) {
            const newData = masterData.filter((item) => {
                const itemData = item.line_num + item.station_nm;
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilterData(newData);
            setSearch(text);
        } else {
            setFilterData(masterData);
            setSearch(text);
        }
    }

    const renderItem = ({item}) => {
        return(
            <View style={styles.itemViewStyle}>
                <Icon name="ios-search" size={23} color="black" style={styles.itemImage}></Icon>
                <Text style={styles.itemStyle} onPress = {goToCategory.bind(this,item)}>
                    {item.line_num+' '+item.station_nm}
                </Text>
            </View>
        )
    }

    const ItemSeparatorView = () => {
        return(
            <View style={{alignItems:'flex-end'}}>
                <View style={{height:0.8, width:'88%', backgroundColor:'#424242'}}/>
            </View>
        )
    }

    const clearInput = () => {
        setFilterData(masterData);
        setSearch('');
    }

    const goToCategory = (item) => {
        const Station = item.line_num+' '+item.station_nm;
        navigation.navigate('Recommendation', {screen:'StationScreen', params: {station:Station}});
    }

    return(
            <View style={styles.container}>
                <View style={styles.textInputArea}>
                    <TouchableOpacity>
                        <Icon name="ios-chevron-back-outline" size={30} color="black" style={styles.IconStyle}></Icon>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInputStyle}
                        value={search}
                        placeholder="역을 검색하세요"
                        underlineColorAndroid="transparent"
                        onChangeText={(text)=>searchFilter(text)}
                    />
                    <TouchableOpacity onPress={() => clearInput()}>
                        <Icon name="ios-close-circle" size={25} color="#DCDCDC" style={styles.IconStyle}></Icon>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filterData}
                    keyExtractor={(item,index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={renderItem}
                    disableVirtualization={false}/>
            </View>
    );
};

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    },
    itemStyle: {
        paddingLeft:55
    },
    itemViewStyle:{
        flexDirection:'row',
        alignItems:'center',
        height:70,
    },
    itemImage:{
        position:'absolute',
        left:15,
    },
    textInputArea:{
        marginTop:30,
        borderWidth:3,
        borderColor:'#02343F',
        borderRadius:50,
        height:54,
        flexDirection:'row',
        alignItems:'center',
        margin:10
    },
    textInputStyle:{
        height:54,
        paddingLeft:18,
        width:300,
    },
    IconStyle:{
        paddingLeft:10,
    }
});

export default SearchStation;