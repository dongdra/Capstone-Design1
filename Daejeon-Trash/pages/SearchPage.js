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
  const mapRef = useRef(null);

  useEffect(() => {
    getLocationAsync();
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
      </MapView>
    </View>
  );
}

export default SearchPage;
