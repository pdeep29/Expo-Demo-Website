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

const servicesArray = Array.from({ length: 10 }, (_, i) => ({
  id: `${i}`,
  title: `Service ${i + 1}`,
  category: 'Service',
  subServiceId: i % 2 === 0 ? '1-1' : '2-2', // example: alternate subServiceIds
  image: `https://images.pexels.com/photos/${1000050 + i}/pexels-photo-${1000050 + i}.jpeg?auto=compress&cs=tinysrgb&w=600`,
}));


const serviceTypes = [
  {
    id: '1',
    name: 'Home Services',
    image: 'https://images.pexels.com/photos/3768913/pexels-photo-3768913.jpeg',
    subServices: [
      {
        id: '1-1',
        name: 'Plumbing',
        image: 'https://images.pexels.com/photos/7394488/pexels-photo-7394488.jpeg',
      },
      {
        id: '1-2',
        name: 'Electrician',
        image: 'https://images.pexels.com/photos/4254164/pexels-photo-4254164.jpeg',
      },
    ],
  },
  {
    id: '2',
    name: 'Auto Services',
    image: 'https://images.pexels.com/photos/3806287/pexels-photo-3806287.jpeg',
    subServices: [
      {
        id: '2-1',
        name: 'Car Wash',
        image: 'https://images.pexels.com/photos/8985615/pexels-photo-8985615.jpeg',
      },
      {
        id: '2-2',
        name: 'Car Repair',
        image: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg',
      },
    ],
  },
];
const services = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const numColumns = width > 1024 ? 6 : isTablet ? 3 : 2;
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedSubServices, setSelectedSubServices] = useState<string[]>([]);
  const [filteredServices, setFilteredServices] = useState(servicesArray);

  const handleToggleSubService = (id: string) => {
    setSelectedSubServices(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleApplyFilter = () => {
    if (selectedSubServices.length === 0) {
      setFilteredServices(servicesArray);
    } else {
      const filtered = servicesArray.filter(service =>
        selectedSubServices.includes(service.subServiceId)
      );
      setFilteredServices(filtered);
    }
    setFilterVisible(false);
  };

  const handleClearFilter = () => {
    setSelectedSubServices([]);
    setFilteredServices(servicesArray);
  };

  const displayedServices = filteredServices;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>services</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        key={`grid-${numColumns}`} // 👈 Add key to force re-render on column change
        data={displayedServices}
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
        serviceTypes={serviceTypes}
        selectedSubServices={selectedSubServices}
        onToggleSubService={handleToggleSubService} onApply={handleApplyFilter}
        onClear={handleClearFilter} />
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

export default services;
