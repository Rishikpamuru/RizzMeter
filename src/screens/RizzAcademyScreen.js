import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Chip,
  List,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../utils/theme';

const RizzAcademyScreen = ({ navigation }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const academyModules = [
    {
      id: 'fundamentals',
      title: '📚 Rizz Fundamentals',
      description: 'Master the basics of charm and confidence',
      lessons: [
        'Understanding Body Language',
        'Confidence vs. Cockiness',
        'Reading Social Cues',
        'First Impressions Matter',
      ],
      difficulty: 'Beginner',
      duration: '15 min',
      color: '#4caf50',
    },
    {
      id: 'conversation',
      title: '💬 Conversation Starters',
      description: 'Learn to break the ice naturally',
      lessons: [
        'Situation-Based Openers',
        'Observational Humor',
        'Genuine Compliments',
        'Avoiding Generic Lines',
      ],
      difficulty: 'Beginner',
      duration: '20 min',
      color: '#2196f3',
    },
    {
      id: 'humor',
      title: '😄 Humor & Timing',
      description: 'Make them laugh without being cringe',
      lessons: [
        'Types of Humor',
        'Timing Your Jokes',
        'Self-Deprecating Humor',
        'Reading the Room',
      ],
      difficulty: 'Intermediate',
      duration: '25 min',
      color: '#ff9800',
    },
    {
      id: 'digital',
      title: '📱 Digital Game',
      description: 'Master the art of online rizz',
      lessons: [
        'Crafting Great Opening Messages',
        'Profile Optimization',
        'Photo Selection Tips',
        'Keeping Conversations Flowing',
      ],
      difficulty: 'Intermediate',
      duration: '30 min',
      color: '#9c27b0',
    },
    {
      id: 'advanced',
      title: '🎭 Advanced Techniques',
      description: 'Elevate your game to the next level',
      lessons: [
        'Creating Mystery & Intrigue',
        'Push-Pull Dynamics',
        'Storytelling Mastery',
        'Building Emotional Connection',
      ],
      difficulty: 'Advanced',
      duration: '35 min',
      color: '#f44336',
    },
    {
      id: 'respect',
      title: '🤝 Respect & Boundaries',
      description: 'Learn healthy communication skills',
      lessons: [
        'Understanding Consent',
        'Recognizing Red Flags',
        'Graceful Rejection Handling',
        'Building Healthy Relationships',
      ],
      difficulty: 'Essential',
      duration: '20 min',
      color: '#795548',
    },
  ];

  const tips = [
    {
      category: 'Quick Tips',
      icon: '💡',
      items: [
        'Be genuinely interested in the other person',
        'Listen more than you speak',
        'Use their name in conversation',
        'Make eye contact and smile',
        'Be yourself, authenticity is attractive',
      ]
    },
    {
      category: 'Common Mistakes',
      icon: '⚠️',
      items: [
        'Using overly rehearsed lines',
        'Talking only about yourself',
        'Being too aggressive or pushy',
        'Ignoring social cues',
        'Trying too hard to impress',
      ]
    },
    {
      category: 'Red Flags to Avoid',
      icon: '🚩',
      items: [
        'Persistent after being told no',
        'Making inappropriate comments',
        'Love bombing or excessive flattery',
        'Pressure for immediate responses',
        'Disrespecting boundaries',
      ]
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4caf50';
      case 'Intermediate': return '#ff9800';
      case 'Advanced': return '#f44336';
      case 'Essential': return '#795548';
      default: return theme.colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>🎓 Rizz Academy</Text>
          <Text style={styles.headerSubtitle}>
            Learn the art of charm, confidence, and respectful communication
          </Text>
        </LinearGradient>

        {/* Welcome Card */}
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Text style={styles.welcomeTitle}>Welcome to Rizz Academy! 🎉</Text>
            <Text style={styles.welcomeText}>
              Whether you're new to the game or looking to refine your skills, our academy 
              teaches you how to be charming, confident, and most importantly, respectful. 
              Remember: the best rizz comes from being genuinely interested in others and 
              treating everyone with kindness.
            </Text>
          </Card.Content>
        </Card>

        {/* Learning Modules */}
        <View style={styles.modulesContainer}>
          <Text style={styles.sectionTitle}>📖 Learning Modules</Text>
          
          {academyModules.map((module) => (
            <Card key={module.id} style={[styles.moduleCard, { borderLeftColor: module.color }]}>
              <Card.Content>
                <View style={styles.moduleHeader}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <View style={styles.moduleMeta}>
                    <Chip 
                      mode="outlined" 
                      compact 
                      style={[styles.difficultyChip, { borderColor: getDifficultyColor(module.difficulty) }]}
                      textStyle={{ color: getDifficultyColor(module.difficulty), fontSize: 10 }}
                    >
                      {module.difficulty}
                    </Chip>
                  </View>
                </View>
                
                <Text style={styles.moduleDescription}>{module.description}</Text>
                
                <View style={styles.moduleInfo}>
                  <Text style={styles.moduleDuration}>⏱️ {module.duration}</Text>
                  <Text style={styles.lessonCount}>{module.lessons.length} lessons</Text>
                </View>

                <List.Accordion
                  title="View Lessons"
                  expanded={expandedSection === module.id}
                  onPress={() => toggleSection(module.id)}
                  titleStyle={styles.accordionTitle}
                  style={styles.accordion}
                >
                  {module.lessons.map((lesson, index) => (
                    <List.Item
                      key={index}
                      title={`${index + 1}. ${lesson}`}
                      titleStyle={styles.lessonTitle}
                      left={() => <Text style={styles.lessonNumber}>📚</Text>}
                    />
                  ))}
                </List.Accordion>

                <Button
                  mode="contained"
                  style={[styles.startButton, { backgroundColor: module.color }]}
                  onPress={() => {
                    // TODO: Navigate to module content
                    alert(`Starting ${module.title}!\n\nThis feature is coming soon. For now, practice the fundamentals from the tips below!`);
                  }}
                >
                  Start Module
                </Button>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Quick Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>💡 Quick Reference</Text>
          
          {tips.map((tipCategory, categoryIndex) => (
            <Card key={categoryIndex} style={styles.tipCard}>
              <Card.Content>
                <Text style={styles.tipCategoryTitle}>
                  {tipCategory.icon} {tipCategory.category}
                </Text>
                <View style={styles.tipsList}>
                  {tipCategory.items.map((tip, tipIndex) => (
                    <View key={tipIndex} style={styles.tipItem}>
                      <Text style={styles.tipBullet}>•</Text>
                      <Text style={styles.tipText}>{tip}</Text>
                    </View>
                  ))}
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Practice Section */}
        <Card style={styles.practiceCard}>
          <Card.Content>
            <Text style={styles.practiceTitle}>🎯 Ready to Practice?</Text>
            <Text style={styles.practiceText}>
              Put your learning into action! Try today's challenge or test your skills 
              in our Rizz Games.
            </Text>
            
            <View style={styles.practiceButtons}>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Submit')}
                style={styles.practiceButton}
              >
                Submit Your Rizz
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => navigation.navigate('RizzGames')}
                style={styles.practiceButton}
              >
                Play Rizz Games
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Remember: Respect and kindness are the foundation of all great interactions. 
            The goal isn't just to impress, but to create genuine connections! 💙
          </Text>
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
    lineHeight: 22,
  },
  welcomeCard: {
    margin: 20,
    elevation: 3,
    backgroundColor: '#e3f2fd',
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1565c0',
  },
  modulesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 16,
  },
  moduleCard: {
    marginBottom: 16,
    elevation: 2,
    borderLeftWidth: 4,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    flex: 1,
    marginRight: 8,
  },
  moduleMeta: {
    alignItems: 'flex-end',
  },
  difficultyChip: {
    height: 24,
  },
  moduleDescription: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 8,
    lineHeight: 18,
  },
  moduleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  moduleDuration: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  lessonCount: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  accordion: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  accordionTitle: {
    fontSize: 14,
    color: theme.colors.primary,
  },
  lessonTitle: {
    fontSize: 13,
    marginLeft: -8,
  },
  lessonNumber: {
    fontSize: 12,
    marginRight: 8,
  },
  startButton: {
    marginTop: 12,
    elevation: 2,
  },
  tipsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tipCard: {
    marginBottom: 12,
    elevation: 2,
  },
  tipCategoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 12,
  },
  tipsList: {
    gap: 6,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 14,
    color: theme.colors.primary,
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  practiceCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
    backgroundColor: '#f3e5f5',
  },
  practiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  practiceText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    color: '#6a1b9a',
  },
  practiceButtons: {
    gap: 8,
  },
  practiceButton: {
    marginVertical: 2,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#e8f5e8',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#2e7d32',
    fontStyle: 'italic',
  },
});

export default RizzAcademyScreen;
