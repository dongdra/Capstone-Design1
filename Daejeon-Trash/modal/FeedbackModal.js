import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Button, Modal, RadioButton } from 'react-native-paper';
import axios from 'axios';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: 30,
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
  },
  radioButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  radioButtonLabel: {
    marginRight: 20,
  },
  modalScrollView: {
    maxHeight: '90%', // 모달 내용이 화면을 넘지 않도록 최대 높이 설정
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: '#2E64FE'
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
  }
});

const FeedbackModal = ({ visible, onClose, initialFeedback }) => {
  const [feedback, setFeedback] = useState(initialFeedback);

  useEffect(() => {
    setFeedback(initialFeedback); // 모달이 열릴 때 초기 피드백 데이터를 설정합니다.
  }, [initialFeedback]);

  const handleSubmitFeedback = async () => {
    // 모든 필드가 채워졌는지 확인
    if (!feedback.accuracy || !feedback.convenience || !feedback.satisfaction || !feedback.rating) {
      Alert.alert('모든 필드를 채워주세요.');
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.2:3000/api/feedback', feedback);

      if (response.status === 201) {
        Alert.alert('피드백 제출 완료', '피드백이 성공적으로 제출되었습니다.');
      } else {
        Alert.alert('피드백 제출 실패', '피드백 제출에 실패했습니다. 다시 시도해주세요.');
      }
      

      onClose(); // 제출 후 모달 닫기
      // 피드백 제출 후 초기화 (선택 사항)
      setFeedback({
        accuracy: '1',
        convenience: '1',
        satisfaction: '1',
        rating: '좋아요',
      });
    } catch (error) {
      console.error('피드백 제출 중 오류 발생:', error);
      Alert.alert('서버 오류', '피드백 제출 중 오류가 발생했습니다.');
    }
  };

  return (
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
      <ScrollView style={styles.modalScrollView}>
        <View style={styles.radioButtonGroup}>
          <Text style={styles.radioButtonLabel}>정확성</Text>
          {[1, 2, 3, 4, 5].map(value => (
            <View key={value} style={styles.radioButtonContainer}>
              <RadioButton
                value={value.toString()}
                status={feedback.accuracy === value.toString() ? 'checked' : 'unchecked'}
                onPress={() => setFeedback({ ...feedback, accuracy: value.toString() })}
              />
              <Text>{value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.radioButtonGroup}>
          <Text style={styles.radioButtonLabel}>편의성</Text>
          {[1, 2, 3, 4, 5].map(value => (
            <View key={value} style={styles.radioButtonContainer}>
              <RadioButton
                value={value.toString()}
                status={feedback.convenience === value.toString() ? 'checked' : 'unchecked'}
                onPress={() => setFeedback({ ...feedback, convenience: value.toString() })}
              />
              <Text>{value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.radioButtonGroup}>
          <Text style={styles.radioButtonLabel}>만족도</Text>
          {[1, 2, 3, 4, 5].map(value => (
            <View key={value} style={styles.radioButtonContainer}>
              <RadioButton
                value={value.toString()}
                status={feedback.satisfaction === value.toString() ? 'checked' : 'unchecked'}
                onPress={() => setFeedback({ ...feedback, satisfaction: value.toString() })}
              />
              <Text>{value}</Text>
            </View>
          ))}
        </View>
        <View>
          <View style={styles.radioButtonGroup}>
            <Text style={styles.radioButtonLabel}>좋아요</Text>
            <RadioButton
              value="좋아요"
              status={feedback.rating === '좋아요' ? 'checked' : 'unchecked'}
              onPress={() => setFeedback({ ...feedback, rating: '좋아요' })}
            />
          </View>
          <View style={styles.radioButtonGroup}>
            <Text style={styles.radioButtonLabel}>싫어요</Text>
            <RadioButton
              value="싫어요"
              status={feedback.rating === '싫어요' ? 'checked' : 'unchecked'}
              onPress={() => setFeedback({ ...feedback, rating: '싫어요' })}
            />
          </View>
        </View>
        <Button mode="contained" onPress={handleSubmitFeedback} style={styles.button}>
          제출
        </Button>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

export default FeedbackModal;
