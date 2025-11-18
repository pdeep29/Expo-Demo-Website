import { AppBarWithBackIcon } from "@/components/AppBarWithBackIcon";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import {
    Button,
    FlatList,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View
} from "react-native";
const dummyProducts = [
    {
        id: "1",
        title: "Product A",
        description: "Description for Product A",
        image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
        category: "Category 1",
        subCategory: "Subcategory 1",
    },
    {
        id: "2",
        title: "Product A",
        description: "Description for Product A",
        image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
        category: "Category 1",
        subCategory: "Subcategory 1",
    },
    {
        id: "3",
        title: "Product A",
        description: "Description for Product A",
        image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
        category: "Category 1",
        subCategory: "Subcategory 1",
    },
    {
        id: "4",
        title: "Product A",
        description: "Description for Product A",
        image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
        category: "Category 1",
        subCategory: "Subcategory 1",
    },
    {
        id: "5",
        title: "Product A",
        description: "Description for Product A",
        image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
        category: "Category 1",
        subCategory: "Subcategory 1",
    },
    {
        id: "6",
        title: "Product A",
        description: "Description for Product A",
        image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
        category: "Category 1",
        subCategory: "Subcategory 1",
    },
    // Add more dummy products
];




export default function ProductsScreen() {
    const { width } = useWindowDimensions();
    const modalWidth = width > 600 ? 500 : "90%";
    const calculateNumColumns = (screenWidth: number) => {
        if (screenWidth >= 1200) return 6;
        if (screenWidth >= 900) return 5;
        if (screenWidth >= 600) return 3;
        return 2;
    };

    const numColumns = calculateNumColumns(width);
    const [products, setProducts] = useState(dummyProducts);
    const [selectedProduct, setSelectedProduct] = useState<{
        title: "",
        description: string,
        image: string,
        category: string,
        subCategory: string
    } | null>(null);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        image: "",
        category: "",
        subCategory: "",
    });
    const [confirmVisible, setConfirmVisible] = useState(false);




    const cancelDelete = () => {
        setConfirmVisible(false);
    };
    const handleDelete = (id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
        setConfirmVisible(true);
    };

    const openViewModal = (product: any) => {
        setSelectedProduct(product);
        setViewModalVisible(true);
    };

    const openEditModal = (product: any = null) => {
        if (product) {
            setFormData(product);
        } else {
            // setFormData({
            //     id: Date.now().toString(),
            //     title: "",
            //     description: "",
            //     image: `https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg`,
            //     category: "",
            //     subCategory: "",
            // });
        }
        setEditModalVisible(true);
    };

    const itemWidth = (width * 90 / 100) / numColumns;

    const handleSave = () => {
        setProducts(prev => {
            const exists = prev.find(p => p.id === formData.id);
            if (exists) {
                return prev.map(p => (p.id === formData.id ? formData : p));
            } else {
                return [...prev, formData];
            }
        });
        closeModalResetData()

    };
    const closeModalResetData = () => {
        setEditModalVisible(false);
        setFormData({
            id: "",
            title: "",
            description: "",
            image: "",
            category: "",
            subCategory: "",
        })
    }
    const renderProduct = ({ item }: any) => {

        return (
            <View
                style={[
                    styles.card,
                    {
                        width: itemWidth,
                        // height: itemWidth + 80,
                        borderRadius: 12,
                        overflow: 'hidden',
                        backgroundColor: '#ffffffff',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        margin: 8,
                        alignItems: 'center',

                    },
                ]}
            >
                <Image
                    source={item.image}
                    style={{
                        height: itemWidth,
                        width: itemWidth,
                        borderRadius: 10

                    }}
                    contentFit="cover"
                />

                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginTop: 8,
                        textAlign: 'center',
                    }}
                    numberOfLines={1}
                >
                    {item.title}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        width: '100%',
                        paddingVertical: 8,
                        borderTopWidth: 1,
                        borderTopColor: '#eee',
                        // marginTop: 8,
                    }}
                >
                    <Pressable onPress={() => openViewModal(item)} style={{ padding: 6, backgroundColor: "#1e293b", borderRadius: 5 }}>
                        <Ionicons name="eye-outline" size={22} color="#fff" />
                    </Pressable>
                    <Pressable onPress={() => openEditModal(item)} style={{ padding: 6, backgroundColor: "#0c970cff", borderRadius: 5 }}>
                        <MaterialCommunityIcons name="pencil-outline" size={22} color="#fff" />
                    </Pressable>
                    <Pressable onPress={() => {
                        setConfirmVisible(true);
                        // if (Platform.OS === 'web') {
                        //     const confirmed = window.confirm('Are you sure you want to delete Product');
                        //     if (confirmed) {
                        //         handleDelete(item.id)
                        //     } else {
                        //         console.log('Deletion cancelled');
                        //     }
                        // } else {
                        //     Alert.alert('Alert', 'Are you sure you want to delete Product', [{
                        //         text: "No",
                        //         onPress: () => console.log("Cancel Pressed"),
                        //         style: "cancel"
                        //     },
                        //     {
                        //         text: "Yes", onPress: () => {
                        //             handleDelete(item.id)
                        //         }
                        //     }
                        //     ],
                        //         { cancelable: true })

                        // }


                    }} style={{ padding: 6, backgroundColor: "#d00", borderRadius: 5 }}>
                        <MaterialCommunityIcons name="delete-outline" size={22} color="#fff" />
                    </Pressable>
                </View>
                <ConfirmDialog
                    visible={confirmVisible}
                    message="Are you sure you want to delete Product?"
                    onCancel={cancelDelete}
                    onConfirm={() => {
                        handleDelete(item.id)
                        setConfirmVisible(false);
                    }}
                />
            </View>
        );
    };


    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setFormData(prev => ({
                ...prev,
                image: result.assets[0].uri,
            }));
        }
    };
    return (
        <View style={styles.container}>

            <AppBarWithBackIcon title={' Products'} isAdd={true} onPressAdd={() => { openEditModal() }} />

            {/* <Button title="Add Product" onPress={() => openEditModal()} /> */}
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={renderProduct}
                numColumns={numColumns}
                contentContainerStyle={styles.grid}
                key={`grid-${numColumns}`}
            />

            {/* View Modal */}
            <Modal visible={viewModalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { width: modalWidth }]}>
                        <Text style={styles.modalTitle}>{selectedProduct && selectedProduct?.title}</Text>
                        <Image source={{ uri: selectedProduct?.image }} style={styles.image} />
                        <Text>{selectedProduct && selectedProduct?.description}</Text>
                        <Text>Category: {selectedProduct && selectedProduct?.category}</Text>
                        <Text>SubCategory: {selectedProduct && selectedProduct?.subCategory}</Text>
                        <Button title="Close" onPress={() => {

                            setViewModalVisible(false)
                            setSelectedProduct(null)
                        }} />
                    </View>
                </View>
            </Modal>

            {/* Add/Edit Modal */}
            <Modal visible={editModalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { width: modalWidth }]}>
                        <Text style={styles.modalTitle}>
                            {formData?.id && products.find(p => p.id === formData.id) ? "Edit" : "Add"} Product
                        </Text>
                        <TextInput
                            placeholder="Title"
                            style={styles.input}
                            value={formData.title}
                            onChangeText={t => setFormData(prev => ({ ...prev, title: t }))}
                        />
                        <TextInput
                            placeholder="Description"
                            style={[styles.input, { height: 80 }]}
                            multiline
                            value={formData.description}
                            onChangeText={t => setFormData(prev => ({ ...prev, description: t }))}
                        />
                        <TextInput
                            placeholder="Category"
                            style={styles.input}
                            value={formData.category}
                            onChangeText={t => setFormData(prev => ({ ...prev, category: t }))}
                        />
                        <TextInput
                            placeholder="Sub Category"
                            style={styles.input}
                            value={formData.subCategory}
                            onChangeText={t => setFormData(prev => ({ ...prev, subCategory: t }))}
                        />
                        {/* Image Picker placeholder */}
                        <Button title="Pick Image" onPress={pickImage} />

                        {formData.image != '' && <Image source={formData.image}
                            style={[styles.image, { width: itemWidth / 2, height: itemWidth / 2 }]}
                            contentFit="cover" />}
                        {/* <Image source={{ uri: formData.image }} style={styles.image} /> */}
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <Pressable onPress={() => closeModalResetData()} style={{
                                width: '45%',
                                backgroundColor: "#1e293b",
                                borderRadius: 5,
                                alignItems: 'center',
                                paddingVertical: 6
                            }}>
                                <Text style={{ fontSize: 18, color: 'white' }}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={() => handleSave()} style={{
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
                    </View>
                </View>
            </Modal >

        </View >
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    grid: { paddingVertical: 10 },
    card: {

        margin: 10,
        borderRadius: 10,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: '#a39f9fff',
        elevation: 10,
        boxShadow: '#a39f9fff',
        shadowColor: '#a39f9fff'
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    actions: {
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    action: {
        fontSize: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
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
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
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
