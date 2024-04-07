import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Avatar, Card, IconButton } from 'react-native-paper';
import MapView, { UrlTile, Marker } from "react-native-maps";

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
  myMap: {
    flex: 2,
    backgroundColor: "white",
    width: "100%",
    marginTop: 30,
    marginBottom: 30,
  },
  map: {
    width: "100%",
    height: 300, // 높이를 고정 값으로 설정
  },
  webViewMap: {
    height: 300, // WebView 지도의 높이를 설정
    width: "100%",
    marginTop: 20,
  }
});

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
  let location = {
    latitude: 23.259933,
    longitude: 77.412613,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.myMap}>
        <MapView
          region={location}
          rotateEnabled={false}
          showsUserLocation
          style={styles.map}
        >
          <UrlTile
            urlTemplate="https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            maximumZ={19}
          />
          <Marker
            title="Home"
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        </MapView>
      </View>
      <Card style={styles.card}>
        <CardTitleWithIcon
          title="카카오맵"
          subtitle="지도로 길 찾기"
          LeftIconComponent={KakaoMapIcon}
        />
      </Card>
      <View style={styles.webViewMap}>
        <WebView
          originWhitelist={['*']}
          source={{ html: `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Simple Map</title>
              <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width" />
              <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
              <script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>
              <style>
                .map { height: 100%; width: 100%; }
              </style>
            </head>
            <body>
              <div id="map" class="map"></div>
              <script type="text/javascript">
                var map = new ol.Map({
                  target: 'map',
                  layers: [
                    new ol.layer.Tile({
                      source: new ol.source.OSM()
                    })
                  ],
                  view: new ol.View({
                    center: ol.proj.fromLonLat([${location.longitude}, ${location.latitude}]),
                    zoom: 15
                  })
                });
              </script>
            </body>
            </html>
          ` }}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
