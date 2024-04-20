//WritePage.js
import React, { useState } from 'react';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import NoticePage from './NoticePage';
import ComplaintPage from './ComplaintPage';

const WritePage = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'notice', title: '공지사항' },
    { key: 'complaint', title: '민원' },
  ]);

  const renderScene = SceneMap({
    notice: NoticePage,
    complaint: ComplaintPage,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'black' }} // 탭 아래 표시줄 색상
      style={{ backgroundColor: 'gray' }} // 탭 바의 배경색
      activeColor='black' // 활성 탭의 글자색
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};

export default WritePage;


