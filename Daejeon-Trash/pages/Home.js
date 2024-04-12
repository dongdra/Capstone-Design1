//Home.js
import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { UrlTile, Marker } from "react-native-maps";
import * as Location from 'expo-location';

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
    height: 370,
  },
  zoomButtonContainer: {
    position: 'absolute',
    flexDirection: 'column',   
    top: 5,                    // 위쪽 여백 설정
    left: 20,                   // 왼쪽 여백 설정
  },
  zoomButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,          // 아래쪽 간격 추가
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const Home = () => {
  const [location, setLocation] = useState(null);
  const [trashcans, setTrashcans] = useState([]); // 쓰레기통 위치 상태
  const [zoomLevel, setZoomLevel] = useState(10); // 초기 줌 레벨 설정
  const mapRef = useRef(null);

  useEffect(() => {
    getLocationAsync();
    fetchTrashcans(); // 백엔드에서 쓰레기통 위치 데이터를 가져오는 함수 호출
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Location permission not granted');
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
    
    // 현재 위치를 가져온 후, 지도의 뷰를 현재 위치로 이동
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
        zoom: zoomLevel, // 현재 설정된 줌 레벨을 유지하거나, 필요에 따라 적절한 줌 레벨로 조정
      });
    }
  }; 

  const fetchTrashcans = async () => {
    // 백엔드 API 엔드포인트로부터 쓰레기통 위치 정보를 가져옵니다.
    try {
      const response = await fetch('http://192.168.0.53:3000/api/trashcans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 필요한 경우 추가 데이터를 본문에 포함시킵니다.
        body: JSON.stringify({}),
      });
      const data = await response.json();
      setTrashcans(data);
    } catch (error) {
      console.error(error);
    }
  };

    
    // 현재 위치를 가져온 후, 지도의 뷰를 현재 위치로 이동
   

  const handleZoomIn = () => {
    const newZoomLevel = zoomLevel + 1; // 줌 인할 때마다 줌 레벨을 1 증가
    setZoomLevel(newZoomLevel); // 새로운 줌 레벨 상태 업데이트
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
    const newZoomLevel = zoomLevel - 1; // 줌 아웃할 때마다 줌 레벨을 1 감소
    setZoomLevel(newZoomLevel); // 새로운 줌 레벨 상태 업데이트
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
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: location ? location.latitude : 37.5665, // 대전의 기본 위도
            longitude: location ? location.longitude : 126.9780, // 대전의 기본 경도
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          rotateEnabled={true}
          showsUserLocation={true}
          style={styles.MapStyle}
        >
          {/* 쓰레기통 위치를 지도에 마커로 표시 */}
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
        {/* 확대와 축소 버튼 */}
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