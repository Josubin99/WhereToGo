import React, {useState, createRef, useEffect} from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import 'react-native-gesture-handler';
import Loader from './Components/Loader';
import SelectChip from './Components/SelectChip';

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

import { Button, RadioButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';


var radioButtonsData = [
    {label: 'param1', value: 'True' },
    {label: 'param2', value: 'False' }
];

const CategoryScreen = (props) => {
    const loading = useState(false);
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    const [checked, setChecked] = useState('first');
    const [userAge, setUserAge] = useState('');
    const [userGender, setUserGender] = useState('');
    const [selectedChips, setSelectedChips]=useState([]);
    
    
    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

    const placeholder = {
        label: '동행자의 연령대를 선택해주세요',
        value: null,
    };
    const placeholder2 = {
        label: '동행자의 성별을 선택해주세요',
        value: null,
    };

    const goToFinal = () => {
        const Station=props.route.params.Station;
        const Latitude=props.route.params.stationLatitude;
        const Longitude=props.route.params.stationLongitude;
        const Selected=selectedChips;
        props.navigation.navigate('FinalScreen', {Station,Latitude,Longitude,Selected});
    }

    const getSelectedChips = (chips) => {
        setSelectedChips(chips);
    }

    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <View style={styles.topArea}>
                <View style={styles.titleArea}>
                    <Text style={styles.titleText}>{props.route.params.Station}</Text>
                    <Text style={styles.Text}>(으)로 떠나볼까요?</Text>
                </View>
            </View> 

            <View style={styles.textArea}>
                <Text style={{fontSize:20, color: '#02343F',fontWeight:'bold'}}>어떤 활동을 원하시나요?</Text>
                <Text style={{fontSize:15, color:'#A5A5A5', marginTop:hp(1)}}>한 가지 이상 필수 선택</Text>
            </View>

            <View style={styles.chipArea}>
                <SelectChip initialChips={["산책","힐링","영화","역사","예술","작품","액티비티","분위기","맛집","신앙","공방","오락","응원","봉사","지식","아늑함"]} 
                            getStation={props.route.params.Station} 
                            onChangeChips={getSelectedChips} 
                            alertRequired={false}
                            />
            </View>
            
            <View style={styles.choiceArea}>
                <Text style={{marginTop:10,fontSize:20, color: '#02343F',fontWeight:'bold'}}>동행자가 있으신가요?</Text>
                
                <View style ={styles.radioArea}>
                     <RadioButton
                        value="first"
                        status={ checked === 'first' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('first')}
                        uncheckedColor="gray"
                        color="#02343F"/>
                    <Text style={{marginRight:30, fontSize:16}}>예</Text>
                    <RadioButton
                        value="second"
                        status={ checked === 'second' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('second')}
                        uncheckedColor="gray"
                        color="#02343F"
                    />
                    <Text style={{fontSize:16}}>아니요</Text>
                </View>

                <View style={styles.textFormFive}>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={(userAge) => setUserAge(userAge)}
                        placeholder={placeholder}
                        items={[
                            {label: '10대', value: 1},
                            {label: '20대', value: 2},
                            {label: '30대', value: 3},
                            {label: '40대', value: 4},
                            {label: '50대', value: 5},
                            {label: '60대 이상', value: 6},
                        ]}
                    />
                </View>
                
                <View style={styles.textFormFive}>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        placeholder={placeholder2}
                        onValueChange={(userGender) => setUserGender(userGender)}
                        items={[
                            {label: '남자', value: 1},
                            {label: '여자', value: 2},
                        ]}
                    />
                </View>
            </View>
            <View style={styles.bottomArea}>
                <TouchableOpacity style={styles.btn}><Text style={{fontSize:14, color:'#F0EDCC'}} onPress={()=> goToFinal()}>추천장소 보러가기</Text></TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, //전체의 공간을 차지한다는 의미
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent : 'center',

    },

    topArea: {
        flex: 1.2,
        alignItems:'center',
        justifyContent:'center',
    },

    titleArea: {
        width:wp(85),
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'row',
        borderBottomWidth:0.8,
        borderBottomColor:'#A5A5A5', 
    },

    textArea: {
        flex: 1.1,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
    },

    titleText: {
        fontSize:wp(5),
        color:'#02343F',
        fontWeight:'bold',
        marginTop:hp(1.2)
    },
    
    Text: {
        fontSize:20,
        color:'#000000',
        fontWeight:'bold',
        marginTop:10,
        marginLeft:10,
    },

    chipArea: {
        flex:1.7,
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
    },

    choiceArea: {
        flex:2.8,
        flexDirection:'column',
        alignItems:'center',
        justifyContent: 'center',
    },

    radioArea:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        marginTop:10
    },

    textFormFive: {
        marginTop:10,
        borderWidth: 3,
        borderColor: '#02343F',
        borderRadius: 30,
        width: wp(65),
        height: hp(7),
        justifyContent:'center',
        alignItems:'center'
    },

    bottomArea: {
        justifyContent:'center',
        alignItems:'center',
        flex:0.8,
        marginBottom:18
    },

    btn: {
    width: wp(36),
    height:hp(7),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#02343F',
  },
});

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        borderWidth: 3,
        backgroundColor:'black',
        color: 'black',
        height: hp(8),
        width: wp(86),
    }
});

export default CategoryScreen;