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
    TouchableOpacity
} from 'react-native';

import { colors } from '../../utils'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';
import { IconDelete, IconEdit, IconPassword, IconUser, ModalTambahUser} from '../../components';


const User = ({navigation}) => {
    const tableHead= ['Nama', 'Role', 'Password', 'Action'];

    const [tableData, settableData]= useState([
        ['Baqir', 'Admin', 'baqir123', <View style={styles.action}><Pressable onPress={() => {setIsShowingModalTambah(true); setTitleModal('Edit Data User')}}><IconEdit/></Pressable><IconDelete/></View>],
        ['Awi', 'Admin', 'awi123', <View style={styles.action}><Pressable onPress={() => {setIsShowingModalTambah(true); setTitleModal('Edit Data User')}}><IconEdit/></Pressable><IconDelete/></View>],
        ['Karayawan1', 'Kasir', 'k123', <View style={styles.action}><Pressable onPress={() => {setIsShowingModalTambah(true); setTitleModal('Edit Data User')}}><IconEdit/></Pressable><IconDelete/></View>],
        ['Karyawan2', 'Kasir', 'k231', <View style={styles.action}><Pressable onPress={() => {setIsShowingModalTambah(true); setTitleModal('Edit Data User')}}><IconEdit/></Pressable><IconDelete/></View>],
      ]);
    
      const [isShowingModalTambah, setIsShowingModalTambah] = useState(false);
      const [nama, setNama] = useState();
      const [role, setRole] = useState();
      const [password, setPassword] = useState();
      const [titleModal, setTitleModal] = useState();
      const ModalUser = ({title}) => {
        return(
            <Modal visible={isShowingModalTambah} transparent={true}>
                <View style={styles.ModalBackground}>
                    <View style={styles.ModalView}>
                        <Text style={styles.ModalHeader}>{title}</Text>
                        <Text style={styles.ModalLabelInput}>Nama</Text>
                        <TextInput style={styles.ModalTextInput} onChange={(text) => setNama(text)}/>
                        <Text style={styles.ModalLabelInput}>Role</Text>
                        <TextInput style={styles.ModalTextInput} onChange={(text)=> setRole(text)}/>
                        <Text style={styles.ModalLabelInput}>Password</Text>
                        <TextInput style={styles.ModalTextInput} onChange={(text) => setPassword(text)}/>
                        <View style={styles.ModalRowButton}>
                            <TouchableOpacity style={styles.ModalButtonbatal} onPress={() => {setIsShowingModalTambah(false)}}>
                                <Text style={styles.ModalButtonText}>Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ModalButtonTambah}> 
                                <Text style={styles.ModalButtonTextTambah}>Tambah</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
      }
    return(
        <SafeAreaView style={styles.SafeAreaView}>
            <ModalUser title={titleModal}/>
            <ScrollView>
                <TouchableOpacity style={styles.PressableTambahUser} onPress={() => {setIsShowingModalTambah(true); setTitleModal('Tambah Data User')}}>
                    <Text style={styles.TextTambahUser}>+ Tambah User</Text>
                </TouchableOpacity>
                <Table borderStyle={{borderWidth: 1, borderColor: '#000000'}} style={styles.TableUser}>
                    <Row data={tableHead} textStyle={styles.TextTableHeader} />
                    <Rows data={tableData} textStyle={styles.TextTable}/>
                </Table>
            </ScrollView>
        </SafeAreaView>
    )
}

export default User

const styles = StyleSheet.create({
    SafeAreaView : {
        justifyContent : 'center',
        margin : 0,
        padding : 0
    },
    PressableTambahUser : {
        alignSelf : "center",
        backgroundColor : '#88FF00',
        width : '90%',
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom : 20,
        marginTop : 20
    },
    TextTambahUser : {
        textAlign : "center",
    },
    TextTableHeader : {
        textAlign : 'center',
        fontWeight: 'bold'
    },
    TextTable : {
        textAlign : 'center',
        fontSize: 12,
    },
    TableUser : {
        width : "90%",
        alignSelf: 'center',
    },
    action : {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4,
    },
    ModalBackground : {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex : 1,
        justifyContent: 'center',
        alignSelf : 'center',
        width: '100%'
    },
    ModalView : {
        backgroundColor : "#ffffff",
        alignSelf: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 6,
        width: '90%' 
    },
    ModalHeader : { 
        fontSize: 16,
        margin: 10,
        marginBottom: 20,
    },
    ModalLabelInput : {
        marginLeft: 10,
        fontSize: 14
    },
    ModalTextInput : {
        borderBottomWidth : 1,
        marginLeft : 10,
        marginRight: 10,
        fontSize : 14,
        marginBottom: 20
    },
    ModalRowButton : {
        flexDirection : 'row',
        justifyContent : 'center',
        marginBottom : 10,
    },
    ModalButtonbatal: {
        borderColor: "#04D30B",
        borderRadius: 5,
        borderWidth: 2,
        width : '40%',
        marginRight : 10,
    },
    ModalButtonTambah : {
        backgroundColor : "#04D30B",
        width : '40%',
        borderRadius: 5,
    },
    ModalButtonText : {
        fontSize: 16,
        color : '#04D30B',
        textAlign : 'center',
        marginVertical: 10,
    },
    ModalButtonTextTambah : {
        fontSize: 16,
        color : '#ffffff',
        textAlign : 'center',
        marginVertical: 10,
    }
})
