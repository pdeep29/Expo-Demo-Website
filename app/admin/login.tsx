import EyeClose from "@/assets/svg/eyeClose";
import EyeOpen from "@/assets/svg/eyeOpen";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from "react-native";

export default function AdminLogin() {
    const { width: screenWidth } = useWindowDimensions();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {

        if (Platform.OS === "web") {
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            if (isLoggedIn === "true") {
                console.log('isLoggedIn', isLoggedIn)
                router.replace("/admin/dashboard"); // Redirect to index
            }
        }
    }, []);
    return (
        <ImageBackground
            source={require("../../assets/images/AdminLoginBg.jpg")}
            style={[styles.background, { width: screenWidth }]}
        >
            <View style={styles.overlay}>
                <View style={styles.loginBox}>
                    <Image
                        source={require("../../assets/images/icon.png")}
                        style={styles.logo}
                        contentFit="contain"
                    />
                    <Text style={styles.title}>Login</Text>

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="Enter your email"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor="#ccc"
                            style={styles.passwordInput}
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}

                        />
                        <Pressable
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                        >
                            {showPassword ? <EyeOpen customStroke="#666" height={22} width={22} /> :
                                <EyeClose customStroke="#666" height={22} width={22} />}
                            {/* <Ionicons
                                name={showPassword ? "eye-off" : "eye"}
                                size={22}
                                color="#666"
                            /> */}
                        </Pressable>
                    </View>

                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            if (email && password) {


                                if (Platform.OS === "web") {
                                    localStorage.setItem("isLoggedIn", "true");
                                    window.location.replace("/admin/dashboard");
                                } else {
                                    router.replace("/admin/dashboard");
                                }
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
    },
    overlay: {
        flex: 1,
        // backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    loginBox: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "rgba(255, 252, 252, 0.39)",
        borderRadius: 10,
        padding: 20,
        alignItems: "stretch",
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 25,
        color: "#1f2937",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 5,
        color: "#111827",
    },
    input: {
        height: 48,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: "#fff",
        ...(Platform.OS === 'web' && { outlineStyle: 'none' as any }),
    },
    button: {
        backgroundColor: "#2563eb",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 15,
        paddingHorizontal: 12,
    },
    passwordInput: {
        flex: 1,
        height: 48,
        fontSize: 16,
        ...(Platform.OS === 'web' && { outlineStyle: 'none' as any }),
    },
    eyeIcon: {
        marginLeft: 8,
    }
});
