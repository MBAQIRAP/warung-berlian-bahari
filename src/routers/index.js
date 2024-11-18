import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Login, Splash, User } from '../pages';
import { createDrawerNavigator } from '@react-navigation/drawer';
import  {CustomDrawerContent} from '../components'
const Stack = createNativeStackNavigator();

const Routers = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="User" component={Drawers} />
        </Stack.Navigator>
    )
}

const Drawers = () => {
    const Drawer = createDrawerNavigator();
    return(
        <Drawer.Navigator initialRouteName='User'>
            <Drawer.Screen name='Menu' component={User}/>
            <Drawer.Screen name='Pengeluaran' component={User}/>
            <Drawer.Screen name='Pemasukan' component={User}/>
            <Drawer.Screen name='Laporan' component={User}/>
            <Drawer.Screen name='Kas' component={User}/>
            <Drawer.Screen name='User' component={User}/>
        </Drawer.Navigator>
    );
}



export {Routers, Drawers}