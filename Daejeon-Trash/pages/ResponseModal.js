import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';

// 스타일 정의
const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 30,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor:'#E6E0F8'
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF0000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#A9D0F5',
  },
  submitButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  }
});

// ResponseModal 컴포넌트 정의
const ResponseModal = ({ visible, onClose, notice }) => {
  const [responseText, setResponseText] = useState('');

  const submitResponse = async () => {
    try {
      const response = await axios.patch(`http://172.20.10.2:3000/api/complaints/${notice.id}`, { solution: responseText });
      Alert.alert("전송 완료", "민원 답변이 성공적으로 전송되었습니다.");
      onClose();
    } catch (error) {
      console.error('Failed to submit response:', error);
      Alert.alert("전송 실패", "민원 답변 전송에 실패했습니다.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ID</Text>
          <Text style={styles.sectionText}>{notice?.id}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제목</Text>
          <Text style={styles.sectionText}>{notice?.title}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>내용</Text>
          <Text style={styles.sectionText}>{notice?.content}</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={setResponseText}
          value={responseText}
          placeholder="민원 답변을 입력하세요"
        />
        <Button
          mode="contained"
          onPress={submitResponse}
          style={styles.submitButton}
          labelStyle={styles.submitButtonText}
        >
          전송
        </Button>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ResponseModal;
