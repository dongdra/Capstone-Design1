import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
});

const NoticeModal = ({ modalVisible, selectedNotice, setModalVisible }) => {
  return (
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>민원답변</Text>
          <Text style={styles.sectionText}>{selectedNotice?.solution ? selectedNotice.solution : '대기중'}</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default NoticeModal;
