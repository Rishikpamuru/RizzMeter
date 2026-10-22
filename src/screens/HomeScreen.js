import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  FAB,
  Chip,
  Avatar,
  IconButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useRizz } from '../context/RizzContext';
import { useUser } from '../context/UserContext';
import { theme, rizzScale } from '../utils/theme';
import RizzCard from '../components/RizzCard';
import StatsCard from '../components/StatsCard';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { submissions, dailyChallenge, isLoading, getTopRatedSubmissions } = useRizz();
  const { user } = useUser();

  const topSubmissions = getTopRatedSubmissions(5);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Refresh data from server
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const getRizzScaleInfo = (rating) => {
    const scale = rizzScale.find(s => s.value === Math.round(rating));
    return scale || rizzScale[0];
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header */}
        <LinearGradient
          colors={theme.colors.gradient.rizz}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.usernameText}>{user?.username || 'Rizzler'}</Text>
            </View>
            <Avatar.Text
              size={50}
              label={user?.username?.charAt(0) || 'R'}
              style={styles.avatar}
            />
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <StatsCard
            title="Rizz Power"
            value={user?.rizzPowerLevel || 0}
            subtitle="Level"
            icon="flash"
            color={theme.colors.primary}
          />
          <StatsCard
            title="Avg Rating"
            value={user?.averageRating || 0}
            subtitle={getRizzScaleInfo(user?.averageRating).emoji}
            icon="star"
            color={theme.colors.accent}
          />
        </View>

        {/* Daily Challenge */}
        {dailyChallenge && (
          <Card style={styles.challengeCard}>
            <Card.Content>
              <View style={styles.challengeHeader}>
                <Text style={styles.challengeTitle}>🎯 Daily Challenge</Text>
                <Chip mode="outlined" compact>
                  {dailyChallenge.submissions} submissions
                </Chip>
              </View>
              <Text style={styles.challengeScenario}>
                {dailyChallenge.scenario}
              </Text>
              <Text style={styles.challengeReward}>
                🏆 Reward: {dailyChallenge.reward}
              </Text>
              <Button
                mode="contained"
                style={styles.challengeButton}
                onPress={() => navigation.navigate('Submit', { challenge: dailyChallenge })}
              >
                Accept Challenge
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* Recent Submissions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Hot Rizz Right Now</Text>
            <Button onPress={() => navigation.navigate('Leaderboard')}>
              View All
            </Button>
          </View>
          
          {topSubmissions.length > 0 ? (
            topSubmissions.map((submission) => (
              <RizzCard
                key={submission.id}
                submission={submission}
                onPress={() => navigation.navigate('RizzDetail', { submission })}
                showRating={true}
              />
            ))
          ) : (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <Text style={styles.emptyText}>
                  No submissions yet! Be the first to drop some rizz 🔥
                </Text>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('Submit')}
                  style={styles.emptyButton}
                >
                  Submit Your Rizz
                </Button>
              </Card.Content>
            </Card>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Button
            mode="outlined"
            icon="school"
            style={styles.actionButton}
            onPress={() => navigation.navigate('Games', { screen: 'RizzAcademy' })}
          >
            Rizz Academy
          </Button>
          <Button
            mode="outlined"
            icon="trophy"
            style={styles.actionButton}
            onPress={() => navigation.navigate('Leaderboard')}
          >
            Rankings
          </Button>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Submit')}
        label="Submit Rizz"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  avatar: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -15,
    marginBottom: 20,
    gap: 10,
  },
  challengeCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 4,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  challengeScenario: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  challengeReward: {
    fontSize: 12,
    color: theme.colors.accent,
    marginBottom: 15,
  },
  challengeButton: {
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCard: {
    marginBottom: 10,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    color: theme.colors.placeholder,
  },
  emptyButton: {
    marginTop: 10,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 10,
  },
  actionButton: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default HomeScreen;
