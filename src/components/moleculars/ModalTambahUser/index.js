import {React,useState} from 'react'
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
    const [isShowingModalTambah, setIsShowingModalTambah] = useState(visible);
    return(
        <Modal style={styles.ModalTambah} visible={isShowingModalTambah} transparent={true}>
            <Text>Tambah Data</Text>
            <TextInput/>
            <TextInput/>
            <TextInput/>
            <View>
                <Pressable onPress={() => {setIsShowingModalTambah(false)}}>
                    <Text>Batal</Text>
                </Pressable>
                <Pressable>
                    <Text>Tambah</Text>
                </Pressable>
            </View>
        </Modal>
    );
}

export default ModalTambahUser

const styles = StyleSheet.create({
    ModalTambah : {
        width: 30,
        height : 30,
        margin : 0,
        backgroundColor: '#'
    },
});