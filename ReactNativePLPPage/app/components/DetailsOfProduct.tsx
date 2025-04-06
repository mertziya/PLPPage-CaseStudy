import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { CapsuleInfo } from './CapsuleInfo';
import { Colors } from '@/constants/Colors';

type ProductDetailsProps = {
  name: string;
  price: number;
  quantityDetail: string;
  item_quantity: number;
  vendorName?: string;
  product_code?: string;
  details?: {
    fabric?: string;
    model_measurements?: string;
    product_measurements?: string;
    sample_size?: string;
  };
};

const DetailsOfProduct: React.FC<ProductDetailsProps> = ({
  name,
  price,
  quantityDetail,
  item_quantity,
  vendorName,
  product_code,
  details = {},
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.container}>
      {/* Row 1: Name and Price */}
      <View style={styles.firstRow}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}₺</Text>
      </View>

      {/* Row 2: Quantity Detail and Item Quantity */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        style={{ marginBottom: 16 }}
      >
        <CapsuleInfo
          iconName="cube-outline"
          text={`${item_quantity} items left`}
          textColor="#fff"
          backgroundColor={Colors.light.tintColor}
        />
        <CapsuleInfo
          iconName="information-outline"
          text={quantityDetail}
          textColor="#fff"
          backgroundColor={Colors.light.tintColor}
        />
      </ScrollView>

      {/* Row 3: Vendor Name */}
      {vendorName && (
        <View style={styles.row}>
          <CapsuleInfo
            iconName="shopping-outline"
            text={vendorName}
            textColor= {Colors.light.tintColor}
            backgroundColor= "#fff"
          />
        </View>
      )}

      {/* Row 4: Product Code */}
      {product_code && (
        <View style={styles.row}>
          <CapsuleInfo
            iconName="barcode"
            text={`SKU: ${product_code}`}
            textColor= {Colors.light.tintColor}
            backgroundColor= "#fff"
          />
        </View>
      )}

      {/* Collapsible Details Section */}
      <Collapsible title="Details">
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>
            <Text style={styles.boldLabel}>• Fabric: </Text>
            <Text style={styles.lightText}>{details.fabric || 'N/A'}</Text>
          </Text>
          <Text style={styles.bulletItem}>
            <Text style={styles.boldLabel}>• Model Measurements: </Text>
            <Text style={styles.lightText}>{details.model_measurements || 'N/A'}</Text>
          </Text>
          <Text style={styles.bulletItem}>
            <Text style={styles.boldLabel}>• Product Measurements: </Text>
            <Text style={styles.lightText}>{details.product_measurements || 'N/A'}</Text>
          </Text>
          <Text style={styles.bulletItem}>
            <Text style={styles.boldLabel}>• Sample Size: </Text>
            <Text style={styles.lightText}>{details.sample_size || 'N/A'}</Text>
          </Text>
        </View>
      </Collapsible>

    </View>
  );
};

export default DetailsOfProduct;

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
  },
  value: {
    marginRight: 12,
  },
  toggle: {
    marginTop: 8,
    color: '#007AFF',
    fontWeight: '500',
  },
  detailsBox: {
    marginTop: 10,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
  },
  detailItem: {
    marginBottom: 4,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // optional, for vertical alignment
    marginBottom : 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '400',

  },
  price: {
    fontSize: 20,
    fontWeight: '400',
    color: 'green'
  },
  bulletList: {
    paddingLeft: 0,
    marginBottom: 4,
  },
  bulletItem: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  boldLabel: {
    fontWeight: 'bold',
  },
  lightText: {
    fontWeight: '300', // You can also use 'normal' or customize the fontFamily
  },
});