// Topbar.js
import React, { useState } from 'react'; // useState를 사용하기 위해 React에서 불러오기
import { Appbar } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import { useTab } from './TabContext'; // TabContext에서 useTab 가져오기
import SettingsModal from '../modal/SettingsModal';

const Topbar = () => {
  const { title } = useTab(); // TabProvider에서 title 가져오기
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false); // useState 사용

  return (
    <>
      <Appbar.Header style={{ backgroundColor: 'white' }}> 
  <Appbar.Content title={title} titleStyle={{ textAlign: 'left' }}/> 
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
