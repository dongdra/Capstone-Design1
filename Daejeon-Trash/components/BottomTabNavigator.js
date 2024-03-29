// BottomTabNavigator.js
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useTab } from './TabContext';
import CalendarPage from '../pages/CalendarPage';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const initialLayout = { width: Dimensions.get('window').width };

const BottomTabNavigator = () => {
  const [index, setIndex] = useState(0);
  const { setTitle } = useTab();
  const [routes] = useState([
    { key: 'CalendarPage', title: '캘린더', icon: 'calendar' },
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'SearchPage', title: '검색', icon: 'magnify' }
  ]);

  const renderScene = SceneMap({
    CalendarPage: CalendarPage,
    home: Home,
    SearchPage: SearchPage,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      renderIcon={({ route, focused, color }) => (
        <MaterialCommunityIcons
          name={route.icon}
          size={26}
          color={color}
        />
      )}
      activeColor="black"
      inactiveColor="gray"
      style={{ backgroundColor: 'white', borderTopColor: 'black', borderTopWidth: 1 }}
    />
  );

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    switch(newIndex) {
      case 0:
        setTitle('캘린더');
        break;
      case 1:
        setTitle('Home');
        break;
      case 2:
        setTitle('검색');
        break;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={initialLayout}
      swipeEnabled={true}
      renderTabBar={renderTabBar}
      tabBarPosition="bottom" 
    />
  );
};

export default BottomTabNavigator;
