import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Api from '../../Api'
import { ImageWarung } from '../../assets'
import { Buttons } from '../../components'
import { colors } from '../../utils'

const Splash = ({ navigation }) => {
    const [data, setdata] = useState([])

    const getData = async () => {
        try {
            const response = Api.products()
            setdata(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text2}>Ini Splash</Text>
            <Image source={ImageWarung} style={{ width: 200, height: 200 }} />
            <Buttons text='Ke Login' onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnLogin: {
        backgroundColor: colors.red,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    },
    text: {
        fontSize: 16,
        color: colors.white
    },
    text2: {
        fontSize: 18,
        color: colors.black,
        textAlign: 'center'
    }
})