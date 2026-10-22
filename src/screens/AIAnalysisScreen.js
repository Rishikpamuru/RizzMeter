import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  ProgressBar,
  Chip,
  Divider,
  IconButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme, rizzScale } from '../utils/theme';
import OpenAIService from '../services/OpenAIService';

const AIAnalysisScreen = ({ navigation, route }) => {
  const { submission, analysis } = route.params;
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [simulatedResponse, setSimulatedResponse] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 8) return '#4caf50';
    if (score >= 6) return '#ff9800';
    if (score >= 4) return '#ff5722';
    return '#f44336';
  };

  const getRizzLevel = (score) => {
    const level = Math.floor(score / 2);
    return rizzScale[Math.min(level, rizzScale.length - 1)];
  };

  const generateSuggestions = async () => {
    setIsGeneratingSuggestion(true);
    try {
      const newSuggestions = await OpenAIService.generateRizzSuggestion(
        `Improve this pickup line: "${submission.text}"`,
        analysis.tone.toLowerCase()
      );
      setSuggestions(newSuggestions);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate suggestions. Please try again.');
      console.error('Suggestion generation error:', error);
    } finally {
      setIsGeneratingSuggestion(false);
    }
  };

  const simulateResponse = async () => {
    setIsSimulating(true);
    try {
      const response = await OpenAIService.simulateResponse(submission.text);
      setSimulatedResponse(response);
    } catch (error) {
      Alert.alert('Error', 'Failed to simulate response. Please try again.');
      console.error('Response simulation error:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  const shareAnalysis = async () => {
    try {
      const message = `Check out my rizz analysis! 🔥\n\n"${submission.text}"\n\nOverall Score: ${analysis.overallScore}/10\nTone: ${analysis.tone}\n\nGet your rizz analyzed at RizzMeter!`;
      
      await Share.share({
        message,
        title: 'My Rizz Analysis'
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const overallLevel = getRizzLevel(analysis.overallScore);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={theme.colors.gradient.primary}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>🤖 AI Rizz Analysis</Text>
          <Text style={styles.headerSubtitle}>
            Here's what our AI coach thinks about your game
          </Text>
        </View>
        <IconButton
          icon="share-variant"
          iconColor="white"
          size={24}
          onPress={shareAnalysis}
          style={styles.shareButton}
        />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Original Submission */}
        <Card style={styles.submissionCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Your Rizz</Text>
            <Text style={styles.submissionText}>"{submission.text}"</Text>
            <View style={styles.submissionMeta}>
              <Chip mode="outlined" compact>
                {submission.category}
              </Chip>
              {submission.isOriginal && (
                <Chip mode="outlined" compact style={styles.originalChip}>
                  ⭐ Original
                </Chip>
              )}
            </View>
          </Card.Content>
        </Card>

        {/* Overall Score */}
        <Card style={styles.scoreCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Overall Rizz Score</Text>
            <View style={styles.scoreDisplay}>
              <Text style={[styles.scoreNumber, { color: getScoreColor(analysis.overallScore) }]}>
                {analysis.overallScore}
              </Text>
              <Text style={styles.scoreOutOf}>/10</Text>
              <Text style={styles.scoreEmoji}>{overallLevel.emoji}</Text>
            </View>
            <Text style={styles.scoreLabel}>{overallLevel.label}</Text>
            <ProgressBar
              progress={analysis.overallScore / 10}
              color={getScoreColor(analysis.overallScore)}
              style={styles.progressBar}
            />
          </Card.Content>
        </Card>

        {/* Detailed Breakdown */}
        <Card style={styles.breakdownCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Detailed Breakdown</Text>
            
            {/* Tone */}
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Tone</Text>
              <Chip mode="flat" style={styles.toneChip}>
                {analysis.tone}
              </Chip>
            </View>

            <Divider style={styles.divider} />

            {/* Cleverness */}
            <View style={styles.breakdownItem}>
              <View style={styles.breakdownHeader}>
                <Text style={styles.breakdownLabel}>Cleverness</Text>
                <Text style={[styles.breakdownScore, { color: getScoreColor(analysis.cleverness) }]}>
                  {analysis.cleverness}/10
                </Text>
              </View>
              <ProgressBar
                progress={analysis.cleverness / 10}
                color={getScoreColor(analysis.cleverness)}
                style={styles.miniProgressBar}
              />
            </View>

            <Divider style={styles.divider} />

            {/* Boldness */}
            <View style={styles.breakdownItem}>
              <View style={styles.breakdownHeader}>
                <Text style={styles.breakdownLabel}>Boldness</Text>
                <Text style={[styles.breakdownScore, { color: getScoreColor(analysis.boldness) }]}>
                  {analysis.boldness}/10
                </Text>
              </View>
              <ProgressBar
                progress={analysis.boldness / 10}
                color={getScoreColor(analysis.boldness)}
                style={styles.miniProgressBar}
              />
            </View>
          </Card.Content>
        </Card>

        {/* AI Feedback */}
        <Card style={styles.feedbackCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>💡 AI Coach Feedback</Text>
            <Text style={styles.suggestionsText}>{analysis.suggestions}</Text>
            
            {analysis.encouragement && (
              <>
                <Divider style={styles.divider} />
                <Text style={styles.encouragementText}>{analysis.encouragement}</Text>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button
            mode="outlined"
            icon="lightbulb"
            onPress={generateSuggestions}
            loading={isGeneratingSuggestion}
            disabled={isGeneratingSuggestion}
            style={styles.actionButton}
          >
            Get Suggestions
          </Button>
          
          <Button
            mode="outlined"
            icon="chat"
            onPress={simulateResponse}
            loading={isSimulating}
            disabled={isSimulating}
            style={styles.actionButton}
          >
            Simulate Response
          </Button>
        </View>

        {/* Generated Suggestions */}
        {suggestions && (
          <Card style={styles.suggestionsCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>🚀 AI Suggestions</Text>
              {suggestions.map((suggestion, index) => (
                <Card key={index} style={styles.suggestionItem}>
                  <Card.Content>
                    <Text style={styles.suggestionText}>"{suggestion.text}"</Text>
                    <View style={styles.suggestionMeta}>
                      <Chip mode="outlined" compact textStyle={styles.suggestionChipText}>
                        {suggestion.style}
                      </Chip>
                      <Text style={styles.suggestionReason}>{suggestion.reasoning}</Text>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </Card.Content>
          </Card>
        )}

        {/* Simulated Response */}
        {simulatedResponse && (
          <Card style={styles.simulationCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>💬 Would This Work?</Text>
              <Text style={styles.simulationText}>"{simulatedResponse}"</Text>
              <Text style={styles.simulationNote}>
                This is a simulated response based on your rizz line.
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Submit')}
            style={styles.submitAnotherButton}
          >
            Submit Another Rizz
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            Back to Home
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  headerContent: {
    flex: 1,
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
  shareButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  submissionCard: {
    margin: 20,
    marginBottom: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 12,
  },
  submissionText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 12,
  },
  submissionMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  originalChip: {
    borderColor: theme.colors.accent,
  },
  scoreCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    elevation: 4,
    backgroundColor: '#f8f9fa',
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 8,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreOutOf: {
    fontSize: 24,
    color: theme.colors.placeholder,
    marginLeft: 4,
  },
  scoreEmoji: {
    fontSize: 32,
    marginLeft: 12,
  },
  scoreLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: theme.colors.primary,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  breakdownCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    elevation: 2,
  },
  breakdownItem: {
    marginVertical: 8,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  breakdownLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  breakdownScore: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toneChip: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
  },
  miniProgressBar: {
    height: 6,
    borderRadius: 3,
  },
  divider: {
    marginVertical: 12,
  },
  feedbackCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    elevation: 2,
  },
  suggestionsText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  encouragementText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    color: theme.colors.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
  },
  suggestionsCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    elevation: 2,
  },
  suggestionItem: {
    marginBottom: 8,
    backgroundColor: theme.colors.surface,
  },
  suggestionText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  suggestionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  suggestionChipText: {
    fontSize: 10,
  },
  suggestionReason: {
    fontSize: 12,
    color: theme.colors.placeholder,
    flex: 1,
  },
  simulationCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    elevation: 2,
    backgroundColor: '#e8f5e8',
  },
  simulationText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 8,
    color: '#2e7d32',
  },
  simulationNote: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  navigationContainer: {
    padding: 20,
    gap: 10,
  },
  submitAnotherButton: {
    marginBottom: 8,
  },
  backButton: {
    marginBottom: 20,
  },
});

export default AIAnalysisScreen;
