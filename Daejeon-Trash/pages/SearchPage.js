// SearchPage.js
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

// 스타일 정의
const styles = StyleSheet.create({
  MapContainer: {
    backgroundColor: "white",
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MapStyle: {
    width: "90%",
    height: 550,
  },
});

// Home 컴포넌트
const SearchPage = () => {
  const [location, setLocation] = useState(null);
  const [trashLocations, setTrashLocations] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    getLocationAsync();
    fetchTrashLocations();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Location permission not granted');
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
        zoom: 10,
      });
    }
  };

  const fetchTrashLocations = async () => {
    try {
      const response = await fetch('http://172.30.1.79:3000/api/newtrashlocations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 요청 본문에 필요한 경우 데이터 전송
        body: JSON.stringify({}),
      });
      const data = await response.json();
      setTrashLocations(data);
    } catch (error) {
      console.error('Error fetching trash locations:', error);
    }
  };

  return (
    <View style={styles.MapContainer}>
      {/* 지도 */}
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: location ? location.latitude : 37.5665,
          longitude: location ? location.longitude : 126.9780,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        rotateEnabled={true}
        showsUserLocation={true}
        style={styles.MapStyle}
      >
        {/* 사용자 위치 마커 표시 */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}

        {/* 휴지통 위치 마커 표시 */}
        {trashLocations.map((trashLocation, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(trashLocation.latitude),
              longitude: parseFloat(trashLocation.longitude),
            }}
            pinColor="blue" // 마커 색상을 파란색으로 설정
          />
        ))}
      </MapView>
    </View>
  );
}

export default SearchPage;
