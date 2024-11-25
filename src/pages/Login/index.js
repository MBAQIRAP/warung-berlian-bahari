import {React, useState} from 'react';
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
  TouchableOpacity,
} from 'react-native';

import {ImageLogin} from '../../assets'
import {IconUser, IconPassword} from '../../components'

function Login({navigation}) {
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');

  function _buttonLogin() {
    navigation.navigate("Drawers")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.textHeader}>Login</Text>
        <Image source={ImageLogin} />
        <View style={styles.containerInputLogin}>
          <IconUser/>
          <TextInput
            placeholder="username"
            onChangeText={text => setNama(text)}
            name="nama"
            style={styles.textInputLogin}
          />
        </View>
        <View style={styles.containerInputLogin}>
          <IconPassword/>
          <TextInput
            placeholder="password"
            onChangeText={text => setPassword(text)}
            name="password"
            style={styles.textInputLogin}
          />
        </View>
        <TouchableOpacity style={styles.buttonLogin} onPress={_buttonLogin}>
          <Text style={styles.textLogin}>Masuk</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  textHeader: {
    fontSize: 36,
    color: '#2A9D00',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  containerInputLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F4EEA9',
    padding: 10,
    paddingLeft : 5,
    marginTop: 15,
    borderRadius: 6,
    width: 280,
  },
  textInputLogin: {
    flex: 1,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 6,
    fontSize: 16,
    paddingStart: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#064635',
    marginTop: 20,
    borderRadius: 6,
  },
  textLogin: {
    fontSize: 30,
    color: '#F4EEA9',
    fontWeight: 'bold',
  },
});

export default Login;
