import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { BackHandler } from 'react-native';
import BottomTabNavigator from './components/BottomTabNavigator';
import Topbar from './components/Topbar';
import LoginPage from './pages/LoginPage';
import { TabProvider } from './components/TabContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <TabProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Home" component={HomeComponent} />
          </Stack.Navigator>
        </NavigationContainer>
      </TabProvider>
    </PaperProvider>
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
