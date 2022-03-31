import React, {Component, useState, useEffect} from 'react';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import { SafeAreaView, View, Text } from 'react-native';
import axios from 'axios';
import proj4 from 'proj4';

const StationScreen = (props) => {

const [stationLatitude,setStationLatitude]=useState(0.0);
const [stationLongitude,setStationLongitude]=useState(0.0);

  useEffect(() => {
      const Station=props.route.params.station;
      getMapXY(Station);
      setTimeout(() => {
        props.navigation.navigate('CategoryScreen', {Station,stationLatitude,stationLongitude});
    }, 3500);
  }, [stationLatitude,stationLongitude]);

   
  const getMapXY= (Station) => {
        try{
            axios.get('https://openapi.naver.com/v1/search/local.json?query='+Station+'역'+'&display=1',
            { 
                headers: 
                { 
                'X-Naver-Client-Id': '8tizu2MTYk6dAb3nK_a4', 'X-Naver-Client-Secret': 'fJ0yme775W' 
                } 
            })
            .then(function (response) {
                const mapx=response.data.items[0].mapx;
                const mapy=response.data.items[0].mapy;
                console.log("좌표가져오기 성공");
                change(mapx,mapy);
            });
            } catch (err) {
                console.log(err.message);
            };
  }

  const change= (mapx,mapy) => {
      console.log(mapx+' '+mapy);
      proj4.defs('TM128','+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43');
      proj4.defs('WGS84', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
      var result=proj4('TM128','WGS84',[parseFloat(mapx),parseFloat(mapy)]);
                
      setStationLatitude(result[1]);
      console.log(stationLatitude);
      setStationLongitude(result[0]);
      console.log(stationLongitude);
  }

  const StationCoordinate = {latitude: stationLatitude, longitude: stationLongitude};

  return(
        <SafeAreaView style={{flex: 1}}>
            <NaverMapView
                style={{width: '100%', height: '100%'}}
                showsMyLocationButton={true}
                center={{...StationCoordinate, zoom: 15}}>
                <Marker coordinate={StationCoordinate} image={require("../Image/subway_Marker.png")} width={70} height={70}/>
            </NaverMapView>
        </SafeAreaView>
    );
};

export default StationScreen;