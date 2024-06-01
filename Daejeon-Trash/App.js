import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { BackHandler } from 'react-native';
import BottomTabNavigator from './components/BottomTabNavigator';
import Topbar from './components/Topbar';
import LoginPage from './LoginPage';
import { TabProvider } from './components/TabContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotificationProvider } from './NotificationContext';
import { StatsNotificationProvider } from './StatsNotificationContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <StatsNotificationProvider>
      <NotificationProvider>
        <PaperProvider>
          <TabProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login">
                  {(props) => <LoginPage {...props} />}
                </Stack.Screen>
                <Stack.Screen name="Home" component={HomeComponent} />
              </Stack.Navigator>
            </NavigationContainer>
          </TabProvider>
        </PaperProvider>
      </NotificationProvider>
    </StatsNotificationProvider>
  );
}

const HomeComponent = () => {
  useEffect(() => {
    const onBackPress = () => {
      return true;  // 뒤로 가기 버튼 이벤트를 막음
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Topbar />
      <BottomTabNavigator />
    </GestureHandlerRootView>
  );
};
