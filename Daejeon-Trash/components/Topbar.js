// Topbar.js
import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import { useTab } from './TabContext'; 
import SettingsModal from '../modal/SettingsModal';

const Topbar = () => {
  const { title } = useTab(); 
  const goBack = () => console.log('Went back');
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false); // 모달 상태

  return (
    <>
      <Appbar.Header style={{ backgroundColor: 'white' }}> 
      <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={title}/> 
        <TouchableOpacity onPress={() => setIsSettingsModalVisible(true)}>
          <Appbar.Action icon="dots-vertical" />
        </TouchableOpacity>
      </Appbar.Header>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
      <SettingsModal
        visible={isSettingsModalVisible}
        onClose={() => setIsSettingsModalVisible(false)}
      />
    </>
  );
};

export default Topbar;

