import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
    BackHandler,
    FlatList,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from "react-native";

export default function AdminDashboard() {
    const router = useRouter();
    const pathname = usePathname();
    const { width } = useWindowDimensions();
    const isWeb = Platform.OS === "web";
    const calculateNumColumns = (screenWidth: number) => {
        if (screenWidth >= 1200) return 8;
        if (screenWidth >= 900) return 6;
        if (screenWidth >= 600) return 4;
        return 2;
    };

    const numColumns = calculateNumColumns(width);
    // const handleLogout = () => {
    //     // 1. Replace current page with index (without adding history)
    //     router.replace("/");
    //     if (Platform.OS === 'web') {
    //         localStorage.clear()
    //         window.location.replace("/");r
    //     }
    //     // 2. Add dummy state to prevent backward navigation
    //     setTimeout(() => {
    //         window.history.replaceState(null, "", "/");

    //         // 3. Block both backward and forward nav
    //         // window.onpopstate = () => {
    //         //     window.history.go(1); // prevent back
    //         // };
    //     }, 50);
    // };
    const handleLogoutAndRedirect = () => {

        if (Platform.OS === "web") {
            localStorage.removeItem("isLoggedIn");
            localStorage.clear()
            window.location.replace("/");

            // After redirect, block back navigation
            setTimeout(() => {
                window.history.pushState(null, "", "/");
                window.onpopstate = () => {
                    window.history.go(1); // Prevent back
                };
            }, 100);
        } else {
            router.replace("/");
        }
    };
    const cards = [
        {
            title: "Product",
            icon: <MaterialCommunityIcons name="format-list-bulleted-type" size={40} color="#fff" />,
            onPress: () => router.push("/admin/products/products"),
        },
        {
            title: "Service",
            icon: <MaterialCommunityIcons name="room-service-outline" size={40} color="#fff" />,
            onPress: () => router.push("/admin/products/services"),
        },
        // {
        //     title: "Add Product",
        //     icon: <Ionicons name="add-circle-outline" size={40} color="#fff" />,
        //     onPress: () => router.push("/admin/products/addProduct"),
        // },
        // {
        //     title: "Add Service",
        //     icon: <Ionicons name="add-circle-outline" size={40} color="#fff" />,
        //     onPress: () => router.push("/admin/products/addService"),
        // },
        {
            title: "Product \nCategories",
            icon: <Ionicons name="file-tray-stacked-sharp" size={40} color="#fff" />,
            onPress: () => router.push("/admin/categories/productsCategory"),
        },
        {
            title: "Service \nCategories",
            icon: <Ionicons name="file-tray-stacked-sharp" size={40} color="#fff" />,
            onPress: () => router.push("/admin/categories/serviceCategories"),
        },
        {
            title: "Change \nBackground",
            icon: <Ionicons name="image-outline" size={40} color="#fff" />,


            onPress: () => router.push("/admin/settings/background"),
        },
        // Add more cards here if needed
    ];

    // Handle browser/device back only on dashboard
    // useEffect(() => {
    //     const onBackPress = () => {
    //         if (pathname === "/admin/dashboard") {
    //             router.replace("/");
    //             return true;
    //         }
    //         return false;
    //     };

    //     if (isWeb) {
    //         if (pathname === "/admin/dashboard") {
    //             console.log('popStateHandler called for removal1')
    //             // Clear forward/backward history
    //             window.history.pushState(null, "", window.location.href);
    //             window.onpopstate = () => {
    //                 console.log('onPopState Called +++++++')

    //                 window.history.go(1); // Prevent going back

    //             };
    //         }

    //         const popStateHandler = () => {
    //             console.log('popStateHandler called for removal')
    //             if (pathname === "/admin/dashboard") {
    //                 // window.history.pushState(null, "", "/");
    //                 // router.replace("/");
    //                 // router.dismissTo("/");
    //                 // router.dismiss()
    //                 // router.dismissAll()
    //                 // router.canDismiss()
    //             }
    //         };

    //         window.addEventListener("popstate", popStateHandler);
    //         return () => {
    //             window.removeEventListener("popstate", popStateHandler);
    //             window.onpopstate = null;
    //         };
    //     } else {
    //         BackHandler.addEventListener("hardwareBackPress", onBackPress);
    //         return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    //     }
    // }, [pathname]);

    useEffect(() => {
        if (Platform.OS === "web" && pathname === "/") {
            window.history.replaceState(null, "", "/");
            window.onpopstate = () => {
                window.history.go(1);
            };
        }

        return () => {
            window.onpopstate = null;
        };
    }, [pathname]);
    useEffect(() => {


        if (Platform.OS === "web") {
            // Push dummy state to block back

            window.history.pushState(null, "", window.location.href);

            const handlePopState = () => {
                // If user is on dashboard, redirect to index
                if (window.location.pathname === "/admin/dashboard") {
                    handleLogoutAndRedirect();
                }
            };

            window.onpopstate = handlePopState;

            // Handle refresh
            const handleBeforeUnload = () => {
                handleLogoutAndRedirect();
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
                    handleLogoutAndRedirect();
                    return true;
                }
            );

            return () => backHandler.remove();
        }
    }, []);
    useEffect(() => {
        if (Platform.OS === "web" && pathname === "/admin/dashboard") {
            // Clear history stack
            window.history.pushState(null, "", window.location.href);

            window.onpopstate = () => {
                handleLogoutAndRedirect();
            };
        }

        return () => {
            window.onpopstate = null;
        };
    }, [pathname]);




    return (
        <View style={styles.container}>
            {/* App Bar */}
            <View style={styles.appBar}>
                <Text style={styles.appBarTitle}>Admin Dashboard</Text>
                <Pressable onPress={handleLogoutAndRedirect}>
                    <Ionicons name="log-out-outline" size={24} color="#fff" />
                </Pressable>
            </View>

            {/* Card Grid */}
            <FlatList
                contentContainerStyle={styles.grid}
                style={{ flex: 1, alignContent: 'center', width: width }}
                data={cards}
                keyExtractor={(_, index) => index.toString()}
                numColumns={numColumns}
                extraData={numColumns} // 👈 THIS IS REQUIRED
                renderItem={({ item }) => {
                    const itemWidth = (width * 90 / 100) / numColumns

                    console.log('itemWidth', itemWidth)
                    return (
                        <Pressable
                            onPress={item.onPress}
                            style={({ pressed }) => [
                                styles.card,
                                {
                                    width: itemWidth,
                                    height: itemWidth,
                                    margin: 8,
                                    alignItems: 'center',

                                },
                            ]}
                        >
                            <View style={styles.iconContainer}>{item.icon}</View>
                            <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                        </Pressable>
                    );
                }}

                key={`grid-${numColumns}`} // Still helpful
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    appBar: {
        height: 56,
        backgroundColor: "#1e293b",
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 4,
    },
    appBarTitle: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    grid: {
        // padding: 12,
        flex: 1,
        // alignContent: 'center',
        alignSelf: 'center'
    },
    card: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: "rgba(70, 53, 163, 0.5)",
        alignItems: "center",
        justifyContent: 'center'
    },
    iconContainer: {
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#f9fafb",

        textAlign: "center",
    },
});
