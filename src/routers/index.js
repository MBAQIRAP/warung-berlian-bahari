import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Login, Splash, User, Kas } from '../pages';
import { createDrawerNavigator } from '@react-navigation/drawer';
import  {CustomDrawer, IconUser, IconMenu, IconPengeluaran, IconPemasukan, IconLaporan, IconKas} from '../components';

const Stack = createNativeStackNavigator();

const Routers = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Drawers" component={Drawers}/>
        </Stack.Navigator>
    )
}

const Drawers = () => {
    const Drawer = createDrawerNavigator();
    return(
        <Drawer.Navigator initialRouteName='User'
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor : 'rgba(94, 94, 94, 0.36)',
                drawerInactiveTintColor : '#000000',
                drawerActiveTintColor : '#000000',
                drawerLabelStyle : {
                    fontSize : 16,
                },
                drawerItemStyle : {
                    borderRadius : 0,
                    marginHorizontal : -12 
                },
                drawerStyle : {
                    margin : 0,
                    padding : 0,
                    maxWidth: '65%',
                },
            }}
        > 
            <Drawer.Screen name='Menu' component={User} options={{
                drawerIcon : ({focused, size}) => (
                    <IconMenu/>
                ),
            }}/>
            <Drawer.Screen name='Pengeluaran' component={User} options={{
                drawerIcon : ({focused, size}) => (
                    <IconPengeluaran/>
                ),
            }}/>
            <Drawer.Screen name='Pemasukan' component={User} options={{
                drawerIcon : ({focused, size}) => (
                    <IconPemasukan/>
                ),
            }}/>
            <Drawer.Screen name='Laporan' component={User} options={{
                drawerIcon : ({focused, size}) => (
                    <IconLaporan/>
                ),
            }}/>
            <Drawer.Screen name='Kas' component={Kas} options={{
                drawerIcon : ({focused, size}) => (
                    <IconKas/>
                ),
            }}/>
            <Drawer.Screen name='User' component={User} options={{
                drawerIcon : ({focused, size}) => (
                    <IconUser/>
                ),
            }}/>
        </Drawer.Navigator>
    );
}



export {Routers, Drawers}