import React, { useState } from 'react';
import { Modal, Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const SignUpModal = ({ visible, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://172.30.1.79:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          name,
          birthdate,
          phone,
          email,
        }),
      });
  
      if (!response.ok) {
        // HTTP 상태 코드를 확인하여 오류 처리
        const errorText = await response.text(); // JSON이 아닐 경우를 대비해 텍스트로 읽기
        throw new Error(errorText || '서버에서 문제가 발생했습니다.');
      }
  
      const data = await response.json(); // 응답이 정상일 경우 JSON 파싱
      console.log(data);
      Alert.alert('성공', '회원가입이 완료되었습니다!');
      onClose(); // 성공 시 모달 닫기
    } catch (error) {
      console.error('회원가입 요청 에러:', error);
      Alert.alert('회원가입 실패', error.message);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <ScrollView>
          <Text style={styles.modalTitle}>회원가입</Text>
          <TextInput
            label="아이디를 입력하세요"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="비밀번호를 입력하세요"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="이름을 입력하세요"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="생일을 입력하세요"
            value={birthdate}
            onChangeText={setBirthdate}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="전화번호를 입력하세요"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="이메일을 입력하세요"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
          />
          <Button mode="contained" onPress={handleSignUp} style={styles.button}>
            회원가입
          </Button>
          <Button mode="outlined" onPress={onClose} style={styles.button}>
            닫기
          </Button>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modalTitle: {
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
  },
});

export default SignUpModal;
