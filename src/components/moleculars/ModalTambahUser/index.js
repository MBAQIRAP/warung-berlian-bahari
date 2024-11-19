import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Pressable,
    Alert,
    Modal,
} from 'react-native';

const ModalTambahUser = ({visible}) => {
    return(
        <Modal style={styles.ModalTambah}>
            <Text>{visible}</Text>
        </Modal>
    );
}

export default ModalTambahUser

const styles = StyleSheet.create({
    ModalTambah : {
        width: 30,
        height : 30,
    },
});