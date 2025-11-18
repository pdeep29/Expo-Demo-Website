import { AppBarWithBackIcon } from "@/components/AppBarWithBackIcon";
import React, { useState } from "react";
import {
    StyleSheet,
    useWindowDimensions,
    View
} from "react-native";



export default function AddProductsScreen() {
    const { width } = useWindowDimensions();
    const modalWidth = width > 600 ? 500 : "90%";
    const calculateNumColumns = (screenWidth: number) => {
        if (screenWidth >= 1200) return 6;
        if (screenWidth >= 900) return 5;
        if (screenWidth >= 600) return 3;
        return 2;
    };

    const numColumns = calculateNumColumns(width);
    const [products, setProducts] = useState([]);

    const itemWidth = (width * 90 / 100) / numColumns;




    return (
        <View style={styles.container}>

            <AppBarWithBackIcon title={' Add Products'} isAdd={true} onPressAdd={() => { }} />





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
    },
});
