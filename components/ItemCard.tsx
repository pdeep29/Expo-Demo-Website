import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface Props {
    title: string;
    category: string;
    image: string;
    style?: ViewStyle;
}

export const ItemCard = ({ title, category, image, style }: Props) => (
    <View style={[styles.card, style]} testID="item-card-root" >
        <Image source={image} style={styles.image} contentFit="cover" testID="item-card-image" />
        <Text style={styles.title} testID="item-card-title">{title}</Text>
        <Text style={styles.category} testID="item-card-category">{category}</Text>
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
    },
    category: {
        color: '#6b7280',
        fontSize: 13,
    },
});
