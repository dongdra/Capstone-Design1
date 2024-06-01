// BottomTabNavigator.js
import React, { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import WritePage from '../pages/WritePage';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import StatisticsPage from '../pages/StatisticsPage';
StatisticsPage
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { useTab } from './TabContext'; // TabContext에서 useTab 가져오기

const BottomTabNavigator = () => {
  const WriteRoute = () => <WritePage />;
  const HomeRoute = () => <Home />;
  const SearchRoute = () => <SearchPage />;
  const StatisticsRoute = () => <StatisticsPage />;

  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: 'write', title: '민원 작성하기', icon: 'equal-box', color: '#FFFFFF' },
    { key: 'home', title: 'Home', icon: 'home', color: '#FFFFFF' },
    { key: 'search', title: '쓰레기통 추천', icon: 'assistant', color: '#FFFFFF' },
    { key: 'statistics', title: '통계', icon: 'graph', color: '#FFFFFF' },
  ]);

  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";

  const { setTitle } = useTab(); // useTab 훅으로부터 setTitle 가져오기

  const renderScene = BottomNavigation.SceneMap({
    write: WriteRoute,
    home: HomeRoute,
    search: SearchRoute,
    statistics: StatisticsRoute,
  });

  const renderIcon = ({ route, focused }) => (
    <MaterialCommunityIcons name={route.icon} size={30} color={focused ? '#5858FA' : '#FFFFFF'} />
  );

  const renderLabel = ({ route, focused }) => (
    <Text style={{ color: focused ? '#5858FA' : '#FFFFFF', textAlign: 'center', fontSize: 12 }}>{route.title}</Text>
  );

  // 아이콘에 따라 타이틀 설정하는 함수
  const setTabTitle = (index) => {
    switch (index) {
      case 0:
        setTitle('민원 작성하기');
        break;
      case 1:
        setTitle('Home');
        break;
      case 2:
        setTitle('쓰레기통 추천');
        break;
        case 3:
        setTitle('통계');
        break;
      default:
        setTitle('Home');
    }
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={(index) => {
        setIndex(index);
        setTabTitle(index); // 탭이 변경될 때마다 타이틀 설정
      }}
      renderScene={renderScene}
      renderIcon={renderIcon}
      renderLabel={renderLabel}
      theme={{ colors: { primary: 'transparent' } }}
      barStyle={{ backgroundColor: '#585858', borderTopWidth: 1, borderTopColor: 'black' }}
      shifting={true}
      activeColor="#FF0000"
      inactiveColor="#FFFFFF"
    />
  );
};

export default BottomTabNavigator;

