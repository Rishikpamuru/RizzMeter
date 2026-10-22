import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RizzContext = createContext();

export const useRizz = () => {
  const context = useContext(RizzContext);
  if (!context) {
    throw new Error('useRizz must be used within a RizzProvider');
  }
  return context;
};

export const RizzProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState([]);
  const [leaderboards, setLeaderboards] = useState([]);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data for demo
  const sampleSubmissions = [
    {
      id: '1',
      text: "Are you a magician? Because whenever I look at you, everyone else disappears.",
      type: 'text',
      category: 'sweet',
      author: 'RizzMaster99',
      authorId: '2',
      ratings: [4, 3, 5, 4, 3],
      averageRating: 3.8,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isOriginal: true,
      aiAnalysis: {
        tone: 'Romantic',
        cleverness: 7,
        boldness: 6,
        overallScore: 7.2,
        suggestions: "Good classic line! Try personalizing it more to make it unique."
      }
    },
    {
      id: '2',
      text: "Do you believe in love at first sight, or should I walk by again?",
      type: 'text',
      category: 'funny',
      author: 'CharmingChad',
      authorId: '3',
      ratings: [2, 3, 2, 1, 3],
      averageRating: 2.2,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isOriginal: false,
      aiAnalysis: {
        tone: 'Playful',
        cleverness: 5,
        boldness: 4,
        overallScore: 4.8,
        suggestions: "Classic but overused. Try adding your own twist!"
      }
    },
    {
      id: '3',
      text: "If you were a vegetable, you'd be a cute-cumber.",
      type: 'text',
      category: 'cringe',
      author: 'PunMaster2000',
      authorId: '4',
      ratings: [1, 0, 2, 1, 0],
      averageRating: 0.8,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isOriginal: true,
      aiAnalysis: {
        tone: 'Corny',
        cleverness: 3,
        boldness: 2,
        overallScore: 2.5,
        suggestions: "Puns can be charming but this one's too cheesy. Try something more clever!"
      }
    }
  ];

  const sampleLeaderboard = [
    { id: '1', username: 'RizzGod_Alpha', score: 4.7, submissions: 23, avatar: null },
    { id: '2', username: 'SmoothOperator', score: 4.5, submissions: 18, avatar: null },
    { id: '3', username: 'CharmingChad', score: 4.2, submissions: 31, avatar: null },
    { id: '4', username: 'RizzMaster99', score: 4.0, submissions: 15, avatar: null },
    { id: '5', username: 'FlirtExpert', score: 3.9, submissions: 27, avatar: null },
  ];

  const sampleDailyChallenge = {
    id: 'daily_1',
    title: "Coffee Shop Rizz",
    scenario: "You're at a coffee shop and the barista remembered your usual order. How do you rizz them up?",
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
    submissions: 47,
    reward: "50 Rizz Points + Coffee Master Badge"
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load from AsyncStorage
      const storedSubmissions = await AsyncStorage.getItem('submissions');
      const storedLeaderboard = await AsyncStorage.getItem('leaderboard');
      const storedChallenge = await AsyncStorage.getItem('dailyChallenge');

      if (storedSubmissions) {
        setSubmissions(JSON.parse(storedSubmissions));
      } else {
        setSubmissions(sampleSubmissions);
        await AsyncStorage.setItem('submissions', JSON.stringify(sampleSubmissions));
      }

      if (storedLeaderboard) {
        setLeaderboards(JSON.parse(storedLeaderboard));
      } else {
        setLeaderboards(sampleLeaderboard);
        await AsyncStorage.setItem('leaderboard', JSON.stringify(sampleLeaderboard));
      }

      if (storedChallenge) {
        setDailyChallenge(JSON.parse(storedChallenge));
      } else {
        setDailyChallenge(sampleDailyChallenge);
        await AsyncStorage.setItem('dailyChallenge', JSON.stringify(sampleDailyChallenge));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSubmission = async (submission) => {
    try {
      const newSubmission = {
        ...submission,
        id: Date.now().toString(),
        timestamp: new Date(),
        ratings: [],
        averageRating: 0,
      };
      
      const updatedSubmissions = [newSubmission, ...submissions];
      setSubmissions(updatedSubmissions);
      await AsyncStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
      
      return newSubmission;
    } catch (error) {
      console.error('Error adding submission:', error);
      throw error;
    }
  };

  const rateSubmission = async (submissionId, rating) => {
    try {
      const updatedSubmissions = submissions.map(sub => {
        if (sub.id === submissionId) {
          const newRatings = [...sub.ratings, rating];
          const averageRating = newRatings.reduce((a, b) => a + b, 0) / newRatings.length;
          return {
            ...sub,
            ratings: newRatings,
            averageRating: Number(averageRating.toFixed(1))
          };
        }
        return sub;
      });
      
      setSubmissions(updatedSubmissions);
      await AsyncStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
    } catch (error) {
      console.error('Error rating submission:', error);
      throw error;
    }
  };

  const getSubmissionsByCategory = (category) => {
    return submissions.filter(sub => sub.category === category);
  };

  const getTopRatedSubmissions = (limit = 10) => {
    return submissions
      .filter(sub => sub.ratings.length > 0)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, limit);
  };

  const value = {
    submissions,
    leaderboards,
    dailyChallenge,
    isLoading,
    addSubmission,
    rateSubmission,
    getSubmissionsByCategory,
    getTopRatedSubmissions,
  };

  return (
    <RizzContext.Provider value={value}>
      {children}
    </RizzContext.Provider>
  );
};
