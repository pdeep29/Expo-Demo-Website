import React from "react";
import {
    ImageBackground,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

import { useAppbarHeight } from "./context/AppbarHeightContext";

const imageUri = `https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg`;
interface props {
    onPressLeft: () => void,
    onPressRight: () => void,
}
export const HeroSection = ({ onPressLeft, onPressRight }: props) => {
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const { height: appbarHeight } = useAppbarHeight();
    const isWeb = Platform.OS === "web";

    const isMobile = screenWidth < 768;

    const sharedContentStyle: any = {
        width: isMobile ? "100%" : "50%",
        height: isMobile ? (screenHeight - appbarHeight) / 2 : "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    };

    return (
        <ImageBackground
            testID="hero-image"
            source={{ uri: imageUri }}
            style={{
                width: screenWidth,
                height: screenHeight - appbarHeight,
            }}
            resizeMode="cover"
        >
            <View
                testID="hero-container"
                style={[
                    styles.container,
                    {
                        flexDirection: isMobile ? "column" : "row", width: screenWidth,
                        height: screenHeight - appbarHeight,
                    },
                ]}
            >
                {/* Left Content */}
                <View testID="hero-left" style={sharedContentStyle}>
                    <Text style={styles.title}>Left Content</Text>
                    <Text style={styles.subtitle}>This is the left side content.</Text>
                    <Pressable testID="btn-learn-more" style={styles.button} onPress={onPressLeft}>
                        <Text style={styles.buttonText}>Learn More</Text>
                    </Pressable>
                </View>

                {/* Right Content */}
                <View testID="hero-right" style={sharedContentStyle}>
                    <Text style={styles.title}>Right Content</Text>
                    <Text style={styles.subtitle}>This is the right side content.</Text>
                    <Pressable testID="btn-contact" style={styles.button} onPress={onPressRight}>
                        <Text style={styles.buttonText}>Contact Us</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#ffffff",
        marginBottom: 20,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#1e40af",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
