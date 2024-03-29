// SignUpModal.js
import React, { useState } from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper'; 

const SignUpModal = ({ visible, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = () => {
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
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
          label="생일를 입력하세요"
          value={birthdate}
          onChangeText={setBirthdate}
          style={styles.input}
          mode="outlined" 
        />
        <TextInput
          label="전화번호를 입력하세요"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          mode="outlined" 
        />
        <TextInput
          label="이메일를 입력하세요"
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
