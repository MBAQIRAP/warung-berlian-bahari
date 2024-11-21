import { DrawerContent, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from 'react-native'

const CustomDrawer =  (props, navigation) => {
    return(
        <DrawerContentScrollView {...props} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.header}>
                <Text style={styles.text}>Selamat Datang</Text>
                <Text style={styles.text}>Awi Yunawan Putra</Text>
                <Text style={styles.text}>Kasir</Text>
            </View>
            <View style={styles.DrawableItemList}>
                <DrawerItemList {...props}/>
            </View>
            <TouchableOpacity style={styles.PressableLogout}>
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