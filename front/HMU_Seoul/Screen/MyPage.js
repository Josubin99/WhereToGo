import React, {useState, createRef} from 'react';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { RadioButton } from 'react-native-paper';
import 'react-native-gesture-handler';
import RNPickerSelect,{defaultStyles} from 'react-native-picker-select';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var radio_props = [
    {label: 'param1', value: 0 },
    {label: 'param2', value: 1 }
];

const MyPage = (props) => {
    const preURL = require('../preURL/preURL');

    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordchk, setUserPasswordchk] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [errortext2, setErrortext2] = useState('');
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
    const [checked, setChecked] = React.useState('first');

    const idInputRef = createRef();
    const ageInputRef = createRef();
    const passwordInputRef = createRef();
    const passwordchkInputRef = createRef();
    const nameInputRef = createRef();

    const placeholder = {
        label: '연령대를 선택해주세요',
        value: null,
    };

    const handleSubmitButton = () => {
        setErrortext('');

        if (!userName) {
            alert('이름을 입력해주세요');
            return;
        }
        if (!userId) {
            alert('id를 입력해주세요');
            return;
        }
        if (!userAge) {
            alert('연령대를 선택해주세요');
            return;
        }

        if (!userPassword) {
            alert('비밀번호를 입력해주세요');
            return;
        }
        if (userPasswordchk != userPassword) {
            alert('비밀번호가 일치하지 않습니다');
            return;
        }
        //Show Loader
        setLoading(true);

        let dataToSend = {
            user_name: userName,
            user_id: userId,
            user_age: userAge,
            user_pw: userPassword,
        };
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('http://localhost:8081/api/user/register', {
            method: 'POST',
            headers: {
                //Header Defination
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body:formBody
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                setErrortext2('');
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status === 'success') {
                    setIsRegistraionSuccess(true);
                    console.log('Registration Successful. Please Login to proceed');
                } else if (responseJson.status === 'duplicate') {
                    setErrortext2('이미 존재하는 아이디입니다.');
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };

    if (isRegistraionSuccess) {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}} />
                <View style={{flex: 2}}>
                    <View
                        style={{
                            height: hp(13),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Image
                            source={require('../Image/logo.png')}
                            style={{
                                height: wp(20),
                                resizeMode: 'contain',
                                alignSelf: 'center',
                            }}
                        />
                    </View>
                    <View
                        style={{
                            height: hp(7),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{color: 'black', fontSize: wp('4%')}}>
                            수정이 완료되었습니다.
                        </Text>
                    </View>

                    <View style={{height: hp(20), justifyContent: 'center'}}>
                        <View style={styles.btnArea}>
                            <TouchableOpacity
                                style={styles.btn}
                                activeOpacity={0.5}
                                onPress={() => props.navigation.navigate('Login')}>
                                <Text style={{color: 'white', fontSize: wp('4%')}}>
                                    로그인하기
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
return (
    <KeyboardAwareScrollView style={{flex:1, backgroundColor:'white'}}>
        <View style={styles.container}>
            <Loader loading={loading} />
            <View style={styles.topArea}>
                <View style={styles.titleArea}>
                    <Text style={{fontSize:25, color: '#02343F',fontWeight:'bold'}}> 마이페이지 </Text>
                </View>
            </View>

            <View style={styles.formArea}>
                <TextInput
                    style={styles.textForm}
                    placeholder={'아이디(5자 이상, 영문, 숫자)'}
                    onChangeText={(UserId) => setUserId(UserId)}
                    ref={idInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        passwordInputRef.current && passwordInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                />
                <View style={{justifyContent: 'center'}}>
                {errortext2 !== '' ? (
                    <Text style={styles.TextValidation}>{errortext2}</Text>
                ) : null}
                </View>
                <TextInput
                    style={styles.textForm}
                    secureTextEntry={true}
                    placeholder={'비밀번호(8자 이상)'}
                    onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                    ref={passwordInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        passwordchkInputRef.current && passwordchkInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                />
                <TextInput
                    style={styles.textForm}
                    secureTextEntry={true}
                    placeholder={'비밀번호 확인'}
                    onChangeText={(UserPasswordChk) =>
                        setUserPasswordchk(UserPasswordChk)
                    }
                    ref={passwordchkInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        nameInputRef.current && nameInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                />
                <View style={{backgroundColor:'white'}}>
                    {userPassword !== userPasswordchk ? (
                        <Text style={styles.TextValidation}>
                            비밀번호가 일치하지 않습니다.
                        </Text>
                    ) : null}
                </View>

                <TextInput
                    style={styles.textForm}
                    placeholder={'이름'}
                    onChangeText={(UserName) => setUserName(UserName)}
                    ref={nameInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        ageInputRef.current && ageInputRef.current.focus()
                    }
                    blurOnSubmit={false}      
                />

                <View style={styles.radioArea}>
                    <RadioButton
                        value="first"
                        status={ checked === 'first' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('first')}
                        uncheckedColor="gray"
                        color="#02343F"
                    />
                    <Text style ={styles.radioText}>남자</Text>
                    <RadioButton
                        value="second"
                        status={ checked === 'second' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('second')}
                        uncheckedColor="gray"
                        color="#02343F"
                    />
                    <Text style ={styles.radioText}>여자</Text>
                </View>

                <View style={styles.textForm}>
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
            </View>

            <View style={styles.btnArea}>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmitButton}>
                        <Text style={{color: '#F0EDCC', fontSize: wp('4%')}}>수정하기</Text>
                    </TouchableOpacity>
            </View>
        </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, //전체의 공간을 차지한다는 의미
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center'
    },

    topArea: {
        flex:1,
        justifyContent : 'center',
        alignItems:'center',
        marginTop:10
    },

    titleArea: {
        flex:1,
        width:wp(100),
        height:hp(10),
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'row',
        borderBottomWidth:1,
        borderBottomColor:'#A5A5A5', 
    },

    TextValidation: {
        fontSize: wp('4%'),
        marginTop:10,
        color: 'red',
        marginBottom:-5,
    },

    formArea: {
        justifyContent: 'center',
        alignItems:'center',
        marginTop:10
    },

    textForm: {
        borderWidth: 2,
        borderColor: '#02343F',
        borderRadius: 50,
        width: wp(75),
        height: hp(8),
        paddingLeft: 25,
        marginTop:20
    },

    radioArea:{
        flexDirection: 'row',
        marginTop:15,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:-5
    },

    radioText:{
        marginLeft:10,
        marginRight:10
    },

    btnArea: {
        flex:1,
        height:hp(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:12
    },
    
    btn: {
        width: wp(30),
        height:hp(7),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#02343F',
    },
});

const pickerSelectStyles = StyleSheet.create({

    inputAndroid: {
        borderWidth: 3,
        borderColor: '#02343F',
        backgroundColor:'black',
        color: 'black',
        height: hp(8),
        width: wp(86),
    },
    iconContainer: {
        top: 10,
        right: 12,
    },
});

export default MyPage;