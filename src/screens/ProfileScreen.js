import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Avatar,
  Button,
  Switch,
  TextInput,
  Divider,
  List,
  IconButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../context/UserContext';
import { theme, rizzScale } from '../utils/theme';
import OpenAIService from '../services/OpenAIService';

const ProfileScreen = ({ navigation }) => {
  const { user, updateUser, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user?.username || '');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const handleSaveProfile = async () => {
    if (editedUsername.trim()) {
      await updateUser({ username: editedUsername.trim() });
      setIsEditing(false);
    }
  };

  const handleApiKeySubmit = async () => {
    if (apiKey.trim()) {
      const success = await OpenAIService.setApiKey(apiKey.trim());
      if (success) {
        Alert.alert('Success', 'API key saved successfully!');
        setApiKey('');
        setShowApiKeyInput(false);
      } else {
        Alert.alert('Error', 'Failed to save API key. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' }
      ]
    );
  };

  const toggleSetting = async (setting) => {
    await updateUser({
      settings: {
        ...user.settings,
        [setting]: !user.settings[setting]
      }
    });
  };

  const getRizzLevel = () => {
    const avgRating = user?.averageRating || 0;
    const level = Math.floor(avgRating);
    return rizzScale[Math.min(level, rizzScale.length - 1)];
  };

  const rizzLevel = getRizzLevel();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={theme.colors.gradient.rizz}
          style={styles.header}
        >
          <View style={styles.profileSection}>
            <Avatar.Text
              size={80}
              label={user?.username?.charAt(0) || 'U'}
              style={styles.avatar}
            />
            
            {isEditing ? (
              <View style={styles.editingContainer}>
                <TextInput
                  value={editedUsername}
                  onChangeText={setEditedUsername}
                  style={styles.usernameInput}
                  mode="outlined"
                />
                <View style={styles.editButtons}>
                  <Button onPress={() => setIsEditing(false)} textColor="white">
                    Cancel
                  </Button>
                  <Button onPress={handleSaveProfile} textColor="white">
                    Save
                  </Button>
                </View>
              </View>
            ) : (
              <View style={styles.userInfo}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.username}>{user?.username}</Text>
                  <IconButton
                    icon="pencil"
                    iconColor="white"
                    size={20}
                    onPress={() => setIsEditing(true)}
                  />
                </View>
                <Text style={styles.rizzStyle}>{user?.rizzStyle}</Text>
                <Text style={styles.email}>{user?.email}</Text>
              </View>
            )}
          </View>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statValue}>{user?.rizzPowerLevel || 0}</Text>
              <Text style={styles.statLabel}>Rizz Power</Text>
            </Card.Content>
          </Card>
          
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statValue}>
                {user?.averageRating?.toFixed(1) || '0.0'} {rizzLevel.emoji}
              </Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </Card.Content>
          </Card>
          
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statValue}>{user?.totalSubmissions || 0}</Text>
              <Text style={styles.statLabel}>Submissions</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Badges */}
        {user?.badges && user.badges.length > 0 && (
          <Card style={styles.badgesCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>🏆 Badges</Text>
              <View style={styles.badgesContainer}>
                {user.badges.map((badge, index) => (
                  <Card key={index} style={styles.badgeItem}>
                    <Card.Content style={styles.badgeContent}>
                      <Text style={styles.badgeText}>{badge}</Text>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Statistics */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>📊 Your Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statRow}>
                <Text style={styles.statRowLabel}>Total Ratings Received</Text>
                <Text style={styles.statRowValue}>{user?.stats?.totalRatings || 0}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statRowLabel}>Highest Rated</Text>
                <Text style={styles.statRowValue}>{user?.stats?.highestRated || 0}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statRowLabel}>Current Streak</Text>
                <Text style={styles.statRowValue}>{user?.stats?.streakDays || 0} days</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statRowLabel}>City Rank</Text>
                <Text style={styles.statRowValue}>#{user?.stats?.cityRank || 'N/A'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statRowLabel}>Global Rank</Text>
                <Text style={styles.statRowValue}>#{user?.stats?.globalRank || 'N/A'}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* API Key Section */}
        <Card style={styles.apiCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>🤖 OpenAI API Key</Text>
            <Text style={styles.apiDescription}>
              Add your OpenAI API key to enable AI analysis and suggestions.
            </Text>
            
            {showApiKeyInput ? (
              <View style={styles.apiInputContainer}>
                <TextInput
                  mode="outlined"
                  label="OpenAI API Key"
                  value={apiKey}
                  onChangeText={setApiKey}
                  secureTextEntry
                  placeholder="sk-..."
                  style={styles.apiInput}
                />
                <View style={styles.apiButtons}>
                  <Button onPress={() => setShowApiKeyInput(false)}>
                    Cancel
                  </Button>
                  <Button mode="contained" onPress={handleApiKeySubmit}>
                    Save
                  </Button>
                </View>
              </View>
            ) : (
              <Button
                mode="outlined"
                onPress={() => setShowApiKeyInput(true)}
                style={styles.apiButton}
              >
                Add/Update API Key
              </Button>
            )}
          </Card.Content>
        </Card>

        {/* Settings */}
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>⚙️ Settings</Text>
            
            <List.Item
              title="Notifications"
              description="Get notified about new ratings and challenges"
              right={() => (
                <Switch
                  value={user?.settings?.notifications}
                  onValueChange={() => toggleSetting('notifications')}
                />
              )}
            />
            
            <Divider />
            
            <List.Item
              title="Public Profile"
              description="Allow others to see your profile and stats"
              right={() => (
                <Switch
                  value={user?.settings?.publicProfile}
                  onValueChange={() => toggleSetting('publicProfile')}
                />
              )}
            />
            
            <Divider />
            
            <List.Item
              title="AI Analysis"
              description="Automatically analyze submissions with AI"
              right={() => (
                <Switch
                  value={user?.settings?.aiAnalysis}
                  onValueChange={() => toggleSetting('aiAnalysis')}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Games', { screen: 'RizzAcademy' })}
            style={styles.actionButton}
          >
            Visit Rizz Academy
          </Button>
          
          <Button
            mode="contained"
            onPress={handleLogout}
            style={[styles.actionButton, styles.logoutButton]}
            buttonColor={theme.colors.error}
          >
            Logout
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
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 16,
  },
  editingContainer: {
    width: '100%',
    alignItems: 'center',
  },
  usernameInput: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginBottom: 10,
    width: '80%',
  },
  editButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  rizzStyle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -15,
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    elevation: 4,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 12,
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
  badgesCard: {
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
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badgeItem: {
    backgroundColor: theme.colors.primary,
  },
  badgeContent: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  statsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    elevation: 2,
  },
  statsGrid: {
    gap: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statRowLabel: {
    fontSize: 14,
    color: theme.colors.text,
  },
  statRowValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  apiCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    elevation: 2,
    backgroundColor: '#f8f9fa',
  },
  apiDescription: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginBottom: 12,
    lineHeight: 20,
  },
  apiInputContainer: {
    gap: 12,
  },
  apiInput: {
    backgroundColor: 'white',
  },
  apiButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  apiButton: {
    alignSelf: 'flex-start',
  },
  settingsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  actionButton: {
    marginVertical: 4,
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
