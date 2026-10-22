import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Chip,
  Switch,
  RadioButton,
  ActivityIndicator,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useRizz } from '../context/RizzContext';
import { useUser } from '../context/UserContext';
import { theme, rizzCategories } from '../utils/theme';
import OpenAIService from '../services/OpenAIService';

const SubmitScreen = ({ navigation, route }) => {
  const { challenge } = route.params || {};
  const { addSubmission } = useRizz();
  const { user } = useUser();
  
  const [rizzText, setRizzText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('sweet');
  const [isOriginal, setIsOriginal] = useState(true);
  const [submissionType, setSubmissionType] = useState('text');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [getAIAnalysis, setGetAIAnalysis] = useState(true);

  const handleSubmit = async () => {
    if (!rizzText.trim()) {
      Alert.alert('Error', 'Please enter your rizz before submitting!');
      return;
    }

    if (rizzText.length > 200) {
      Alert.alert('Error', 'Your rizz is too long! Keep it under 200 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const submission = {
        text: rizzText.trim(),
        type: submissionType,
        category: selectedCategory,
        author: user?.username || 'Anonymous',
        authorId: user?.id,
        isOriginal,
        challengeId: challenge?.id,
      };

      // Add submission to context
      const newSubmission = await addSubmission(submission);

      // Get AI analysis if requested and API key is available
      if (getAIAnalysis && await OpenAIService.hasApiKey()) {
        try {
          const context = challenge ? `This was submitted for a daily challenge: ${challenge.scenario}` : '';
          const analysis = await OpenAIService.analyzeRizz(rizzText, context);
          
          // Navigate to AI analysis screen
          navigation.navigate('AIAnalysis', { 
            submission: newSubmission, 
            analysis 
          });
        } catch (aiError) {
          console.error('AI analysis failed:', aiError);
          // Still show success, but without AI analysis
          Alert.alert(
            'Submitted Successfully!',
            'Your rizz has been submitted, but AI analysis is currently unavailable.',
            [{ text: 'OK', onPress: () => navigation.goBack() }]
          );
        }
      } else {
        Alert.alert(
          'Rizz Submitted! 🔥',
          'Your rizz is now live and ready for ratings!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }

      // Reset form
      setRizzText('');
      setSelectedCategory('sweet');
      setIsOriginal(true);
      
    } catch (error) {
      Alert.alert('Error', 'Failed to submit your rizz. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <LinearGradient
            colors={theme.colors.gradient.primary}
            style={styles.header}
          >
            <Text style={styles.headerTitle}>
              {challenge ? '🎯 Challenge Submission' : '✨ Drop Your Rizz'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {challenge ? challenge.title : 'Share your best pickup line with the world!'}
            </Text>
          </LinearGradient>

          {/* Challenge Info */}
          {challenge && (
            <Card style={styles.challengeCard}>
              <Card.Content>
                <Text style={styles.challengeTitle}>Challenge Scenario:</Text>
                <Text style={styles.challengeText}>{challenge.scenario}</Text>
                <Text style={styles.challengeReward}>🏆 {challenge.reward}</Text>
              </Card.Content>
            </Card>
          )}

          {/* Submission Form */}
          <View style={styles.form}>
            {/* Submission Type */}
            <Card style={styles.formCard}>
              <Card.Content>
                <Text style={styles.sectionTitle}>Submission Type</Text>
                <RadioButton.Group
                  onValueChange={setSubmissionType}
                  value={submissionType}
                >
                  <View style={styles.radioOption}>
                    <RadioButton value="text" />
                    <Text style={styles.radioLabel}>📝 Text</Text>
                  </View>
                  <View style={styles.radioOption}>
                    <RadioButton value="voice" disabled />
                    <Text style={[styles.radioLabel, styles.disabled]}>
                      🎤 Voice (Coming Soon)
                    </Text>
                  </View>
                  <View style={styles.radioOption}>
                    <RadioButton value="video" disabled />
                    <Text style={[styles.radioLabel, styles.disabled]}>
                      📹 Video (Coming Soon)
                    </Text>
                  </View>
                </RadioButton.Group>
              </Card.Content>
            </Card>

            {/* Text Input */}
            <Card style={styles.formCard}>
              <Card.Content>
                <Text style={styles.sectionTitle}>Your Rizz</Text>
                <TextInput
                  mode="outlined"
                  placeholder="Type your pickup line here..."
                  value={rizzText}
                  onChangeText={setRizzText}
                  multiline
                  numberOfLines={4}
                  maxLength={200}
                  style={styles.textInput}
                />
                <Text style={styles.characterCount}>
                  {rizzText.length}/200 characters
                </Text>
              </Card.Content>
            </Card>

            {/* Category Selection */}
            <Card style={styles.formCard}>
              <Card.Content>
                <Text style={styles.sectionTitle}>Category</Text>
                <View style={styles.categoryContainer}>
                  {rizzCategories.map((category) => (
                    <Chip
                      key={category.id}
                      mode={selectedCategory === category.id ? 'flat' : 'outlined'}
                      selected={selectedCategory === category.id}
                      onPress={() => setSelectedCategory(category.id)}
                      style={[
                        styles.categoryChip,
                        selectedCategory === category.id && {
                          backgroundColor: category.color,
                        }
                      ]}
                      textStyle={[
                        selectedCategory === category.id && { color: 'white' }
                      ]}
                    >
                      {category.icon} {category.label}
                    </Chip>
                  ))}
                </View>
              </Card.Content>
            </Card>

            {/* Options */}
            <Card style={styles.formCard}>
              <Card.Content>
                <Text style={styles.sectionTitle}>Options</Text>
                
                <View style={styles.optionRow}>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>Original Content</Text>
                    <Text style={styles.optionSubtitle}>
                      This is my own original pickup line
                    </Text>
                  </View>
                  <Switch
                    value={isOriginal}
                    onValueChange={setIsOriginal}
                  />
                </View>

                <View style={styles.optionRow}>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>AI Analysis</Text>
                    <Text style={styles.optionSubtitle}>
                      Get instant feedback from our AI coach
                    </Text>
                  </View>
                  <Switch
                    value={getAIAnalysis}
                    onValueChange={setGetAIAnalysis}
                  />
                </View>
              </Card.Content>
            </Card>

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={isSubmitting || !rizzText.trim()}
              style={styles.submitButton}
              contentStyle={styles.submitButtonContent}
            >
              {isSubmitting ? (
                <>
                  <ActivityIndicator size="small" color="white" />
                  <Text style={styles.submitButtonText}> Submitting...</Text>
                </>
              ) : (
                'Submit Rizz 🔥'
              )}
            </Button>

            {/* Tips */}
            <Card style={styles.tipsCard}>
              <Card.Content>
                <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
                <Text style={styles.tipText}>
                  • Be original and creative{'\n'}
                  • Keep it respectful and appropriate{'\n'}
                  • Consider your audience{'\n'}
                  • Confidence is key, but don't be cocky{'\n'}
                  • Have fun with it!
                </Text>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
  challengeCard: {
    margin: 20,
    marginBottom: 10,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accent,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  challengeText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  challengeReward: {
    fontSize: 12,
    color: theme.colors.accent,
    fontWeight: '500',
  },
  form: {
    padding: 20,
    paddingTop: 20,
  },
  formCard: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.colors.primary,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  disabled: {
    color: theme.colors.placeholder,
  },
  textInput: {
    backgroundColor: theme.colors.surface,
    marginBottom: 8,
  },
  characterCount: {
    textAlign: 'right',
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    marginBottom: 4,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  optionText: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionSubtitle: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: 2,
  },
  submitButton: {
    marginVertical: 20,
    elevation: 4,
  },
  submitButtonContent: {
    paddingVertical: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsCard: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.primary,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
});

export default SubmitScreen;
