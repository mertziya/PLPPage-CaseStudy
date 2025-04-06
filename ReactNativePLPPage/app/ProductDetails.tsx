import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import ProductImagesCarousel from './components/ProductImagesCarousel';
import DetailsOfProduct from './components/DetailsOfProduct';
import useProduct from './customHooks/UseProduct';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, } from 'react-native';

const ProductDetails = () => {
  const { id } = useLocalSearchParams(); // id from router
  const { product: fetchedProduct, loading, error } = useProduct(id as string);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitle: `${fetchedProduct?.names?.en ?? ''}`,
      headerTransparent: true,
      headerShadowVisible: true,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 0 }}>
          <Ionicons name="chevron-back" size={32} color={Colors.light.icon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, fetchedProduct]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.light.logoColor} />
      </SafeAreaView>
    );
  }

  if (error || !fetchedProduct) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Failed to load product details.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductImagesCarousel images={fetchedProduct.images ?? []} />

        <View
          style={{
            height: 1,
            backgroundColor: Colors.light.logoColor,
            marginVertical: 16,
            marginHorizontal: 16,
          }}
        />

        <DetailsOfProduct
          name={fetchedProduct.names?.en ?? ''}
          price={fetchedProduct.price ?? 0}
          quantityDetail={fetchedProduct.series?.name ?? ''}
          item_quantity={fetchedProduct.series?.item_quantity ?? 0}
          vendorName={fetchedProduct.vendor?.name ?? ''}
          product_code={fetchedProduct.product_code ?? ''}
          details={{
            fabric: fetchedProduct.description_details?.en?.fabric ?? '',
            model_measurements: fetchedProduct.description_details?.en?.model_measurements ?? '',
            product_measurements: fetchedProduct.description_details?.en?.product_measurements ?? '',
            sample_size: fetchedProduct.description_details?.en?.sample_size ?? '',
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;