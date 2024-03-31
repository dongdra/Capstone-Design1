// BottomTabNavigator.js
import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import WritePage from '../pages/WritePage';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomTabNavigator = () => {
  const WriteRoute = () => <WritePage />;
  const HomeRoute = () => <Home />;
  const SearchRoute = () => <SearchPage />;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'write', title: '민원 작성하기', icon: 'equal-box', color: '#3F51B5' },
    { key: 'home', title: 'Home', icon: 'home', color: '#009688' },
    { key: 'search', title: '쓰레기통 검색', icon: 'magnify', color: '#795548' },
  ]);


  const renderScene = BottomNavigation.SceneMap({
    write: WriteRoute,
    home: HomeRoute,
    search: SearchRoute,
  });

  const renderIcon = ({ route, focused, color }) => (
    <MaterialCommunityIcons name={route.icon} size={24} color={color} />
  );

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={renderIcon}
      barStyle={{ backgroundColor: 'white', borderTopWidth: 1, borderTopColor: 'black' }} // 흰색 배경에 검정색 선 추가
    />
  );
};

export default BottomTabNavigator;
