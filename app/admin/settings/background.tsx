// import { AppBarWithBackIcon } from "@/components/AppBarWithBackIcon";
// import { useAppbarHeight } from "@/components/context/AppbarHeightContext";
// import { Image } from 'expo-image';
// import * as ImagePicker from "expo-image-picker";
// import React, { useState } from "react";
// import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
// const demoImage = 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'
// export default function ChangeBackground() {
//     const [imageUri, setImageUri] = useState<string | null>(null);
//     const { width: screenWidth, height: screenHeight } = useWindowDimensions();
//     const { height: appbarHeight } = useAppbarHeight();
//     const pickImage = async () => {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 1,

//         });

//         if (!result.canceled && result.assets.length > 0) {
//             setImageUri(result.assets[0].uri);
//             // Optionally upload the image or save it somewhere
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <AppBarWithBackIcon title="Change Main Background Image" isAdd={true} customIconName={'refresh-circle-outline'} onPressAdd={pickImage} />



//             <View style={styles.imageWrapper}>
//                 <Image
//                     source={imageUri ? imageUri : demoImage}
//                     style={{ height: screenHeight - appbarHeight, width: screenWidth }}
//                     contentFit="cover"
//                 />
//                 <Pressable style={styles.changeButton} onPress={pickImage}>
//                     <Text style={styles.changeButtonText}>Change Image</Text>
//                 </Pressable>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // padding: 20,
//         backgroundColor: "#f2f2f2",
//     },
//     heading: {
//         fontSize: 18,
//         fontWeight: "600",
//         marginVertical: 12,
//     },
//     imageWrapper: {
//         backgroundColor: "#fff",
//         borderRadius: 10,
//         overflow: "hidden",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     image: {
//         width: "100%",
//         height: 200,
//     },
//     changeButton: {
//         backgroundColor: "#007bff",
//         paddingVertical: 12,
//         alignItems: "center",
//     },
//     changeButtonText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "500",
//     },
// });
import { AppBarWithBackIcon } from "@/components/AppBarWithBackIcon";
import { useAppbarHeight } from "@/components/context/AppbarHeightContext";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    ImageBackground,
    Linking,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View
} from "react-native";

const demoImage = "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg";

type ContentBlock = {
    title: string;
    subtitle: string;
    buttonText: string;
    link: string;
};

export default function ChangeBackground() {
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const { height: appbarHeight } = useAppbarHeight();
    const isMobile = screenWidth < 768;

    const [imageUri, setImageUri] = useState<string | null>(null);

    const [leftContent, setLeftContent] = useState<ContentBlock>({
        title: "Left Content",
        subtitle: "This is the left side content.",
        buttonText: "Learn More",
        link: "https://example.com/learn",
    });

    const [rightContent, setRightContent] = useState<ContentBlock>({
        title: "Right Content",
        subtitle: "This is the right side content.",
        buttonText: "Contact Us",
        link: "https://example.com/contact",
    });

    const [editingSide, setEditingSide] = useState<"left" | "right" | null>(null);
    const [tempContent, setTempContent] = useState<ContentBlock>({ ...leftContent });
    const [modalVisible, setModalVisible] = useState(false);

    const openEditModal = (side: "left" | "right") => {
        const currentContent = side === "left" ? leftContent : rightContent;
        setTempContent({ ...currentContent });
        setEditingSide(side);
        setModalVisible(true);
    };

    const saveContent = () => {
        if (editingSide === "left") {
            setLeftContent(tempContent);
        } else if (editingSide === "right") {
            setRightContent(tempContent);
        }
        setModalVisible(false);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };

    const sharedContentStyle: any = {
        width: isMobile ? "100%" : "50%",
        height: isMobile ? (screenHeight - appbarHeight) / 2 : "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    };

    return (
        <View style={styles.containerMain}>
            <AppBarWithBackIcon
                title="Change Main Background Image"
                isAdd={true}
                customIconName={"refresh-circle-outline"}
                onPressAdd={pickImage}
            />

            <ImageBackground
                source={imageUri ? { uri: imageUri } : { uri: demoImage }}
                style={{
                    width: screenWidth,
                    height: screenHeight - appbarHeight,
                }}
                resizeMode="cover"
            >
                <View
                    style={[
                        styles.container,
                        { flexDirection: isMobile ? "column" : "row" },
                    ]}
                >
                    {/* Left Content */}
                    <View style={sharedContentStyle}>
                        <Text style={styles.title}>{leftContent.title}</Text>
                        <Text style={styles.subtitle}>{leftContent.subtitle}</Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => Linking.openURL(leftContent.link)}
                        >
                            <Text style={styles.buttonText}>{leftContent.buttonText}</Text>
                        </Pressable>
                        <Pressable
                            style={styles.editButton}
                            onPress={() => openEditModal("left")}
                        >
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>

                    {/* Right Content */}
                    <View style={sharedContentStyle}>
                        <Text style={styles.title}>{rightContent.title}</Text>
                        <Text style={styles.subtitle}>{rightContent.subtitle}</Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => Linking.openURL(rightContent.link)}
                        >
                            <Text style={styles.buttonText}>{rightContent.buttonText}</Text>
                        </Pressable>
                        <Pressable
                            style={styles.editButton}
                            onPress={() => openEditModal("right")}
                        >
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>

            {/* Modal for Editing */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Content</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={tempContent.title}
                            onChangeText={(text) =>
                                setTempContent({ ...tempContent, title: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Subtitle"
                            value={tempContent.subtitle}
                            onChangeText={(text) =>
                                setTempContent({ ...tempContent, subtitle: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Button Text"
                            value={tempContent.buttonText}
                            onChangeText={(text) =>
                                setTempContent({ ...tempContent, buttonText: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Link URL"
                            value={tempContent.link}
                            onChangeText={(text) =>
                                setTempContent({ ...tempContent, link: text })
                            }
                        />

                        <View style={styles.modalButtonRow}>
                            <Pressable style={styles.saveButton} onPress={saveContent}>
                                <Text style={styles.modalButtonText}>Save</Text>
                            </Pressable>
                            <Pressable
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
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
    editButton: {
        marginTop: 10,
        backgroundColor: "#ffffff90",
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    editButtonText: {
        color: "#000",
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#00000099",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "85%",
        maxWidth: 500,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 12,
        ...(Platform.OS === 'web' && { outlineStyle: 'none' as any }),
    },
    modalButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: "#1e40af",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: "#aaa",
        padding: 10,
        borderRadius: 5,
        flex: 1,
    },
    modalButtonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
});
