import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from '../../../utils'

const Buttons = ({ onPress, text }) => {
    return (
        <TouchableOpacity style={styles.btnLogin} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Buttons

const styles = StyleSheet.create({
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
})