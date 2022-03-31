/* eslint-disable react-native/no-inline-styles */
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
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({navigation}) => {
  const preURL = require('../preURL/preURL');
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();


  const handleSubmitPress = () => {
    setErrortext('');
    if (!userId) {
      alert('아이디를 입력해주세요');
      return;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    setLoading(true);
    AsyncStorage.getItem('user', (err,result) => {
      const userInfo = JSON.parse(result);
      if (userId === userInfo.user_id && userPassword === userInfo.user_pw){
        navigation.replace('MainScreen2');
        console.log('Login success');
      } else {
        alert('다시 로그인 해주세요');
        console.log('Login fail');
      }

    });
  };

  return (
      <KeyboardAwareScrollView style={{flex:1, backgroundColor:'white'}}>
        <View>
          <Loader loading={loading} />
          <View style={styles.topArea}>
            <Image
                source={require('../Image/logo.png')}
                style={styles.logo}
            />
          </View>

          <View style={styles.formArea}>
            <TextInput
                style={styles.textForm}
                placeholder={'아이디'}
                onChangeText={(userId) => setUserId(userId)}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
            />
            <TextInput
                style={styles.textForm}
                onChangeText={(userPassword) => setUserPassword(userPassword)}
                secureTextEntry={true}
                placeholder={'비밀번호'}
                returnKeyType="next"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
            />
            {errortext != '' ? (
                <Text style={styles.TextValidation}> {errortext}</Text>
            ) : null}
          </View>

          <View style={styles.btnArea}>
            <TouchableOpacity style={styles.btn} onPress={handleSubmitPress}>
              <Text style={{color:'#F0EDCC', fontSize: wp('5%')}}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Register')}>
              <Text style={{color:'#F0EDCC', fontSize: wp('5%')}}>회원가입</Text>
            </TouchableOpacity>
          </View>
          <Text onPress={()=> navigation.navigate('Recommendation')}>
            아이콘 추가
          </Text>
          <Text onPress={()=> navigation.navigate('Favorite')}>
            찜목록
          </Text>
        </View>

      </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor:'white',
  },

  topArea: {
    justifyContent: 'center',
    alignItems:'center',
  },

  logo: {
    width:wp(100),
    height:hp(20),
    resizeMode:'contain',
    marginTop:80,
  },

  formArea: {
    justifyContent:'center',
    alignItems:'center',
    marginTop:30
  },

  textForm: {
    borderWidth: 2,
    borderColor: '#02343F',
    borderRadius: 50,
    width: wp(78),
    height: hp(8),
    paddingLeft: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },

  btnArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop:40,
    marginLeft:40,
    marginRight:40
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

export default LoginScreen;