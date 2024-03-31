// SettingsModal.js
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Portal, Button, Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  innerContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },

  Settingbutton: {
    textAlign: 'center',
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
  },

  Closebutton: {
    textAlign: 'center',
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:"#FA5858"
  },
});

const SettingsModal = ({ visible, onClose }) => {

  const handleSignUp = () => {
    onClose();
  };
  return (
    <Portal>
      <Modal visible={visible} animationType="slide"  contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>설정</Text>
          <Button mode="contained" onPress={handleSignUp}style={styles.Settingbutton}>
            설정하기
          </Button>
          <Button mode="contained" onPress={onClose} style={styles.Closebutton}>
          닫기
        </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default SettingsModal;
