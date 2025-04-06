import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { transparentize } from 'polished';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Ürün, Renk ve ya kategori arayın',
}: Props) => {
  return (
    <View style={styles.outerWrapper}>
      <View style={styles.inputWrapper}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.light.logoColor}
          style={styles.icon}
        />

        <TextInput
          style={styles.searchBar}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={transparentize(0.5, Colors.light.logoColor)}
        />

        {value.length > 0 && (
          <Pressable onPress={() => onChangeText('')}>
            <Ionicons
              name="close"
              size={20}
              color={Colors.light.logoColor}
              style={styles.icon}
            />
          </Pressable>
        )}
      </View>

      {/* Filter Icon */}
      <Pressable style={styles.filterIconWrapper} onPress={() => console.log("filter clicked")}>
        <Ionicons
          name="filter"
          size={24}
          color={Colors.light.logoColor}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop : 0,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: transparentize(0, Colors.light.primaryBackground),
    borderWidth: 1,
    borderColor: Colors.light.logoColor,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  icon: {
    paddingHorizontal: 4,
  },
  outerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
  },
  filterIconWrapper: {
    marginLeft: 8,
    backgroundColor: transparentize(0.1, Colors.light.primaryBackground),
    padding: 8,
  },
});

export default SearchBar;