import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useNotification } from '../NotificationContext'; // 위치 알림 컨텍스트
import { useStatsNotification } from '../StatsNotificationContext'; // 쓰레기통 통계 알림 컨텍스트
import FeedbackModal from '../modal/FeedbackModal';

// 스타일 정의
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    marginTop: 30,
    height: 60,
    width: 200,
    marginRight: 10,
    backgroundColor:'#E6E0F8'
  },
  button: {
    marginVertical: 10
  },
  loginbutton: {
    marginTop: 44,
    marginVertical: 10,
    backgroundColor:'#A9D0F5'
  },
  alarmbutton: {
    width: 310,
    marginVertical: 10,
  },
  informationbutton: {
    width: 310,
    marginVertical: 10,
    backgroundColor:'#A9D0F5'
  },
});

// Home 컴포넌트
const Home = () => {
  const [location, setLocation] = useState(null);
  const [trashcans, setTrashcans] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(15);
  const [radius, setRadius] = useState(500);
  const [inputRadius, setInputRadius] = useState('500');
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    user_id: '',
    accuracy: '3',
    convenience: '3',
    satisfaction: '3',
    rating: '좋아요',
  });
  const mapRef = useRef(null);
  const locationSubscription = useRef(null);
  const { notificationEnabled } = useNotification();
  const { statsNotificationEnabled } = useStatsNotification();

  useEffect(() => {
    getLocationAsync();
    fetchTrashcans();
    setupNotifications();

    const subscribeToLocation = async () => {
      locationSubscription.current = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 100 },
        (newLocation) => {
          setLocation(newLocation.coords);
          if (notificationEnabled) {
            checkTrashcans(newLocation.coords, radius);
          }
          if (statsNotificationEnabled) {
            console.log("Stats Notification is enabled, update stats accordingly.");
          }
        }
      );
    };

    subscribeToLocation();

    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, [radius, notificationEnabled, statsNotificationEnabled]);

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
      const response = await fetch('http://172.20.10.2:3000/api/trashcans', {
        method: 'GET', // GET 메소드로 변경
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setTrashcans(data);
    } catch (error) {
      console.error(error);
    }
  };

  const setupNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.error('Notification permission not granted');
      return;
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    Notifications.addNotificationResponseReceivedListener(response => {
      setFeedbackVisible(true);
    });
  };

  const checkTrashcans = (userLocation, radius) => {
    const nearbyTrashcans = trashcans.filter(trashcan => {
      const distance = getDistance(
        userLocation.latitude,
        userLocation.longitude,
        trashcan.latitude,
        trashcan.longitude
      );
      if (distance <= radius) {
        console.log(`Nearby trashcan: ${trashcan.name}, Location: (${trashcan.latitude}, ${trashcan.longitude})`);
        Notifications.scheduleNotificationAsync({
          content: {
            title: "근처 쓰레기통 정보",
            body: `${trashcan.name} 있습니다.`,
          },
          trigger: null,
        });
      }
      return distance <= radius;
    });

    if (nearbyTrashcans.length > 0) {
      console.log('Nearby trashcans:', nearbyTrashcans);
    } else {
      console.log('No trashcans within the radius.');
    }
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
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

  const handleSetRadius = () => {
    setRadius(Number(inputRadius));
    console.log(`Radius set to ${inputRadius}m.`);
  };

  const handleCheckNearbyTrashcans = () => {
    if (notificationEnabled) {
      checkTrashcans(location, radius);
    } else {
      console.log('알림 기능이 비활성화되어 있습니다.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.MapContainer}>
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
          {location && (
            <Circle
              center={location}
              radius={radius}
              strokeWidth={1}
              strokeColor={'rgba(0, 150, 0, 0.5)'}
              fillColor={'rgba(0, 150, 0, 0.2)'}
            />
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={inputRadius}
            onChangeText={text => setInputRadius(text)}
          />
          <Button mode="contained" onPress={handleSetRadius} style={styles.loginbutton}>
          반경 설정
          </Button>
        </View>
        <Button mode="contained" onPress={handleCheckNearbyTrashcans} style={styles.informationbutton}>
        근처 쓰레기통 정보
        </Button>
        <FeedbackModal
          visible={feedbackVisible}
          onClose={() => setFeedbackVisible(false)}
          initialFeedback={feedbackData}
        />
      </View>
    </ScrollView>
  );
}

export default Home;
