import {DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, {useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';



const CustomDrawer =  (props) => {
    const navigation = useNavigation(); 
    const[userNama,setNama] = useState();
    const[userRole,setRole] = useState();
    async function AsyncGet(){
        try {
          await AsyncStorage.getItem('id')
          const nama=await AsyncStorage.getItem('nama')
          await AsyncStorage.getItem('password')
          const role=await AsyncStorage.getItem('role')
          if (role !== null) {
            setRole(role);
          }
          if (nama !== null) {
            setNama(nama);
          }
        } catch (e) {
          // saving error
        }
    }

    useEffect(() => {
        AsyncGet()
    }, []);
    
    const AsyncRemoveItem = async () => {
            try {
                await AsyncStorage.removeItem('id')
                await AsyncStorage.removeItem('nama');
                await AsyncStorage.removeItem('role');
                await AsyncStorage.removeItem('password');
            }
            catch(exception) {
               
            }
    }
    const _buttonLogOut = () => {
        AsyncRemoveItem();
        navigation.navigate('Login');
    }
    return(
        <DrawerContentScrollView {...props} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.header}>
                <Text style={styles.text}>Selamat Datang</Text>
                <Text style={styles.text}>{userNama}</Text>
                <Text style={styles.text}>{userRole}</Text>
            </View>
            <View style={styles.DrawableItemList}>
                <DrawerItemList {...props}/>
            </View>
            <TouchableOpacity onPress={_buttonLogOut} style={styles.PressableLogout}>
                    <Text style={styles.TextLogOut}>LogOut</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

export default CustomDrawer

const styles = StyleSheet.create({
    DrawerSize : {
        flexDirection: 'col',
        justifyContent: 'flex-end'
    },
    header : {
        alignSelf : 'start',
        backgroundColor : "#2A9D00",
        height : 125,
        paddingLeft : 20,
        marginHorizontal: -12,
        marginTop: -12,
        justifyContent : 'center'
    },
    DrawableItemList : {
        flex: 1
    },
    text : {
        color : 'white',
        fontWeight: 'bold',
        fontSize : 20
    },
    TextLogOut : {
        textAlign : 'center',
        color : '#2A9D00',
        fontSize : 25,
        fontWeight : 'bold'
    },
    PressableLogout : {
        width: '100%',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginHorizontal : 0,
        borderColor : '#2A9D00',
        borderWidth: 1,
        borderRadius : 5,
    },
});