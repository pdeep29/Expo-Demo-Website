import { AppBarWithBackIcon } from "@/components/AppBarWithBackIcon";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
    useWindowDimensions,
} from "react-native";

export default function ProductsCategory() {
    const { width } = useWindowDimensions();
    const modalWidth = width > 600 ? 400 : "90%";
    const numColumns = width >= 1200 ? 6 : width >= 900 ? 5 : width >= 600 ? 3 : 2;
    const [selectedTab, setSelectedTab] = useState<'category' | 'subcategory'>('category');
    const [categories, setCategories] = useState([
        { id: 1, name: 'Electronics', createdAt: new Date(), updatedAt: new Date(), isDeleted: false, status: true },
        { id: 2, name: 'Fashion', createdAt: new Date(), updatedAt: new Date(), isDeleted: false, status: true },
    ]);
    const [subCategories, setSubCategories] = useState([
        { id: 101, name: 'Mobiles', categoryId: 1, status: true },
        { id: 102, name: 'Laptops', categoryId: 1, status: false },
        { id: 103, name: 'Men Clothing', categoryId: 2, status: true },
    ]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [categoryName, setCategoryName] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false);
    const [addSubCategoryModalVisible, setAddSubCategoryModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedFilterCategoryIds, setSelectedFilterCategoryIds] = useState<number[]>([]);


    const handleAddCategory = () => {
        if (!categoryName.trim()) return;
        const newCategory = {
            id: Date.now(),
            name: categoryName.trim(),
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            status: true, // <-- default enabled
        };
        setCategories([...categories, newCategory]);
        setCategoryName('');
        setAddCategoryModalVisible(false);
    };

    const handleAddSubCategory = () => {
        if (!subCategoryName.trim() || !selectedCategoryId) return;
        const newSubCategory = {
            id: Date.now(),
            name: subCategoryName.trim(),
            categoryId: selectedCategoryId,
            status: true, // <-- default enabled
        };
        setSubCategories([...subCategories, newSubCategory]);
        setSubCategoryName('');
        setSelectedCategoryId(null);
        setAddSubCategoryModalVisible(false);
    };
    const toggleCategoryStatus = (id: number) => {
        setCategories((prev) =>
            prev.map((cat) => cat.id === id ? { ...cat, status: !cat.status } : cat)
        );
    };

    const toggleSubCategoryStatus = (id: number) => {
        setSubCategories((prev) =>
            prev.map((sub) => sub.id === id ? { ...sub, status: !sub.status } : sub)
        );
    };

    const filteredSubCatData = selectedFilterCategoryIds.length > 0
        ? subCategories.filter((s) => selectedFilterCategoryIds.includes(s.categoryId))
        : subCategories



    return (
        <View style={styles.container}>
            <AppBarWithBackIcon
                title="Product Category"
                isAdd={true}
                onPressAdd={() => {
                    if (selectedTab === 'category') {
                        setAddCategoryModalVisible(true)
                    }
                    if (selectedTab === 'subcategory') {
                        setAddSubCategoryModalVisible(true)
                    }
                }}
            />

            {/* Tabs */}
            <View style={styles.tabRow}>
                <Pressable
                    style={[styles.tabBtn, selectedTab === 'category' && styles.activeTab]}
                    onPress={() => setSelectedTab('category')}
                >
                    <Text style={styles.tabText}>Categories</Text>
                </Pressable>
                <Pressable
                    style={[styles.tabBtn, selectedTab === 'subcategory' && styles.activeTab]}
                    onPress={() => setSelectedTab('subcategory')}
                >
                    <Text style={styles.tabText}>Subcategories</Text>
                </Pressable>
            </View>

            {selectedTab === 'category' ? (
                <>

                    <FlatList
                        key={`grid-${numColumns}`}
                        contentContainerStyle={styles.grid}
                        data={categories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {

                                }}
                                style={[styles.card, { width: (width * 0.9) / numColumns }]}
                            >
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.meta}>ID: {item.id}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, marginRight: 6 }}>Active</Text>
                                    <Switch
                                        value={item.status}
                                        onValueChange={() => toggleCategoryStatus(item.id)}
                                    />
                                </View>
                            </Pressable>
                        )}
                        numColumns={numColumns}
                    />
                </>
            ) : (
                <>
                    {selectedCategoryId && (
                        <Text style={styles.subTitle}>
                            Subcategories for: {
                                categories.find((c) => c.id === selectedCategoryId)?.name
                            }
                        </Text>
                    )}
                    <FlatList
                        key={`grid-${numColumns}`}
                        numColumns={numColumns}
                        contentContainerStyle={styles.grid}
                        data={filteredSubCatData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => { }}
                                style={[styles.card, { width: (width * 0.9) / numColumns }]}
                            >
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.meta}>ID: {item.id}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, marginRight: 6 }}>Active</Text>
                                    <Switch
                                        value={item.status}
                                        onValueChange={() => toggleSubCategoryStatus(item.id)}
                                    />
                                </View>
                            </Pressable>
                        )}
                        ListEmptyComponent={<Text style={{ textAlign: 'center', padding: 20 }}>No Subcategories</Text>}
                    />
                    <Pressable
                        onPress={() => setFilterModalVisible(true)}
                        style={{
                            position: 'absolute',
                            bottom: 20,
                            right: 20,
                            backgroundColor: '#2a2dc9ff',
                            padding: 14,
                            borderRadius: 30,
                            elevation: 5,
                        }}
                    >
                        {/* <Text style={{ color: '#fff', fontWeight: 'bold' }}>Filter</Text> */}
                        <Ionicons name="funnel-outline" size={24} color="#fff" />
                    </Pressable>
                </>
            )}

            {/* Add Category Modal */}
            <Modal transparent animationType="fade" visible={addCategoryModalVisible}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { width: modalWidth }]}>
                        <Text style={styles.modalTitle}>Add Category</Text>
                        <TextInput
                            placeholder="Enter category name"
                            style={styles.input}
                            value={categoryName}
                            onChangeText={setCategoryName}
                        />
                        <Pressable style={styles.addBtn} onPress={handleAddCategory}>
                            <Text style={styles.addBtnText}>Save</Text>
                        </Pressable>
                        <Pressable onPress={() => setAddCategoryModalVisible(false)}>
                            <Text style={{ textAlign: "center", color: "red" }}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Add Subcategory Modal */}
            <Modal transparent animationType="fade" visible={addSubCategoryModalVisible}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { width: modalWidth }]}>
                        <Text style={styles.modalTitle}>Add Subcategory</Text>
                        <TextInput
                            placeholder="Enter subcategory name"
                            style={styles.input}
                            value={subCategoryName}
                            onChangeText={setSubCategoryName}
                        />
                        <Text style={{ fontWeight: 'bold' }}>Select Category</Text>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => setSelectedCategoryId(item.id)}
                                    style={{
                                        padding: 8,
                                        backgroundColor: selectedCategoryId === item.id ? "#d1e7dd" : "#eee",
                                        borderRadius: 6,
                                        marginVertical: 4
                                    }}
                                >
                                    <Text>{item.name}</Text>
                                </Pressable>
                            )}
                        />
                        <Pressable style={styles.addBtn} onPress={handleAddSubCategory}>
                            <Text style={styles.addBtnText}>Save</Text>
                        </Pressable>
                        <Pressable onPress={() => setAddSubCategoryModalVisible(false)}>
                            <Text style={{ textAlign: "center", color: "red" }}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal transparent animationType="fade" visible={filterModalVisible}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { width: modalWidth }]}>
                        <Text style={styles.modalTitle}>Filter by Categories</Text>

                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                const isSelected = selectedFilterCategoryIds.includes(item.id);
                                return (
                                    <Pressable
                                        onPress={() => {
                                            setSelectedFilterCategoryIds((prev) =>
                                                isSelected
                                                    ? prev.filter((id) => id !== item.id)
                                                    : [...prev, item.id]
                                            );
                                        }}
                                        style={{
                                            padding: 10,
                                            marginVertical: 4,
                                            borderRadius: 6,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            borderWidth: 1,
                                            borderColor: isSelected ? '#007bff' : '#ccc',
                                        }}
                                    >
                                        <Text>{item.name}</Text>
                                        <Ionicons
                                            name={isSelected ? 'checkbox-outline' : 'square-outline'}
                                            size={22}
                                            color={isSelected ? '#007bff' : '#555'}
                                        />
                                    </Pressable>
                                );
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <Pressable onPress={() => {

                                setSelectedFilterCategoryIds([]); // clear old single filter
                                setFilterModalVisible(false);
                            }} style={{
                                width: '45%',
                                backgroundColor: "#1e293b",
                                borderRadius: 5,
                                alignItems: 'center',
                                paddingVertical: 6
                            }}>
                                <Text style={{ fontSize: 18, color: 'white' }}>Clear</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                setFilterModalVisible(false);
                            }} style={{
                                width: '45%',
                                backgroundColor: "#0c970cff",
                                borderRadius: 5,
                                alignItems: 'center',
                                paddingVertical: 6
                            }}>
                                <Text style={{ fontSize: 18, color: 'white' }}>Save</Text>
                            </Pressable>

                            {/* <Button title="Save" onPress={handleSave} style={{ width: '40%' }} />
                                                   <Button title="Cancel" onPress={() => closeModalResetData()} /> */}
                        </View>
                        <Pressable onPress={() => setFilterModalVisible(false)} style={{
                            width: '100%',
                            borderColor: "#e72c0bff",
                            borderWidth: 1,
                            borderRadius: 5,
                            alignItems: 'center',
                            paddingVertical: 6
                        }}>
                            <Text style={{ textAlign: 'center', color: "#e72c0bff", }}>Cancel</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    tabRow: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    tabBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center'
    },
    activeTab: {
        borderBottomWidth: 3,
        borderColor: '#007bff'
    },
    tabText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    subTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10
    },
    grid: { padding: 10, justifyContent: "center" },
    card: {
        backgroundColor: "#f8f8f8",
        padding: 12,
        margin: 8,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#ccc",
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    meta: {
        fontSize: 12,
        color: "#555",
    },
    addBtn: {
        backgroundColor: "#007bff",
        marginHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    addBtnText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        gap: 10,
        alignSelf: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginBottom: 10,
        ...(Platform.OS === 'web' && { outlineStyle: 'none' as any }),
    },
});
