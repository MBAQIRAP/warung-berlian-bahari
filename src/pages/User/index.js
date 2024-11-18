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
import { IconEdit, IconPassword, IconUser } from '../../components';
const User = ({navigation}) => {
    tableHead= ['Nama', 'Role', 'Password', 'Action'];
    tableData= [
        ['1', '2', '3', <View style={styles.action}><IconUser/><IconPassword></IconPassword></View>],
        ['a', 'b', 'c', <View style={styles.action}><IconUser/><IconPassword></IconPassword></View>],
        ['1', '2', '3', <View style={styles.action}><IconUser/><IconPassword></IconPassword></View>],
        ['a', 'b', 'c', <View style={styles.action}><IconUser/><IconPassword></IconPassword></View>]
      ];
    return(
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView>
                <Pressable style={styles.PressableTambahUser} onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.TextTambahUser}>+ Tambah User</Text>
                </Pressable>
                <View>
                    <Table borderStyle={{borderWidth: 1, borderColor: 'black'}} style={styles.TableUser}>
                        <Row data={tableHead} textStyle={styles.TextTable} />
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
        alignItems : 'center'
    },
    PressableTambahUser : {
        alignSelf : "center",
        backgroundColor : '#88FF00',
        width : 350,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom : 30,
        marginTop : 20
    },
    TextTambahUser : {
        textAlign : "center",
    },
    TextTable : {
        textAlign : 'center'
    },
    TableUser : {
        width : "auto"
    },
    action : {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})
