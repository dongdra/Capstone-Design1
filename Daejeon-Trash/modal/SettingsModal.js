import React, { useEffect } from 'react';
import { Modal, StyleSheet, View, Alert } from 'react-native';
import { Portal, Button, Text, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 
import { useNotification } from '../NotificationContext';
import { useStatsNotification } from '../StatsNotificationContext';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  innerContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  settingButton: {
    textAlign: 'center',
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#424242"
  },
  logoutButton: {
    textAlign: 'center',
    width: '90%',
    marginTop: 10,
    backgroundColor: "#FA5858",
    marginBottom: 10,
  },
  closeButton: {
    textAlign: 'center',
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#2E64FE'
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    width: '90%',
  }
});

const SettingsModal = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const { notificationEnabled, setNotificationEnabled } = useNotification();
  const { statsNotificationEnabled, setStatsNotificationEnabled } = useStatsNotification();

  useEffect(() => {
    // 앱 로드 시 저장된 상태 값을 불러오기
    const loadNotificationSettings = async () => {
      const savedNotificationEnabled = await AsyncStorage.getItem('notificationEnabled');
      if (savedNotificationEnabled !== null) {
        setNotificationEnabled(savedNotificationEnabled === 'true');
      }
      const savedStatsNotificationEnabled = await AsyncStorage.getItem('statsNotificationEnabled');
      if (savedStatsNotificationEnabled !== null) {
        setStatsNotificationEnabled(savedStatsNotificationEnabled === 'true');
      }
    };

    loadNotificationSettings();
  }, []);

  const saveNotificationSettings = async () => {
    // 설정 저장
    await AsyncStorage.setItem('notificationEnabled', notificationEnabled.toString());
    await AsyncStorage.setItem('statsNotificationEnabled', statsNotificationEnabled.toString());
    Alert.alert('설정 저장', '설정이 저장되었습니다.');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // 사용자 토큰 제거
      await AsyncStorage.removeItem('isAdmin'); // 관리자 권한 제거
      Alert.alert('로그아웃 성공', '로그아웃되었습니다.', [
        { text: '확인', onPress: () => navigation.navigate('Login') } // 로그인 페이지로 이동
      ]);
    } catch (error) {
      Alert.alert('로그아웃 실패', '로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <Portal>
      <Modal visible={visible} animationType="slide" contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>설정</Text>
          <Button mode="contained" onPress={saveNotificationSettings} style={styles.settingButton}>
            설정 저장
          </Button>
          <View style={styles.divider} />
          <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
            로그아웃
          </Button>
          <View style={styles.divider} />
          {statsNotificationEnabled && (
            <>
              <View style={styles.switchContainer}>
                <Text variant="titleMedium">쓰레기통 통계 알림</Text>
                <Switch
                  value={statsNotificationEnabled}
                  onValueChange={setStatsNotificationEnabled}
                />
              </View>
              <View style={styles.divider} />
            </>
          )}
          <View style={styles.switchContainer}>
            <Text variant="titleMedium">쓰레기통 위치 알림</Text>
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
            />
          </View>
          <View style={styles.divider} />
          <Button mode="contained" onPress={onClose} style={styles.closeButton}>
            닫기
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default SettingsModal;
