import React from 'react';
import { View, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function TabBarBackground() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black', // <- now it's #ffffff
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
          },
          android: {
            elevation: 2,
          },
        }),
      }}
    />
  );
}