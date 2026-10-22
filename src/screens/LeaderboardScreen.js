import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Text,
  Card,
  Avatar,
  Chip,
  SegmentedButtons,
  Searchbar,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useRizz } from '../context/RizzContext';
import { theme, rizzScale } from '../utils/theme';

const LeaderboardScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [selectedScope, setSelectedScope] = useState('global');
  const [searchQuery, setSearchQuery] = useState('');
  const { leaderboards } = useRizz();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Refresh leaderboard data
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRizzLevel = (score) => {
    const level = rizzScale.find(s => score >= s.value) || rizzScale[0];
    return level;
  };

  const filteredLeaderboard = leaderboards.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const periodOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'allTime', label: 'All Time' },
  ];

  const scopeOptions = [
    { value: 'global', label: 'Global' },
    { value: 'city', label: 'City' },
    { value: 'school', label: 'School' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={theme.colors.gradient.accent}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🏆 Rizz Rankings</Text>
        <Text style={styles.headerSubtitle}>
          See who's got the smoothest game
        </Text>
      </LinearGradient>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Filters */}
        <View style={styles.filtersContainer}>
          {/* Period Filter */}
          <Card style={styles.filterCard}>
            <Card.Content>
              <Text style={styles.filterTitle}>Time Period</Text>
              <SegmentedButtons
                value={selectedPeriod}
                onValueChange={setSelectedPeriod}
                buttons={periodOptions}
                style={styles.segmentedButtons}
              />
            </Card.Content>
          </Card>

          {/* Scope Filter */}
          <Card style={styles.filterCard}>
            <Card.Content>
              <Text style={styles.filterTitle}>Scope</Text>
              <SegmentedButtons
                value={selectedScope}
                onValueChange={setSelectedScope}
                buttons={scopeOptions}
                style={styles.segmentedButtons}
              />
            </Card.Content>
          </Card>

          {/* Search */}
          <Searchbar
            placeholder="Search users..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />
        </View>

        {/* Leaderboard */}
        <View style={styles.leaderboardContainer}>
          {filteredLeaderboard.length > 0 ? (
            filteredLeaderboard.map((user, index) => {
              const rank = index + 1;
              const rizzLevel = getRizzLevel(user.score);
              
              return (
                <Card 
                  key={user.id} 
                  style={[
                    styles.userCard,
                    rank <= 3 && styles.topThreeCard,
                    rank === 1 && styles.firstPlaceCard
                  ]}
                >
                  <Card.Content style={styles.userContent}>
                    {/* Rank */}
                    <View style={styles.rankContainer}>
                      <Text style={[
                        styles.rankText,
                        rank <= 3 && styles.topRankText
                      ]}>
                        {getRankEmoji(rank)}
                      </Text>
                    </View>

                    {/* User Info */}
                    <Avatar.Text
                      size={rank === 1 ? 50 : 40}
                      label={user.username.charAt(0)}
                      style={[
                        styles.avatar,
                        rank === 1 && styles.firstPlaceAvatar
                      ]}
                    />

                    <View style={styles.userInfo}>
                      <Text style={[
                        styles.username,
                        rank === 1 && styles.firstPlaceUsername
                      ]}>
                        {user.username}
                      </Text>
                      <View style={styles.userStats}>
                        <Text style={styles.scoreText}>
                          {user.score.toFixed(1)} {rizzLevel.emoji}
                        </Text>
                        <Text style={styles.submissionsText}>
                          {user.submissions} submissions
                        </Text>
                      </View>
                    </View>

                    {/* Badges */}
                    <View style={styles.badgesContainer}>
                      {rank === 1 && (
                        <Chip mode="flat" style={styles.crownChip}>
                          👑 Rizz King
                        </Chip>
                      )}
                      {rank <= 3 && (
                        <Chip 
                          mode="outlined" 
                          style={styles.topChip}
                          textStyle={{ fontSize: 10 }}
                        >
                          Top 3
                        </Chip>
                      )}
                      {user.score >= 4.5 && (
                        <Chip 
                          mode="outlined" 
                          style={styles.eliteChip}
                          textStyle={{ fontSize: 10 }}
                        >
                          Elite
                        </Chip>
                      )}
                    </View>
                  </Card.Content>
                </Card>
              );
            })
          ) : (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <Text style={styles.emptyText}>
                  No users found for "{searchQuery}"
                </Text>
              </Card.Content>
            </Card>
          )}
        </View>

        {/* Stats Footer */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.statsTitle}>📊 Leaderboard Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{leaderboards.length}</Text>
                <Text style={styles.statLabel}>Total Users</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {leaderboards.reduce((sum, user) => sum + user.submissions, 0)}
                </Text>
                <Text style={styles.statLabel}>Total Submissions</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {(leaderboards.reduce((sum, user) => sum + user.score, 0) / leaderboards.length).toFixed(1)}
                </Text>
                <Text style={styles.statLabel}>Avg Rating</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
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
  filtersContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  filterCard: {
    marginBottom: 12,
    elevation: 2,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.primary,
  },
  segmentedButtons: {
    marginBottom: 0,
  },
  searchbar: {
    marginTop: 8,
    elevation: 2,
  },
  leaderboardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  userCard: {
    marginBottom: 8,
    elevation: 2,
  },
  topThreeCard: {
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accent,
  },
  firstPlaceCard: {
    borderLeftColor: '#ffd700',
    backgroundColor: '#fffef7',
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topRankText: {
    fontSize: 18,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginRight: 12,
  },
  firstPlaceAvatar: {
    backgroundColor: '#ffd700',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  firstPlaceUsername: {
    color: '#ff6b00',
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  submissionsText: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  badgesContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  crownChip: {
    backgroundColor: '#ffd700',
    height: 24,
  },
  topChip: {
    borderColor: theme.colors.accent,
    height: 20,
  },
  eliteChip: {
    borderColor: theme.colors.primary,
    height: 20,
  },
  emptyCard: {
    marginTop: 40,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.placeholder,
    textAlign: 'center',
  },
  statsCard: {
    margin: 20,
    marginTop: 10,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: theme.colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: 4,
  },
});

export default LeaderboardScreen;
