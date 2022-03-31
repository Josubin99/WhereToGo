import { TouchableOpacity, StyleSheet, View, TextInput, Text, PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView from 'react-native-nmap';
const NaverMapScreen = (props) => {

    const [location, setLocation] = useState({
        latitude:0, longitude:0,
    });

    useEffect(() => {
        requestPermission();
        getLocation();
    }, []);

    async function requestPermission() {
        try{
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
        } catch (err) {
            console.log("위치정보 권한 요청 실패");
        }
    };

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            async (position) => {
                await setLocation(position.coords);
            },
            (error) => {
                console.log(error.message);
                getLocation();
            },
            {enableHighAccuracy: true, timeout:10000, maximumAge:1000},
        );
    };

    return(
        <View style={{flex:1}}>
            <NaverMapView 
                style={{width: '100%', height:'100%'}}
                showsMyLocationButton={true}
                center={{...location, zoom: 16}}>
            </NaverMapView>
            <View style={styles.textInputArea}>
                <TouchableOpacity style={styles.textArea} onPress={()=> props.navigation.navigate('SearchStation')}>
                    <Text style={styles.textInputStyle}>
                        역을 검색하세요
                    </Text>
                </TouchableOpacity>
                <Icon name="ios-search" size={25} color="black" style={styles.IconStyle}></Icon>
            </View>
        </View>
    );

};

const styles=StyleSheet.create({
    container: {
        backgroundColor:'white',
    },
    textInputArea: {
        backgroundColor:'white',
        position:'absolute',
        marginTop:30,
        paddingRight:15,
        borderWidth:3,
        borderColor:'#02343F',
        borderRadius:50,
        height:54,
        flexDirection:'row',
        alignItems:'center',
        left:10,
        margin:10
    },
    textInputStyle:{
        height:54,
        width:320,
        padding:15,
        color:"#DCDCDC",
    },
    IconStyle:{
        paddingLeft:10,
    }
})

export default NaverMapScreen;