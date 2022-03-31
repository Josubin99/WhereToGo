import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import NaverMapScreen from './NaverMapScreen';
import Favorite from './Favorite';
import MyPage from '../Screen/MyPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigator() {
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
            <Tab.Screen name="NaverMap" component={NaverMapScreen}/>
            <Tab.Screen name="Favorite" component={Favorite}/>
            <Tab.Screen name="My Page" component={MyPage}/>
        </Tab.Navigator>
    )
}