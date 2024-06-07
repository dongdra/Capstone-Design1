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

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = '아이디를 입력하세요';
    if (!password.trim()) newErrors.password = '비밀번호를 입력하세요';
    if (!name.trim()) newErrors.name = '이름을 입력하세요';
    if (!birthdate.trim()) newErrors.birthdate = '생일을 입력하세요';
    if (!phone.trim() || !/^010-\d{4}-\d{4}$/.test(phone)) newErrors.phone = '올바른 전화번호 형식을 입력하세요';
    if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = '올바른 이메일 주소를 입력하세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    try {
      const response = await fetch('http://172.20.10.2:3000/api/signup', {
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
        const errorText = await response.text();
        throw new Error(errorText || '서버에서 문제가 발생했습니다.');
      }

      const data = await response.json();
      console.log(data);
      Alert.alert('성공', '회원가입이 완료되었습니다!');
      onClose();
    } catch (error) {
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
            error={!!errors.username}
          />
          {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
          <TextInput
            label="비밀번호를 입력하세요"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
            error={!!errors.password}
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          <TextInput
            label="이름을 입력하세요"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
            error={!!errors.name}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          <TextInput
            label="생일을 입력하세요"
            value={birthdate}
            onChangeText={setBirthdate}
            style={styles.input}
            mode="outlined"
            error={!!errors.birthdate}
          />
          {errors.birthdate ? <Text style={styles.errorText}>{errors.birthdate}</Text> : null}
          <TextInput
            label="전화번호를 입력하세요"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            mode="outlined"
            error={!!errors.phone}
          />
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
          <TextInput
            label="이메일을 입력하세요"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            error={!!errors.email}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          <Button mode="contained" onPress={handleSignUp} style={styles.signbutton}>
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
  signbutton:{
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 3,
    backgroundColor:'#0080FF'
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 3
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 15,
  },
});

export default SignUpModal;
