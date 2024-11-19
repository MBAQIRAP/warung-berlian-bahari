import { DrawerContent, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native'

const CustomDrawer =  (props, navigation) => {
    return(
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Text style={styles.text}>Selamat Datang</Text>
                <Text style={styles.text}>Awi Yunawan Putra</Text>
                <Text style={styles.text}>Kasir</Text>
            </View>
            <DrawerItemList {...props}/>
            <Pressable style={styles.PressableLogout}>
                    <Text style={styles.TextLogOut}>LogOut</Text>
            </Pressable>
        </DrawerContentScrollView>
    );
}

export default CustomDrawer

const styles = StyleSheet.create({
    header : {
        flex : 1,
        alignSelf : 'start',
        backgroundColor : "#2A9D00",
        height : 125,
        paddingLeft : 20,
        marginHorizontal: -12,
        marginTop: -12,
        justifyContent : 'center'
    },
    DrawerScrollView : {
        margin : 0,
        padding : 0
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
        position : 'relative',
        top : 200,
        marginHorizontal : 0,
        borderColor : '#2A9D00',
        borderWidth: 1,
        borderRadius : 5,
    },
});