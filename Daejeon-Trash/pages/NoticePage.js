// NoticePage.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#4285F4',
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
});

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [page, setPage] = useState(0);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [notices, itemsPerPage]);
  const fetchNotices = async () => {
    try {
      const response = await axios.post('http://172.20.10.2:3000/api/complaints/all'); //172.20.10.2
      setNotices(response.data);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    }
  };

  const handlePress = (notice) => {
    setSelectedNotice(notice);
    setModalVisible(true);
  };

  const numberOfPages = Math.ceil(notices.length / itemsPerPage);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, notices.length);

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header style={styles.dataTableHeader}>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>제목</DataTable.Title>
          <DataTable.Title>내용</DataTable.Title>
        </DataTable.Header>

        {notices.slice(from, to).map(notice => (
          <DataTable.Row key={notice.id} onPress={() => handlePress(notice)} style={styles.dataTableRow}>
            <DataTable.Cell>{notice.id}</DataTable.Cell>
            <DataTable.Cell>{notice.title}</DataTable.Cell>
            <DataTable.Cell>{notice.content}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <View style={styles.paginationContainer}>
          <DataTable.Pagination
            page={page}
            numberOfPages={numberOfPages}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${notices.length}`}
          />
        </View>
      </DataTable>

      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContent}>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>ID</Text>
      <Text style={styles.sectionText}>{selectedNotice?.id}</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>제목</Text>
      <Text style={styles.sectionText}>{selectedNotice?.title}</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>내용</Text>
      <Text style={styles.sectionText}>{selectedNotice?.content}</Text>
    </View>
    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
      <Text style={styles.closeButtonText}>닫기</Text>
    </TouchableOpacity>
  </View>
</Modal>
    </View>
  );
};

export default NoticePage;
