import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput, Provider } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    padding: 16, // 전체적인 패딩 조정
  },
  Categoryinput: {
    width: '100%', // 전체 너비 사용
    height: 65, //
    marginBottom: 8, // 입력 필드 아래쪽 여백 조정
  },
  Contentarea: {
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
    {/* 카테고리 입력을 위한 TextInput */}
    <TextInput
      label="카테고리 입력"
      value={category}
      multiline
      onChangeText={text => setCategory(text)}
      mode="outlined" // 여기에 스타일 변경
      style={styles.Categoryinput}
    />
    {/* 내용 입력을 위한 TextInput */}
    <TextInput
      label="내용"
      value={text}
      onChangeText={text => setText(text)}
      multiline // 여러 줄 입력 가능
      numberOfLines={6} // 보여지는 줄 수
      mode="outlined" // 여기에 스타일 변경
      style={styles.Contentarea}
    />
    {/* 버튼 */}
    <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.button}>
      게시하기
    </Button>
  </View>
</Provider>
  );
};

export default WritePage;
