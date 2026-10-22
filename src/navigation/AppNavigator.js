import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

// Screen imports
import HomeScreen from '../screens/HomeScreen';
import SubmitScreen from '../screens/SubmitScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RizzGamesScreen from '../screens/RizzGamesScreen';
import RizzAcademyScreen from '../screens/RizzAcademyScreen';
import RizzDetailScreen from '../screens/RizzDetailScreen';
import AIAnalysisScreen from '../screens/AIAnalysisScreen';
import AuthScreen from '../screens/AuthScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator 
    screenOptions={{
      headerStyle: { backgroundColor: theme.colors.primary },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' }
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'RizzMeter' }} />
    <Stack.Screen name="RizzDetail" component={RizzDetailScreen} options={{ title: 'Rizz Details' }} />
    <Stack.Screen name="AIAnalysis" component={AIAnalysisScreen} options={{ title: 'AI Analysis' }} />
  </Stack.Navigator>
);

const GamesStack = () => (
  <Stack.Navigator 
    screenOptions={{
      headerStyle: { backgroundColor: theme.colors.primary },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' }
    }}
  >
    <Stack.Screen name="RizzGames" component={RizzGamesScreen} options={{ title: 'Rizz Games' }} />
    <Stack.Screen name="RizzAcademy" component={RizzAcademyScreen} options={{ title: 'Rizz Academy' }} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'HomeTab') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Submit') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        } else if (route.name === 'Leaderboard') {
          iconName = focused ? 'trophy' : 'trophy-outline';
        } else if (route.name === 'Games') {
          iconName = focused ? 'game-controller' : 'game-controller-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
      },
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeStack} 
      options={{ tabBarLabel: 'Home' }}
    />
    <Tab.Screen 
      name="Submit" 
      component={SubmitScreen} 
      options={{ 
        tabBarLabel: 'Submit',
        headerShown: true,
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: 'white',
        headerTitle: 'Submit Rizz'
      }}
    />
    <Tab.Screen 
      name="Leaderboard" 
      component={LeaderboardScreen} 
      options={{ 
        tabBarLabel: 'Rankings',
        headerShown: true,
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: 'white',
        headerTitle: 'Leaderboards'
      }}
    />
    <Tab.Screen 
      name="Games" 
      component={GamesStack} 
      options={{ tabBarLabel: 'Games' }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ 
        tabBarLabel: 'Profile',
        headerShown: true,
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: 'white',
        headerTitle: 'My Profile'
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  // TODO: Add authentication logic here
  const isAuthenticated = true; // Placeholder

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
