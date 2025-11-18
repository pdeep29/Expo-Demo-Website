import { ServiceFilterModal } from '@/components/ServiceFilterModal';
import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { ItemCard } from '../components/ItemCard';

const productsArray = Array.from({ length: 10 }, (_, i) => ({
  id: `${i}`,
  title: `Product ${i + 1}`,
  category: 'Product',
  brand: i % 2 === 0 ? '1-1' : '2-2',
  image: `https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=600`,
}));

const productBrands = [
  {
    id: '1',
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
    subServices: [
      {
        id: '1-1',
        name: 'Mobiles',
        image: 'https://images.pexels.com/photos/6078127/pexels-photo-6078127.jpeg',
      },
      {
        id: '1-2',
        name: 'Laptops',
        image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      },
    ],
  },
  {
    id: '2',
    name: 'Appliances',
    image: 'https://images.pexels.com/photos/373548/pexels-photo-373548.jpeg',
    subServices: [
      {
        id: '2-1',
        name: 'Refrigerators',
        image: 'https://images.pexels.com/photos/373548/pexels-photo-373548.jpeg',
      },
      {
        id: '2-2',
        name: 'Washing Machines',
        image: 'https://images.pexels.com/photos/3960106/pexels-photo-3960106.jpeg',
      },
    ],
  },
];

const Products = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const numColumns = width > 1024 ? 5 : isTablet ? 3 : 2;
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedSubBrands, setSelectedSubBrands] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(productsArray);

  const handleToggleSubBrand = (id: string) => {
    setSelectedSubBrands(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleApplyFilter = () => {
    if (selectedSubBrands.length === 0) {
      setFilteredProducts(productsArray);
    } else {
      const filtered = productsArray.filter(product =>
        selectedSubBrands.includes(product.brand)
      );
      setFilteredProducts(filtered);
    }
    setFilterVisible(false);
  };

  const handleClearFilter = () => {
    setSelectedSubBrands([]);
    setFilteredProducts(productsArray);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        key={`grid-${numColumns}`}
        data={filteredProducts}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <ItemCard
            title={item.title}
            category={item.category}
            image={item.image}
            style={{
              width: (width - 32 - 12 * (numColumns - 1)) / numColumns,
            }}
          />
        )}
      />

      <ServiceFilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        // serviceTypes={productBrands}
        selectedSubServices={selectedSubBrands}
        onToggleSubService={handleToggleSubBrand}
        onApply={handleApplyFilter}
        onClear={handleClearFilter}
        serviceTypes={productBrands}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: Platform.OS === 'web' ? 32 : 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  filterButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  filterText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Products;
