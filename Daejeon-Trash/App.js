// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import BottomTabNavigator from './components/BottomTabNavigator';
import Topbar from './components/Topbar';
import { TabProvider } from './components/TabContext'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <TabProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeComponent} />
          </Stack.Navigator>
        </NavigationContainer>
      </TabProvider>
    </PaperProvider>
  );
}

const HomeComponent = () => (
  <GestureHandlerRootView style={{ flex: 1 }}> 
    <Topbar />
    <BottomTabNavigator />
  </GestureHandlerRootView>
);




