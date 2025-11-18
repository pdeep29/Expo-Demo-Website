import { Ionicons, } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useEffect } from "react"
import { BackHandler, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native"

export const AppBarWithBackIcon = ({ title, isAdd = false, onPressAdd, customIconName }: { title: string, isAdd?: boolean, onPressAdd?: () => void, customIconName?: any }) => {
    const router = useRouter()
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const handlePopStateRoute = () => {
        if (Platform.OS === "web") {
            window.location.replace("/admin/dashboard");

            // After redirect, block back navigation
            setTimeout(() => {
                window.history.replaceState(null, "", "/admin/dashboard");
                window.onpopstate = () => {
                    window.history.go(1); // Prevent back
                };
            }, 100);
        } else {
            router.replace("/admin/dashboard");
        }
    }
    useEffect(() => {


        if (Platform.OS === "web") {
            // Push dummy state to block back



            const handlePopState = () => {

                handlePopStateRoute();

            };

            window.onpopstate = handlePopState;

            // Handle refresh
            const handleBeforeUnload = () => {
                handlePopStateRoute();
            };

            window.addEventListener("beforeunload", handleBeforeUnload);

            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
                window.onpopstate = null;
            };
        } else {
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    handlePopStateRoute();
                    return true;
                }
            );

            return () => backHandler.remove();
        }
    }, []);
    return (<View style={styles.appBar}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 90 / 100, marginVertical: screenWidth * 2 / 100, }}>
            <View style={{ width: screenWidth * 88 / 100, flexDirection: 'row', }}>
                <Pressable onPress={() => {
                    console.log('pressed back')
                    // router.replace("/admin/dashboard");
                    handlePopStateRoute()
                }}>
                    <Ionicons name="arrow-back-outline" size={24} color="#fff" />
                </Pressable>
                <Text style={styles.appBarTitle}>{title}</Text>
            </View>
            <View style={{ width: screenWidth * 10 / 100, alignItems: 'flex-end', }}>
                {isAdd && <Pressable onPress={onPressAdd} style={{ width: 30, marginRight: 10, }}>
                    <Ionicons name={customIconName ? customIconName : "add-circle"} size={26} color="#fff" />
                </Pressable>}

            </View>
        </View>


    </View>)
}
const styles = StyleSheet.create({
    appBar: {
        height: 56,
        backgroundColor: "#1e293b",
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",

        elevation: 4,
    },
    appBarTitle: {
        fontSize: 20,
        marginLeft: 5,
        color: "#fff",
        fontWeight: "bold",
    },
})