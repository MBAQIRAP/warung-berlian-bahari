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
} from 'react-native';

import { colors } from '../../utils'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';
import { IconDelete, IconEdit, IconPassword, IconUser, ModalTambahUser} from '../../components';

const User = ({navigation}) => {
    tableHead= ['Nama', 'Role', 'Password', 'Action'];
    tableData= [
        ['Baqir', 'Admin', 'baqir123', <View style={styles.action}><IconEdit/><IconDelete/></View>],
        ['Awi', 'Admin', 'awi123', <View style={styles.action}><IconEdit/><IconDelete/></View>],
        ['Karayawan1', 'Kasir', 'k123', <View style={styles.action}><IconEdit/><IconDelete/></View>],
        ['Karyawan2', 'Kasir', 'k231', <View style={styles.action}>\<IconEdit/><IconDelete/></View>]
      ];
    return(
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView>
                <Pressable style={styles.PressableTambahUser} onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.TextTambahUser}>+ Tambah User</Text>
                </Pressable>
                <View>
                    <Table borderStyle={{borderWidth: 1, borderColor: 'black'}} style={styles.TableUser}>
                        <Row data={tableHead} textStyle={styles.TextTableHeader} />
                        <Rows data={tableData} textStyle={styles.TextTable}/>
                    </Table>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default User

const styles = StyleSheet.create({
    SafeAreaView : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        margin : 0,
        padding : 0
    },
    PressableTambahUser : {
        alignSelf : "center",
        backgroundColor : '#88FF00',
        width : 350,
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
        width : "auto"
    },
    action : {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4,
    }
})
