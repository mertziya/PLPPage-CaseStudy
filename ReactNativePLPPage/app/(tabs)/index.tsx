import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform, View, FlatList, Dimensions, ActivityIndicator, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import SearchBar from '../components/SearchBar';
import { Colors } from '../../constants/Colors';
import GridItem from '../components/GridItem';
import { useProducts } from '../customHooks/UseProducts';

import { useRouter } from 'expo-router';

const ITEM_WIDTH = 160;
const ITEM_MARGIN = 16;

export default function HomeScreen() {
  const { products, loading, error, fetchMore, isFetchingMore } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [numColumns, setNumColumns] = useState(2);

  const router = useRouter();
  

  useEffect(() => {
    const updateColumns = () => {
      const screenWidth = Dimensions.get('window').width;
      const totalItemWidth = ITEM_WIDTH + ITEM_MARGIN * 2;
      const columns = Math.floor(screenWidth / totalItemWidth);
      setNumColumns(columns > 1 ? columns : 1);
    };

    updateColumns();

    const subscription = Dimensions.addEventListener('change', updateColumns);
    return () => subscription.remove();
  }, []);

  

  const handleItemPress = (item : Product) => {
    router.push({
      pathname: '/ProductDetails',
      params: {id: item.id}
    });
  }

  if (loading) return <ActivityIndicator/>;
  if (error) return <Text>{error}</Text>;
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList<Product>
        data={products}
        keyExtractor={(item) => item.id ?? ''}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <GridItem
              image={item.main_image}
              title={item.names?.en ?? 'No Title'}
              subtitle={item.vendor?.name ?? 'No Vendor'}
              price={item.price ?? 0}
            />
          </TouchableOpacity>
        )}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 && styles.columnWrapper}
        style={{ backgroundColor: Colors.light.primaryBackground }} // ✅ Add this

        contentContainerStyle={[styles.grid]}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null
        }
      />
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    backgroundColor: Colors.light.primaryBackground,
  },
  grid: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingBottom: 40
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export const options = {
  headerShown: false,
};