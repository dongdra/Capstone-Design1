import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoticeModal from './NoticeModal'; // NoticeModal 컴포넌트 임포트
import ResponseModal from './ResponseModal'; // ResponseModal 컴포넌트 임포트

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [page, setPage] = useState(0);
  const [itemsPerPage] = useState(8);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.post('http://172.30.1.79:3000/api/complaints/all');
        setNotices(response.data);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await AsyncStorage.getItem('isAdmin');
      setIsAdmin(adminStatus === 'true'); // 관리자 상태 설정
    };

    checkAdminStatus();
    setPage(0);
  }, [notices, itemsPerPage]);

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
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>제목</DataTable.Title>
          <DataTable.Title>내용</DataTable.Title>
        </DataTable.Header>

        {notices.slice(from, to).map(notice => (
          <DataTable.Row key={notice.id} onPress={() => handlePress(notice)}>
            <DataTable.Cell>{notice.id}</DataTable.Cell>
            <DataTable.Cell>{notice.title}</DataTable.Cell>
            <DataTable.Cell>{notice.content}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <View style={styles.paginationContainer}>
          <DataTable.Pagination
            page={page}
            numberOfPages={numberOfPages}
            onPageChange={setPage}
            label={`${from + 1}-${to} of ${notices.length}`}
          />
        </View>
      </DataTable>

      {isAdmin ? (
        <ResponseModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          notice={selectedNotice}
        />
      ) : (
        <NoticeModal
          modalVisible={modalVisible}
          selectedNotice={selectedNotice}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
};

export default NoticePage;
