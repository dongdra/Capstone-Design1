//Home.js
import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

//스타일 정의
const styles = StyleSheet.create({
  MapContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MapStyle: {
    width: "90%",
    height: 390,
  },
  zoomButtonContainer: {
    position: 'absolute',
    flexDirection: 'column',
    top: 5,
    left: 20,
  },
  zoomButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  markerImage: {
    width: 35,
    height: 45,
  },
});

//Home 컴포넌트
const Home = () => {
  const [location, setLocation] = useState(null);
  const [trashcans, setTrashcans] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(15);
  const mapRef = useRef(null);

  useEffect(() => {
    getLocationAsync();
    fetchTrashcans();
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
        zoom: zoomLevel,
      });
    }
  };

  const fetchTrashcans = async () => {
    try {
      const response = await fetch('http://172.20.10.2:3000/api/trashcans', {  //
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      setTrashcans(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleZoomIn = () => {
    const newZoomLevel = zoomLevel + 1;
    setZoomLevel(newZoomLevel);
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: location ? {
          latitude: location.latitude,
          longitude: location.longitude,
        } : {
          latitude: 37.78825,
          longitude: -122.4324,
        },
        zoom: newZoomLevel,
      });
    }
  };

  const handleZoomOut = () => {
    const newZoomLevel = zoomLevel - 1;
    setZoomLevel(newZoomLevel);
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: location ? {
          latitude: location.latitude,
          longitude: location.longitude,
        } : {
          latitude: 37.78825,
          longitude: -122.4324,
        },
        zoom: newZoomLevel,
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.MapContainer}>
      {/* 지도*/}
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
          {/* 마커 표시 */}
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            >
              <Image 
                source={require('../assets/postion.png')}
                style={styles.markerImage}
              />
            </Marker>
          )}
          {trashcans.map((trashcan, index) => (
            <Marker
              key={index}
              title={trashcan.name}
              description={trashcan.description}
              coordinate={{
                latitude: trashcan.latitude,
                longitude: trashcan.longitude,
              }}
            />
          ))}
        </MapView>
        <View style={styles.zoomButtonContainer}>
          <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Home;
