import React from 'react';
import { Modal, StyleSheet, View, Alert } from 'react-native';
import { Portal, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // useNavigation 훅 import

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
  },
  logoutButton: {
    textAlign: 'center',
    width: '90%',
    marginTop: 10,
    backgroundColor: '#2E64FE',
    marginBottom: 10,
  },
  closeButton: {
    textAlign: 'center',
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#FA5858"
  },
});

const SettingsModal = ({ visible, onClose }) => {
  const navigation = useNavigation(); // useNavigation 훅을 사용하여 navigation 객체 획득

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // 사용자 토큰 삭제
      Alert.alert('로그아웃 성공', '로그아웃되었습니다.', [
        { text: '확인', onPress: () => navigation.navigate('Login') } // 로그인 페이지로 네비게이션
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
          <Button mode="contained" onPress={() => {}} style={styles.settingButton}>
            설정하기
          </Button>
          <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
            로그아웃
          </Button>
          <Button mode="contained" onPress={onClose} style={styles.closeButton}>
            닫기
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default SettingsModal;
