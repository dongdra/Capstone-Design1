import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput, Provider } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, // 전체적인 패딩 조정
  },
  title: {
    fontSize: 24, // 제목 글씨 크기 조정
    fontWeight: 'bold',
    alignSelf: 'flex-start', // 제목을 왼쪽 정렬
    marginBottom: 8, // 여백 조정
  },
  input: {
    width: '100%', // 전체 너비 사용
    height: 58, // 입력 필드 높이 조정
    marginBottom: 8, // 입력 필드 아래쪽 여백 조정
  },
  textarea: {
    marginTop: '5%',
    width: '100%', // 전체 너비 사용
    height: 350, // 입력 필드 높이 조정
    textAlignVertical: 'top', // 입력 필드 내부 텍스트를 위쪽 정렬
    marginBottom: 8, // 입력 필드 아래쪽 여백 조정
  },
  button: {
    marginTop: '10%',
    width: '100%', // 버튼 너비 조정
    height: 50, // 버튼 높이 조정
    justifyContent: 'center', // 버튼 내부 내용을 중앙 정렬
  },
  buttonText: {
    fontSize: 20, // 버튼 텍스트 크기 조정
  },
});

const WritePage = () => {
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');

  return (
    <Provider>
      <View style={styles.container}>
        {/* TextInput for Category Input */}
        <TextInput
          label="카테고리 입력"
          value={category}
          onChangeText={text => setCategory(text)}
          style={styles.input}
        />
        {/* TextInput for Content Input */}
        <TextInput
          label="내용"
          value={text}
          onChangeText={text => setText(text)}
          multiline // 여러 줄 입력 가능하도록 설정
          numberOfLines={4} // 보여지는 줄 수 설정
          style={styles.textarea}
        />
        {/* Button */}
        <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.button}>
          게시하기
        </Button>
      </View>
    </Provider>
  );
};

export default WritePage;
