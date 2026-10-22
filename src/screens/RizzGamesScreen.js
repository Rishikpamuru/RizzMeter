import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Chip,
  ProgressBar,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useRizz } from '../context/RizzContext';
import { theme } from '../utils/theme';
import RizzCard from '../components/RizzCard';

const { width } = Dimensions.get('window');

const RizzGamesScreen = ({ navigation }) => {
  const { dailyChallenge, submissions } = useRizz();
  const [selectedRizzOff, setSelectedRizzOff] = useState(null);

  // Get two random submissions for Rizz-Off
  const getRizzOffPair = () => {
    if (submissions.length < 2) return null;
    const shuffled = [...submissions].sort(() => 0.5 - Math.random());
    return [shuffled[0], shuffled[1]];
  };

  const rizzOffPair = getRizzOffPair();

  const handleRizzOffVote = (submissionId) => {
    setSelectedRizzOff(submissionId);
    // TODO: Submit vote to backend
  };

  const gameCards = [
    {
      id: 'daily-challenge',
      title: '🎯 Daily Challenge',
      description: 'Complete today\'s rizz scenario',
      difficulty: 'Medium',
      reward: dailyChallenge?.reward || '50 Rizz Points',
      color: theme.colors.primary,
    },
    {
      id: 'rizz-off',
      title: '⚔️ Rizz-Off Battle',
      description: 'Vote between two pickup lines',
      difficulty: 'Easy',
      reward: '10 Rizz Points per vote',
      color: theme.colors.accent,
    },
    {
      id: 'scenario-builder',
      title: '🎭 Scenario Builder',
      description: 'Create rizz for custom scenarios',
      difficulty: 'Hard',
      reward: '100 Rizz Points',
      color: '#ff6b00',
      comingSoon: true,
    },
    {
      id: 'speed-rizz',
      title: '⚡ Speed Rizz',
      description: '60 seconds to create the best line',
      difficulty: 'Medium',
      reward: '75 Rizz Points',
      color: '#2196f3',
      comingSoon: true,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={theme.colors.gradient.accent}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>🎮 Rizz Games</Text>
          <Text style={styles.headerSubtitle}>
            Level up your game through fun challenges!
          </Text>
        </LinearGradient>

        {/* Game Cards */}
        <View style={styles.gamesContainer}>
          {gameCards.map((game) => (
            <Card key={game.id} style={[styles.gameCard, { borderTopColor: game.color }]}>
              <Card.Content>
                <View style={styles.gameHeader}>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  {game.comingSoon && (
                    <Chip mode="outlined" compact style={styles.comingSoonChip}>
                      Coming Soon
                    </Chip>
                  )}
                </View>
                
                <Text style={styles.gameDescription}>{game.description}</Text>
                
                <View style={styles.gameInfo}>
                  <View style={styles.gameMeta}>
                    <Chip 
                      mode="outlined" 
                      compact 
                      textStyle={styles.chipText}
                      style={[styles.difficultyChip, { borderColor: game.color }]}
                    >
                      {game.difficulty}
                    </Chip>
                    <Text style={styles.reward}>🏆 {game.reward}</Text>
                  </View>
                  
                  <Button
                    mode={game.comingSoon ? 'outlined' : 'contained'}
                    disabled={game.comingSoon}
                    onPress={() => {
                      if (game.id === 'daily-challenge') {
                        navigation.navigate('Submit', { challenge: dailyChallenge });
                      } else if (game.id === 'rizz-off') {
                        // Scroll to Rizz-Off section
                      }
                    }}
                    style={[styles.playButton, { backgroundColor: game.comingSoon ? 'transparent' : game.color }]}
                  >
                    {game.comingSoon ? 'Soon' : 'Play'}
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Daily Challenge Detail */}
        {dailyChallenge && (
          <Card style={styles.challengeDetailCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Today's Challenge</Text>
              <Text style={styles.challengeScenario}>{dailyChallenge.scenario}</Text>
              
              <View style={styles.challengeProgress}>
                <Text style={styles.progressText}>
                  {dailyChallenge.submissions} submissions so far
                </Text>
                <ProgressBar 
                  progress={Math.min(dailyChallenge.submissions / 100, 1)} 
                  color={theme.colors.primary}
                  style={styles.progressBar}
                />
              </View>

              <Button
                mode="contained"
                onPress={() => navigation.navigate('Submit', { challenge: dailyChallenge })}
                style={styles.challengeButton}
              >
                Accept Challenge
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* Rizz-Off Battle */}
        {rizzOffPair && (
          <Card style={styles.rizzOffCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>⚔️ Rizz-Off Battle</Text>
              <Text style={styles.rizzOffDescription}>
                Which pickup line would work better? Vote for your favorite!
              </Text>

              <View style={styles.battleContainer}>
                {rizzOffPair.map((submission, index) => (
                  <Card
                    key={submission.id}
                    style={[
                      styles.battleCard,
                      selectedRizzOff === submission.id && styles.selectedBattleCard
                    ]}
                    onPress={() => handleRizzOffVote(submission.id)}
                  >
                    <Card.Content>
                      <Text style={styles.battleNumber}>Option {index + 1}</Text>
                      <Text style={styles.battleText}>"{submission.text}"</Text>
                      <Text style={styles.battleAuthor}>- {submission.author}</Text>
                      
                      {selectedRizzOff === submission.id && (
                        <View style={styles.voteIndicator}>
                          <Text style={styles.voteText}>✓ Your Vote</Text>
                        </View>
                      )}
                    </Card.Content>
                  </Card>
                ))}
              </View>

              {selectedRizzOff && (
                <View style={styles.voteResult}>
                  <Text style={styles.voteResultText}>
                    Vote submitted! +10 Rizz Points earned 🎉
                  </Text>
                  <Button
                    mode="outlined"
                    onPress={() => setSelectedRizzOff(null)}
                    style={styles.nextBattleButton}
                  >
                    Next Battle
                  </Button>
                </View>
              )}
            </Card.Content>
          </Card>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Button
            mode="outlined"
            icon="school"
            onPress={() => navigation.navigate('RizzAcademy')}
            style={styles.actionButton}
          >
            Rizz Academy
          </Button>
          
          <Button
            mode="outlined"
            icon="trophy"
            onPress={() => navigation.navigate('Leaderboard')}
            style={styles.actionButton}
          >
            Leaderboards
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  gamesContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  gameCard: {
    marginBottom: 16,
    elevation: 3,
    borderTopWidth: 4,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  comingSoonChip: {
    borderColor: theme.colors.placeholder,
  },
  gameDescription: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameMeta: {
    flex: 1,
  },
  difficultyChip: {
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  chipText: {
    fontSize: 10,
  },
  reward: {
    fontSize: 12,
    color: theme.colors.accent,
    fontWeight: '500',
  },
  playButton: {
    elevation: 2,
  },
  challengeDetailCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 12,
  },
  challengeScenario: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  challengeProgress: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  challengeButton: {
    marginTop: 8,
  },
  rizzOffCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    elevation: 2,
  },
  rizzOffDescription: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 16,
    lineHeight: 20,
  },
  battleContainer: {
    gap: 12,
    marginBottom: 16,
  },
  battleCard: {
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedBattleCard: {
    borderColor: theme.colors.primary,
    backgroundColor: '#f0f7ff',
  },
  battleNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 6,
  },
  battleText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 18,
    marginBottom: 6,
  },
  battleAuthor: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  voteIndicator: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  voteText: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  voteResult: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
  },
  voteResultText: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '500',
    marginBottom: 12,
  },
  nextBattleButton: {
    borderColor: '#2e7d32',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 10,
  },
  actionButton: {
    flex: 1,
  },
});

export default RizzGamesScreen;
