import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Login, Splash, User } from '../pages';

const Stack = createNativeStackNavigator()

const Routers = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="User" component={User} />
        </Stack.Navigator>
    )
}

export default Routers