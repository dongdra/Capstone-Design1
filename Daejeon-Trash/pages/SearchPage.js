// SearchPage.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';

const SearchPage = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
        </Card.Content>
        <Card.Actions>
          <Button 
            icon="magnify" 
            mode="contained-tonal" 
            onPress={() => console.log('Searching')}
            style={styles.button}
            contentStyle={styles.content}
          >
            어디로 떠나시나요?
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 20,
    padding: 10,
    backgroundColor: '#ffffff', // 카드 배경색
  },
  button: {
    width: '100%',
    height: 65,
    backgroundColor: '#BDBDBD', // 버튼 배경색
  },
  content: {
    margin:10,
    flexDirection: 'row', // 아이콘과 텍스트를 가로로 나열
    justifyContent: 'flex-start', // 아이콘과 텍스트를 왼쪽으로 정렬
  }
});

export default SearchPage;


