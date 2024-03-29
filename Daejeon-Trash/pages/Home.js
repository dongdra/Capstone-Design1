// Home.js
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
  },
  cardTitle: {
    padding: 10,
  },
});

const TravelJournalIcon = props => <Avatar.Icon {...props} icon="book" />;
const KakaoMapIcon = props => <Avatar.Icon {...props} icon="map" />;

const CardTitleWithIcon = ({ title, subtitle, LeftIconComponent }) => (
  <Card.Title
    title={title}
    subtitle={subtitle}
    left={props => <LeftIconComponent {...props} />}
    right={props => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
    style={styles.cardTitle}
  />
);

const Home = () => {
  return (
    <ScrollView style={styles.container}>

      <Card style={styles.card}>
        <CardTitleWithIcon
          title="여행 일지 작성"
          subtitle="나만의 여행 기록"
          LeftIconComponent={TravelJournalIcon}
        />
      </Card>

      <Card style={styles.card}>
        <CardTitleWithIcon
          title="카카오맵"
          subtitle="지도로 길 찾기"
          LeftIconComponent={KakaoMapIcon}
        />
      </Card>
    </ScrollView>
  );
};

export default Home;
