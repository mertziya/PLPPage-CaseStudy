import React, {useState} from 'react';
import { View, Text, Image, StyleSheet , ActivityIndicator} from 'react-native';
import {Colors} from '../../constants/Colors';

export default function GridItem({ image, title, subtitle, price }) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.itemContainer}>
        <View style={styles.imageWrapper}>
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="small" color={Colors.light.logoColor} />
            </View>
          )}
          <Image
            source={{ uri: image }}
            style={styles.image}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)} // This guarantees it's loaded
            onError={() => setLoading(false)} // Also important to avoid stuck spinner
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
          <Text style={styles.price} numberOfLines={1} >{`${price} ₺`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 4,
    backgroundColor: '#fff',
    margin: 8,
  },
  itemContainer: {
    width: 160,
    height: 270,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  textContainer: {
    paddingTop: 8,
    paddingLeft: 4,
    alignItems: 'baseline',
  },
  title: {
    paddingBottom: 2,
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.light.textColor,
  },
  subtitle: {
    paddingBottom: 2,
    fontSize: 14,
    color: Colors.light.logoColor,
    fontWeight: '600', // 'semibold' is not valid, so using '600'
  },
  price: {
    paddingBottom: 2,
    paddingRight : 4,
    fontSize: 12,
    color: 'green',
    fontWeight: '500', // 'medium' is not valid, use numeric value
    alignSelf : 'flex-end'
  },
});