import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import WordleScreen from './src/screens/WordleScreen';
import LearningScreen from './src/screens/LearningScreen';
import SettingScreen from './src/screens/SettingScreen';
import {StateContext} from './src/context/StateContext';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <StateContext>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Wordle" component={WordleScreen} />
          <Stack.Screen name="Learning" component={LearningScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateContext>
  );
}
