
import React from 'react';
import 'react-native-gesture-handler';
import {SafeAreaView, StyleSheet} from 'react-native';

import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegisterScreen from './Screen/RegisterScreen';
import Navigator from './Screen/Navigator';
import SearchStation from './Screen/SearchStation';
import NaverMapScreen from './Screen/NaverMapScreen';
import StationScreen from './Screen/StationScreen';
import CategoryScreen from './Screen/CategoryScreen';
import FinalScreen from './Screen/FinalScreen';
import SimilarityScreen from './Screen/SimilarityScreen';
import ThirdRecScreen from './Screen/ThirdRecScreen';
import Favorite from './Screen/Favorite';
import MyPage from './Screen/MyPage';

import Ionicons from 'react-native-vector-icons/Ionicons'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const Main = () => {
  return(

        <Tab.Navigator initialRouteName="NaverMap"
            tabBarOptions = {{
                activeTintColor: "#02343F",
                inactiveTintColor: "#696969",
                style: {
                    height: 68,
                    paddingBottom: 7,
                },
            }}
            screenOptions = {({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let iconColor;

                    if(route.name === 'NaverMap'){
                        iconName = focused
                            ? 'ios-map'
                            : 'ios-map-outline';
                        iconColor = focused ? "#02343F" : '#696969';
                    } else if (route.name === 'Favorite') {
                        iconName = focused ? 'ios-heart' : 'ios-heart-outline';
                        iconColor = focused ? '#02343F' : '#696969';
                    } else if (route.name === 'My Page') {
                        iconName = focused ? 'ios-people' : 'ios-people-outline';
                        iconColor = focused ? '#02343F' : '#696969'; 
                    }

                    return <Ionicons name={iconName} size={30} color={iconColor} />;
                },
            })}>
            <Tab.Screen name="NaverMap" component={NaverMap}/>
            <Tab.Screen name="Favorite" component={Favorite}/>
            <Tab.Screen name="My Page" component={MyPage}/>
        </Tab.Navigator>
    );
};

const NaverMap = () => {
  return (
    <Stack.Navigator initialRouteName="NaverMapScreen">
      <Stack.Screen
        name="NaverMap"
        component={NaverMapScreen}
        options={{title:'', headerShown:false}}/>
      <Stack.Screen
        name="SearchStation"
        component={SearchStation}
        options={{title:'', headerShown:false}}
      />
    </Stack.Navigator>
  );
};

const Recommendation = () => {
  return (
    <Stack.Navigator initialRouteName="StationScreen">
      <Stack.Screen
          name="NaverMap"
          component={NaverMap}
          options={{title:'', headerShown:false}}
      />
      <Stack.Screen
        name="StationScreen"
        component={StationScreen}
        options={{title: '', headerShown:false}}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{title: '', headerShown:false}}
      />
      <Stack.Screen
        name="FinalScreen"
        component={FinalScreen}
        options={{title: '', headerShown:false}}
      />
      <Stack.Screen
        name="SimilarityScreen"
        component={SimilarityScreen}
        options={{title: '', headerShown:false}}
      />
      <Stack.Screen
        name="ThirdRecScreen"
        component={ThirdRecScreen}
        options={{title: '', headerShown:false}}
      />
    </Stack.Navigator>
  );
};

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: '', headerShown:false}}
      />
    </Stack.Navigator>
  );
};

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator>
       {/* SplashScreen which will come once for 5 Seconds */}
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          /> */}
            <Stack.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />
          {/* Search Navigator: Include Search and Recommendation */}
            <Stack.Screen
              name="Recommendation"
              component={Recommendation}
              options={{headerShown: false}}
              initialParams={{Station:''}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
