import { AppBarWithBackIcon } from "@/components/AppBarWithBackIcon";
import React from "react";
import { Button, Platform, TextInput, View } from "react-native";

export default function AddService() {
    return (
        <View style={{ flex: 1, }}>
            <AppBarWithBackIcon title={'Add New Service'} />


            <TextInput placeholder="Product Name" style={{ borderWidth: 1, marginVertical: 8, ...(Platform.OS === 'web' && { outlineStyle: 'none' as any }), }} />
            <TextInput placeholder="Details" style={{ borderWidth: 1, marginVertical: 8, ...(Platform.OS === 'web' && { outlineStyle: 'none' as any }), }} multiline />
            <TextInput placeholder="Contact Info" style={{ borderWidth: 1, marginVertical: 8, ...(Platform.OS === 'web' && { outlineStyle: 'none' as any }), }} />
            <Button title="Upload Image" onPress={() => { }} />
            <Button title="Select Category" onPress={() => { }} />
            <Button title="Save Product" onPress={() => { }} />
        </View>
    );
}