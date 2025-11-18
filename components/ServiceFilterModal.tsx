import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';

interface SubService {
    id: string;
    name: string;
    image: string;
}

interface ServiceType {
    id: string;
    name: string;
    image: string;
    subServices: SubService[];
}

interface Props {
    visible: boolean;
    onClose: () => void;
    serviceTypes: ServiceType[];
    selectedSubServices: string[];
    onToggleSubService: (id: string) => void;
    onApply: () => void;
    onClear: () => void;
}

export const ServiceFilterModal = ({
    visible,
    onClose,
    serviceTypes,
    selectedSubServices,
    onToggleSubService,
    onClear, onApply
}: Props) => {
    const [selectedTypeId, setSelectedTypeId] = useState(serviceTypes[0]?.id || '');
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;
    const isWide = width >= 1024;

    const selectedType = serviceTypes.find(t => t.id === selectedTypeId);


    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.backdrop}>
                <View style={[styles.modalContainer, { width: isWide ? 800 : '90%' }]}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Filter Services</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        {/* Left: Service Types */}
                        <ScrollView style={styles.typeList}>
                            {serviceTypes.map(type => (
                                <TouchableOpacity
                                    key={type.id}
                                    style={[
                                        styles.typeItem,
                                        type.id === selectedTypeId && styles.typeItemSelected,
                                    ]}
                                    onPress={() => setSelectedTypeId(type.id)}
                                >
                                    <Text
                                        style={[
                                            styles.typeText,
                                            type.id === selectedTypeId && styles.typeTextSelected,
                                        ]}
                                    >
                                        {type.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View style={styles.divider} />

                        {/* Right: Sub Services */}
                        <ScrollView style={styles.subTypeList}>
                            {selectedType?.subServices?.map(sub => {
                                const isSelected = selectedSubServices.includes(sub.id);
                                return (
                                    <TouchableOpacity
                                        key={sub.id}
                                        style={[styles.subItem, isSelected && styles.subItemSelected]}
                                        onPress={() => onToggleSubService(sub.id)}
                                    >
                                        <Text style={[styles.subText, isSelected && styles.subTextSelected]}>
                                            {sub.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
                            <Text style={styles.clearText}>Clear All</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onApply} style={styles.applyButton}>
                            <Text style={styles.applyText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: '#0006',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        padding: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    },
    closeText: {
        fontSize: 22,
        fontWeight: '700',
    },
    content: {
        flexDirection: 'row',
        height: 400,
    },
    typeList: {
        width: 5,
    },
    typeItem: {
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    typeItemSelected: {
        backgroundColor: '#e0e7ff',
    },
    typeText: {
        fontSize: 16,
    },
    typeTextSelected: {
        fontWeight: '700',
        color: '#2563eb',
    },
    divider: {
        width: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 8,
    },
    subTypeList: {
        flex: 1,
    },
    subItem: {
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    subItemSelected: {
        backgroundColor: '#dbeafe',
    },
    subText: {
        fontSize: 16,
    },
    subTextSelected: {
        fontWeight: '700',
        color: '#1d4ed8',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    applyButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    applyText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    clearButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderColor: '#999',
        borderWidth: 1,
    },
    clearText: {
        fontWeight: '600',
        fontSize: 16,
        color: '#444',
    },

});
