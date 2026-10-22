import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import {
  Card,
  Text,
  Chip,
  Avatar,
  IconButton,
  Button,
} from 'react-native-paper';
import { formatDistanceToNow } from 'date-fns';
import { theme, rizzScale, rizzCategories } from '../utils/theme';
import { useRizz } from '../context/RizzContext';

const RizzCard = ({ submission, onPress, showRating = false, allowRating = false }) => {
  const [userRating, setUserRating] = useState(null);
  const { rateSubmission } = useRizz();

  const getRizzScaleInfo = (rating) => {
    const scale = rizzScale.find(s => s.value === Math.round(rating));
    return scale || rizzScale[0];
  };

  const getCategoryInfo = (categoryId) => {
    return rizzCategories.find(cat => cat.id === categoryId) || rizzCategories[0];
  };

  const handleRating = async (rating) => {
    if (allowRating && !userRating) {
      setUserRating(rating);
      await rateSubmission(submission.id, rating);
    }
  };

  const scaleInfo = getRizzScaleInfo(submission.averageRating || 0);
  const categoryInfo = getCategoryInfo(submission.category);
  const timeAgo = formatDistanceToNow(new Date(submission.timestamp), { addSuffix: true });

  return (
    <Pressable onPress={onPress}>
      <Card style={[styles.card, showRating && styles.ratedCard]}>
        <Card.Content>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.authorInfo}>
              <Avatar.Text
                size={32}
                label={submission.author?.charAt(0) || 'A'}
                style={styles.avatar}
              />
              <View style={styles.authorDetails}>
                <Text style={styles.authorName}>{submission.author}</Text>
                <Text style={styles.timestamp}>{timeAgo}</Text>
              </View>
            </View>
            <View style={styles.badges}>
              <Chip
                mode="outlined"
                compact
                style={[styles.categoryChip, { borderColor: categoryInfo.color }]}
                textStyle={{ color: categoryInfo.color }}
              >
                {categoryInfo.icon} {categoryInfo.label}
              </Chip>
              {submission.isOriginal && (
                <Chip mode="outlined" compact style={styles.originalChip}>
                  ⭐ Original
                </Chip>
              )}
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.rizzText}>{submission.text}</Text>
          </View>

          {/* Rating Section */}
          {showRating && submission.ratings && submission.ratings.length > 0 && (
            <View style={styles.ratingSection}>
              <View style={styles.ratingDisplay}>
                <Text style={[styles.ratingEmoji, { fontSize: 24 }]}>
                  {scaleInfo.emoji}
                </Text>
                <View style={styles.ratingInfo}>
                  <Text style={styles.ratingScore}>
                    {submission.averageRating?.toFixed(1) || '0.0'}
                  </Text>
                  <Text style={styles.ratingLabel}>{scaleInfo.label}</Text>
                  <Text style={styles.ratingCount}>
                    {submission.ratings.length} rating{submission.ratings.length !== 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Interactive Rating */}
          {allowRating && (
            <View style={styles.interactiveRating}>
              <Text style={styles.ratingPrompt}>Rate this rizz:</Text>
              <View style={styles.ratingButtons}>
                {rizzScale.map((scale) => (
                  <Pressable
                    key={scale.value}
                    style={[
                      styles.ratingButton,
                      userRating === scale.value && styles.selectedRating
                    ]}
                    onPress={() => handleRating(scale.value)}
                    disabled={!!userRating}
                  >
                    <Text style={styles.ratingButtonEmoji}>{scale.emoji}</Text>
                    <Text style={styles.ratingButtonValue}>{scale.value}</Text>
                  </Pressable>
                ))}
              </View>
              {userRating !== null && (
                <Text style={styles.ratingThankYou}>
                  Thanks for rating! 🙏
                </Text>
              )}
            </View>
          )}

          {/* Actions */}
          <View style={styles.actions}>
            <IconButton
              icon="chart-line"
              size={20}
              onPress={() => onPress && onPress('analysis')}
            />
            <IconButton
              icon="share"
              size={20}
              onPress={() => onPress && onPress('share')}
            />
            <IconButton
              icon="heart-outline"
              size={20}
              onPress={() => onPress && onPress('like')}
            />
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  ratedCard: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  header: {
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginRight: 12,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  categoryChip: {
    height: 28,
  },
  originalChip: {
    height: 28,
    borderColor: theme.colors.accent,
  },
  content: {
    marginBottom: 12,
  },
  rizzText: {
    fontSize: 16,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  ratingSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingEmoji: {
    marginRight: 12,
  },
  ratingInfo: {
    flex: 1,
  },
  ratingScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  ratingCount: {
    fontSize: 10,
    color: theme.colors.placeholder,
  },
  interactiveRating: {
    marginBottom: 12,
  },
  ratingPrompt: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  ratingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ratingButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
    minWidth: 45,
  },
  selectedRating: {
    backgroundColor: theme.colors.primary,
  },
  ratingButtonEmoji: {
    fontSize: 16,
    marginBottom: 2,
  },
  ratingButtonValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingThankYou: {
    textAlign: 'center',
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
});

export default RizzCard;
