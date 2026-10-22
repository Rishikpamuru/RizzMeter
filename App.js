import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './src/context/UserContext';
import { RizzProvider } from './src/context/RizzContext';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/utils/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <UserProvider>
          <RizzProvider>
            <NavigationContainer>
              <AppNavigator />
              <StatusBar style="light" backgroundColor="#6200ee" />
            </NavigationContainer>
          </RizzProvider>
        </UserProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
