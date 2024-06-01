import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Button, Provider } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  Categoryinput: {
    width: '100%',
    height: 65,
    marginBottom: 8,
  },
  Contentarea: {
    marginTop: '5%',
    width: '100%',
    height: 350,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  button: {
    marginTop: '10%',
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
});

const ComplaintPage = () => {
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitComplaint = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://172.30.1.79:3000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: category, content : text }),
      });
      if (response.ok) {
        Alert.alert('성공', '성공적으로 등록되었습니다!');
        setCategory('');
        setText('');
      } else {
        throw new Error('서버에서 문제가 발생했습니다.');
      }
    } catch (error) {
      Alert.alert('등록 실패', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <TextInput
          label="카테고리 입력"
          value={category}
          multiline
          onChangeText={category => setCategory(category)}
          mode="outlined"
          style={styles.Categoryinput}
        />
        <TextInput
          label="내용"
          value={text}
          onChangeText={text => setText(text)}
          multiline
          numberOfLines={6}
          mode="outlined"
          style={styles.Contentarea}
        />
        {isSubmitting ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button mode="contained" onPress={submitComplaint} style={styles.button}>
            게시하기
          </Button>
        )}
      </View>
    </Provider>
  );
};

export default ComplaintPage;
