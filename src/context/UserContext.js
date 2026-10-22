import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample user data structure
  const sampleUser = {
    id: '1',
    username: 'RizzKing2024',
    email: 'user@example.com',
    avatar: null,
    rizzStyle: 'Romantic Rizz',
    rizzPowerLevel: 73,
    totalSubmissions: 15,
    averageRating: 3.2,
    badges: ['First Submission', 'Week Warrior', 'Smooth Operator'],
    stats: {
      totalRatings: 127,
      highestRated: 4.8,
      streakDays: 5,
      cityRank: 12,
      globalRank: 1847,
    },
    settings: {
      notifications: true,
      publicProfile: true,
      aiAnalysis: true,
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await SecureStore.getItemAsync('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        // For demo purposes, set sample user
        setUser(sampleUser);
        await SecureStore.setItemAsync('user', JSON.stringify(sampleUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      await SecureStore.setItemAsync('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value = {
    user,
    isLoading,
    updateUser,
    logout,
    setUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
