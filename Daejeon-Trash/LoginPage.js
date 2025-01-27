import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 임포트
import SignUpModal from './modal/SignUpModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 3,
    backgroundColor:'#0080FF'
  },
  signupText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#000000',
  },
});

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://172.20.10.2:3000/api/login', { username, password });
      if (response.status === 200) {
        if (username === '0000' && password === '0000') {
          // 관리자 권한 부여
          await AsyncStorage.setItem('isAdmin', 'true');
          Alert.alert('관리자 로그인', '관리자로 로그인했습니다.', [
            { text: '확인', onPress: () => navigation.navigate('Home') }
          ]);
        } else {
          await AsyncStorage.setItem('isAdmin', 'false');
          Alert.alert('로그인 성공', '로그인에 성공했습니다.', [
            { text: '확인', onPress: () => navigation.navigate('Home') }
          ]);
        }
      } else {
        Alert.alert('로그인 실패', '사용자 이름 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      console.error('로그인 요청 오류:', error);
      Alert.alert('로그인 실패', '네트워크 오류 또는 서버 문제가 있습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <TextInput
        label="아이디를 입력하세요"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        label="비밀번호를 입력하세요"
        value={password}
        onChangeText={setPassword}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        secureTextEntry={!showPassword}
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        로그인
      </Button>

      <TouchableOpacity onPress={() => setIsSignUpModalVisible(true)}>
        <Text style={styles.signupText}>계정이 없나요? 회원가입</Text>
      </TouchableOpacity>

      <SignUpModal
        visible={isSignUpModalVisible}
        onClose={() => setIsSignUpModalVisible(false)}
      />
    </View>
  );
};

export default LoginPage;
