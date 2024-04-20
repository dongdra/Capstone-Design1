// NoticePage.js 수정
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
  },
  idText: {
    fontWeight: 'bold',
    fontSize: 23,
    color: '#aaa',
    flex: 1, // ID에 필요한 최소 공간 할당
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 2, // 제목에 더 많은 공간 할당
  },
  content: {
    fontSize: 14,
    color: '#666',
    flex: 3, // 내용에 가장 많은 공간 할당
  }
 
});

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.post('http://172.30.1.79:3000/api/complaints/all');
      setNotices(response.data);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    }
  };

  const handlePress = (notice) => {
    setSelectedNotice(notice);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => handlePress(item)}>
       <Text style={styles.idText}>{item.id}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
     
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notices}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{selectedNotice?.content}</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default NoticePage;
