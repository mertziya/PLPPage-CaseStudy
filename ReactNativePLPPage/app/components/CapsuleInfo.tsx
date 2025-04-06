import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type CapsuleInfoProps = {
    iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    text: string;
    textColor?: string;
    backgroundColor?: string;
};

export const CapsuleInfo: React.FC<CapsuleInfoProps> = ({
  iconName,
  text,
  textColor = '#000',
  backgroundColor = '#eee',
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
        <MaterialCommunityIcons name={iconName} size={18} color={textColor} />
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.light.tintColor
  },
  text: {
    marginLeft: 6,
    fontSize: 18,
    fontWeight: '500',
  },
});