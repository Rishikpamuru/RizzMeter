import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Share,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Chip,
  Divider,
  IconButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { formatDistanceToNow } from 'date-fns';
import { theme, rizzScale, rizzCategories } from '../utils/theme';
import RizzCard from '../components/RizzCard';

const RizzDetailScreen = ({ navigation, route }) => {
  const { submission } = route.params;

  const getRizzScaleInfo = (rating) => {
    const scale = rizzScale.find(s => s.value === Math.round(rating));
    return scale || rizzScale[0];
  };

  const getCategoryInfo = (categoryId) => {
    return rizzCategories.find(cat => cat.id === categoryId) || rizzCategories[0];
  };

  const shareRizz = async () => {
    try {
      const message = `Check out this rizz! 🔥\n\n"${submission.text}"\n\nBy: ${submission.author}\nRating: ${submission.averageRating?.toFixed(1) || 'Not rated yet'}/5\n\nRate rizz and share your own at RizzMeter!`;
      
      await Share.share({
        message,
        title: 'Share this Rizz'
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const scaleInfo = getRizzScaleInfo(submission.averageRating || 0);
  const categoryInfo = getCategoryInfo(submission.category);
  const timeAgo = formatDistanceToNow(new Date(submission.timestamp), { addSuffix: true });

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={theme.colors.gradient.primary}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Rizz Details</Text>
          <Text style={styles.headerSubtitle}>Full analysis and ratings</Text>
        </View>
        <IconButton
          icon="share-variant"
          iconColor="white"
          size={24}
          onPress={shareRizz}
          style={styles.shareButton}
        />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Rizz Card */}
        <Card style={styles.mainCard}>
          <Card.Content>
            <View style={styles.mainHeader}>
              <View style={styles.authorSection}>
                <Text style={styles.authorName}>{submission.author}</Text>
                <Text style={styles.timestamp}>{timeAgo}</Text>
              </View>
              <View style={styles.badges}>
                <Chip
                  mode="flat"
                  style={[styles.categoryChip, { backgroundColor: categoryInfo.color }]}
                  textStyle={{ color: 'white' }}
                >
                  {categoryInfo.icon} {categoryInfo.label}
                </Chip>
                {submission.isOriginal && (
                  <Chip mode="outlined" style={styles.originalChip}>
                    ⭐ Original
                  </Chip>
                )}
              </View>
            </View>

            <Divider style={styles.divider} />

            {/* The Rizz */}
            <View style={styles.rizzSection}>
              <Text style={styles.rizzLabel}>The Rizz:</Text>
              <Text style={styles.rizzText}>"{submission.text}"</Text>
            </View>

            <Divider style={styles.divider} />

            {/* Rating Overview */}
            {submission.ratings && submission.ratings.length > 0 ? (
              <View style={styles.ratingOverview}>
                <Text style={styles.sectionTitle}>📊 Rating Overview</Text>
                
                <View style={styles.ratingDisplay}>
                  <Text style={styles.averageRating}>
                    {submission.averageRating?.toFixed(1) || '0.0'}
                  </Text>
                  <View style={styles.ratingInfo}>
                    <Text style={styles.ratingEmoji}>{scaleInfo.emoji}</Text>
                    <Text style={styles.ratingLabel}>{scaleInfo.label}</Text>
                    <Text style={styles.ratingCount}>
                      Based on {submission.ratings.length} rating{submission.ratings.length !== 1 ? 's' : ''}
                    </Text>
                  </View>
                </View>

                {/* Rating Distribution */}
                <View style={styles.distributionSection}>
                  <Text style={styles.distributionTitle}>Rating Distribution:</Text>
                  {rizzScale.map((scale) => {
                    const count = submission.ratings.filter(r => r === scale.value).length;
                    const percentage = submission.ratings.length > 0 ? (count / submission.ratings.length) * 100 : 0;
                    
                    return (
                      <View key={scale.value} style={styles.distributionRow}>
                        <Text style={styles.scaleEmoji}>{scale.emoji}</Text>
                        <Text style={styles.scaleValue}>{scale.value}</Text>
                        <View style={styles.distributionBar}>
                          <View 
                            style={[
                              styles.distributionFill, 
                              { 
                                width: `${percentage}%`, 
                                backgroundColor: scale.color 
                              }
                            ]} 
                          />
                        </View>
                        <Text style={styles.distributionCount}>{count}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : (
              <View style={styles.noRatings}>
                <Text style={styles.noRatingsText}>
                  No ratings yet! Be the first to rate this rizz.
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* AI Analysis */}
        {submission.aiAnalysis && (
          <Card style={styles.analysisCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>🤖 AI Analysis</Text>
              
              <View style={styles.analysisGrid}>
                <View style={styles.analysisItem}>
                  <Text style={styles.analysisLabel}>Tone</Text>
                  <Chip mode="flat" style={styles.toneChip}>
                    {submission.aiAnalysis.tone}
                  </Chip>
                </View>
                
                <View style={styles.analysisItem}>
                  <Text style={styles.analysisLabel}>Cleverness</Text>
                  <Text style={styles.analysisScore}>
                    {submission.aiAnalysis.cleverness}/10
                  </Text>
                </View>
                
                <View style={styles.analysisItem}>
                  <Text style={styles.analysisLabel}>Boldness</Text>
                  <Text style={styles.analysisScore}>
                    {submission.aiAnalysis.boldness}/10
                  </Text>
                </View>
                
                <View style={styles.analysisItem}>
                  <Text style={styles.analysisLabel}>Overall Score</Text>
                  <Text style={[styles.analysisScore, styles.overallScore]}>
                    {submission.aiAnalysis.overallScore}/10
                  </Text>
                </View>
              </View>

              <Divider style={styles.divider} />

              <Text style={styles.suggestionText}>
                "{submission.aiAnalysis.suggestions}"
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <Button
            mode="contained"
            icon="robot"
            onPress={() => navigation.navigate('AIAnalysis', { 
              submission, 
              analysis: submission.aiAnalysis || {
                tone: 'Unknown',
                cleverness: 5,
                boldness: 5,
                overallScore: 5,
                suggestions: 'No AI analysis available for this submission.'
              }
            })}
            style={styles.actionButton}
            disabled={!submission.aiAnalysis}
          >
            {submission.aiAnalysis ? 'View Full AI Analysis' : 'AI Analysis Not Available'}
          </Button>
          
          <Button
            mode="outlined"
            icon="plus"
            onPress={() => navigation.navigate('Submit')}
            style={styles.actionButton}
          >
            Submit Your Own Rizz
          </Button>
        </View>

        {/* Similar Rizz */}
        <Card style={styles.similarCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>💡 Want to improve?</Text>
            <Text style={styles.similarText}>
              Check out the Rizz Academy to learn tips and techniques for better pickup lines!
            </Text>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Games', { screen: 'RizzAcademy' })}
              style={styles.academyButton}
            >
              Visit Rizz Academy
            </Button>
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
  mainCard: {
    margin: 20,
    marginBottom: 16,
    elevation: 4,
  },
  mainHeader: {
    marginBottom: 16,
  },
  authorSection: {
    marginBottom: 12,
  },
  authorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: 2,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    elevation: 1,
  },
  originalChip: {
    borderColor: theme.colors.accent,
  },
  divider: {
    marginVertical: 16,
  },
  rizzSection: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  rizzLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  rizzText: {
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 26,
    color: theme.colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 16,
  },
  ratingOverview: {
    marginTop: 8,
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f7ff',
    padding: 16,
    borderRadius: 8,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginRight: 16,
  },
  ratingInfo: {
    flex: 1,
  },
  ratingEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingCount: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  distributionSection: {
    marginTop: 8,
  },
  distributionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scaleEmoji: {
    fontSize: 16,
    width: 24,
    textAlign: 'center',
  },
  scaleValue: {
    fontSize: 12,
    width: 20,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  distributionBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  distributionFill: {
    height: '100%',
    borderRadius: 4,
  },
  distributionCount: {
    fontSize: 12,
    width: 20,
    textAlign: 'center',
    color: theme.colors.placeholder,
  },
  noRatings: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noRatingsText: {
    fontSize: 16,
    color: theme.colors.placeholder,
    textAlign: 'center',
  },
  analysisCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    elevation: 2,
  },
  analysisGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  analysisItem: {
    alignItems: 'center',
    minWidth: 70,
  },
  analysisLabel: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginBottom: 4,
  },
  analysisScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  overallScore: {
    fontSize: 18,
    color: theme.colors.accent,
  },
  toneChip: {
    backgroundColor: theme.colors.primary,
  },
  suggestionText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    color: theme.colors.text,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    marginVertical: 4,
  },
  similarCard: {
    margin: 20,
    marginTop: 16,
    elevation: 2,
    backgroundColor: '#e8f5e8',
  },
  similarText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    color: '#2e7d32',
  },
  academyButton: {
    borderColor: '#2e7d32',
  },
});

export default RizzDetailScreen;
