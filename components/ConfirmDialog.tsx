
import React = require('react');
import {
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface ConfirmDialogProps {
    visible: boolean;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export const ConfirmDialog = ({
    visible,
    message,
    onCancel,
    onConfirm,
}: ConfirmDialogProps) => {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>

                    <Text style={styles.message} testID={message === "" ? "dialog-message-empty" : "dialog-message"}>{message}</Text>
                    <View style={styles.actions}>
                        <Pressable style={styles.button} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>
                        <Pressable style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                            <Text style={styles.confirmText}>Confirm</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(58, 56, 56, 0.04)',
        justifyContent: 'center',
        padding: 20,
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        maxWidth: 400,         // 👈 Prevents stretch on web
        minWidth: 280,
        alignSelf: 'center',
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    cancelText: {
        fontSize: 16,
        color: 'gray',
    },
    confirmButton: {
        backgroundColor: '#007bff',
        borderRadius: 6,
    },
    confirmText: {
        fontSize: 16,
        color: 'white',
    },
});
