import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const IMAGE_ASPECT_RATIO = 520 / 400; // height / width

type Props = {
  images: string[];
};

const ProductImagesCarousel: React.FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainImageLoading, setMainImageLoading] = useState<number[]>(images.map(() => 1));
  const [thumbLoading, setThumbLoading] = useState<number[]>(images.map(() => 1));
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleMainImageLoad = (index: number) => {
    setMainImageLoading((prev) => {
      const updated = [...prev];
      updated[index] = 0;
      return updated;
    });
  };

  const handleThumbLoad = (index: number) => {
    setThumbLoading((prev) => {
      const updated = [...prev];
      updated[index] = 0;
      return updated;
    });
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}-${index}`}
        onScroll={handleScroll}
        renderItem={({ item, index }) => (
          <View style={styles.imageWrapper}>
            {mainImageLoading[index] ? (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#aaa" />
              </View>
            ) : null}
            <Image
              source={{ uri: item }}
              style={styles.mainImage}
              resizeMode="cover"
              onLoadEnd={() => handleMainImageLoad(index)}
            />
            {index === activeIndex && (
              <View style={styles.counterContainer}>
                <Text style={styles.counterText}>
                  {activeIndex + 1} / {images.length}
                </Text>
              </View>
            )}
          </View>
        )}
      />

      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.thumbnailContainer}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => {
          const isActive = index === activeIndex;
          return (
            <TouchableOpacity onPress={() => scrollToIndex(index)} activeOpacity={0.8}>
              <View>
                {thumbLoading[index] ? (
                  <View style={styles.thumbLoader}>
                    <ActivityIndicator size="small" color="#999" />
                  </View>
                ) : null}
                <Image
                  source={{ uri: item }}
                  style={[
                    styles.thumbnail,
                    {
                      opacity: isActive ? 1 : 0.5,
                      transform: isActive ? [{ translateY: -4 }] : [{ translateY: 0 }],
                    },
                  ]}
                  onLoadEnd={() => handleThumbLoad(index)}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainImage: {
    width: screenWidth,
    height: screenWidth * IMAGE_ASPECT_RATIO,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  imageWrapper: {
    width: screenWidth,
    height: screenWidth * IMAGE_ASPECT_RATIO,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loader: {
    width: screenWidth,
    height: screenWidth * IMAGE_ASPECT_RATIO,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  counterContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  counterText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  thumbnailContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    gap: 8,
  },
  thumbnail: {
    width: 50,
    height: 65,
    borderRadius: 4,
    marginRight: 4,
  },
  thumbLoader: {
    position: 'absolute',
    width: 50,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 4,
    zIndex: 1,
  },
});

export default ProductImagesCarousel;