import {React, useState, useEffect} from 'react';
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

import AsyncStorage from '@react-native-async-storage/async-storage';

import {ImageLogin} from '../../assets'
import {IconUser, IconPassword} from '../../components'
import Api from '../../Api'

function Login({navigation}) {
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');

  async function AsyncLogin(id,nama,password,role){
    try {
      await AsyncStorage.setItem('id',id.toString())
      await AsyncStorage.setItem('nama', nama)
      await AsyncStorage.setItem('password', password)
      await AsyncStorage.setItem('role', role)
    } catch (e) {
      // saving error
    }
  }

  async function AsyncCheckLogin(){
    if(await AsyncStorage.getItem('id') !== null){
      navigation.navigate('Drawers')
    }
  }

  useEffect(() => {
    AsyncCheckLogin()
}, []);

  function _buttonLogin() {
    Api.login(nama,password).then(response => {
      const id = response.data.user[0].id_user;
      const nama=response.data.user[0].nama_user;
      const password=response.data.user[0].password_user;
      const role = response.data.user[0].nama_role
      if(response.data.message=='success'){
        if(role=='admin'){
          AsyncLogin(id,nama,password,role)
          navigation.navigate("Drawers");
        }else if(role=='pengelola'){
          AsyncLogin(id,nama,password,role)
          navigation.navigate("Drawers");
        }else{
          AsyncLogin(id,nama,password,role)
          navigation.navigate("Drawers");
        }
      }else{
        Alert.alert(response.data.message)
      }
    }).catch(error => {
      console.error("Error sending data: ", error);
    });
    /*const users = data.find((user) => user.nama === nama && user.password === password)
    if(users == undefined){
      Alert.alert("Username atau Password salah")
    }else{
      api.Login(users.nama)
      navigation.navigate("Drawers", {nama : users.nama, role: users.role});
    }*/
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
