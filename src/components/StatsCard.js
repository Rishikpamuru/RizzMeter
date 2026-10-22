import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

const StatsCard = ({ title, value, subtitle, icon, color = theme.colors.primary }) => {
  return (
    <Card style={[styles.card, { borderTopColor: color }]}>
      <Card.Content style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.valueContainer}>
            <Text style={[styles.value, { color }]}>{value}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    elevation: 4,
    borderTopWidth: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    color: theme.colors.placeholder,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 4,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
});

export default StatsCard;
