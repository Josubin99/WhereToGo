/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import React, {useState, createRef} from 'react';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import Loader from './Components/Loader';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Modal,
    ScrollView,
    Platform,
} from 'react-native';

const SubwayScreen = ({navigation}) => {
    const loading = useState(false);
    return (
    <View style={styles.container}>
        <Loader loading={loading} />
        <View style={styles.topArea}>
            <View style={styles.titleArea}>
                <Image
                    source={require('../Image/subway_logo.png')}
                    style={{
                        height:hp(7),
                        resizeMode:'contain',
                        alignItems : 'flex-start',
                    }}
                />
                <Text style={{fontSize:25, color: '#02343F',fontWeight:'bold',marginTop:hp(1),alignItems:'center'}}>지하철 노선도</Text>
            </View>
        </View>
        <View style={{marginLeft:-30}}>
            <Image
                source={require('../Image/line2.png')}
                style={{
                    width:wp(120),
                    height: hp(1),
                    resizeMode: 'contain',
                }}
            />
        </View>
        <View>
            <Image
                source={require('../Image/subway.png')}
                style={{
                    height:hp(50),
                    width:wp(100),
                    resizeMode:'contain',
                }}
                />
        </View>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1, //전체의 공간을 차지한다는 의미
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    topArea: {
        flex: 0.35,
        paddingTop: wp(0),
        justifyContent : 'flex-start',
        paddingLeft : wp(0),
    },
    titleArea: {
        flex: 0.55,
        justifyContent: 'flex-start',
        paddingTop: wp(5),
        flexDirection: 'row',
    },
    TextArea: {
        flex: 0.3,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    Text: {
        fontSize: wp('7%'),
        paddingBottom: wp('3%'),
    },
    TextValidation: {
        fontSize: wp('4%'),
        color: 'red',
        paddingTop: wp(2),
    },
});

export default SubwayScreen;