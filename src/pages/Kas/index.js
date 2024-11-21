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
  Touchable,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { IconEdit } from '../../components';
import { FlatList } from 'react-native-gesture-handler';

const Kas = () => {
  const totalKas = {
    Uang_Kas_Toko : 2000000,
    Uang_Kas_Toko_Rekening : 5000000,
  };
  const dataKas = [
    {tgl: 'Kamis, 10 Oktober 2024', kas: 100000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 200000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 100000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 200000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
    {tgl: 'Kamis, 10 Oktober 2024', kas: 300000},
  ]
  const ListKas = () => {
    return (
      <View style={styles.ViewContainer}>
                <View style={{flex: 1}}>
                  <Text>Kamis, 10 Oktober 2024</Text>
                  <Text>Kas Toko -> Kas Rekening</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={styles.ViewRiwayatText}>Rp 100.000</Text>
                  <View style={styles.ViewIcon}><IconEdit/></View>
                  
                </View>
              </View>
    )
  }

  const ModalKas = ({title}) => {
    return(
        <Modal visible={isShowingModal} transparent={true}>
            <View style={styles.ModalBackground}>
                <View style={styles.ModalView}>
                    <Text style={styles.ModalHeader}>{title}</Text>
                    <Text style={styles.ModalLabelInput}>Asal Kas</Text>
                    <TextInput style={styles.ModalTextInput} onChange={(text) => setAsal(text)}/>
                    <Text style={styles.ModalLabelInput}>Tujuan Kas</Text>
                    <TextInput style={styles.ModalTextInput} onChange={(text)=> setTujuan(text)}/>
                    <Text style={styles.ModalLabelInput}>Total</Text>
                    <TextInput keyboardType='numeric' style={styles.ModalTextInput} onChange={(text) => setTotal(text)}/>
                    <View style={styles.ModalRowButton}>
                        <TouchableOpacity style={styles.ModalButtonbatal} onPress={() => {setIsShowingModal(false)}}>
                            <Text style={styles.ModalButtonText}>Batal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ModalButtonTambah}> 
                            <Text style={styles.ModalButtonTextTambah}>Tambah</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
  }
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [titleModal, setTitleModal] = useState();
  const [asal, setAsal] = useState();
  const [tujuan, setTujuan] = useState();
  const [total, setTotal] = useState();

    return (
        <SafeAreaView>
          <ModalKas title={titleModal}/>
          <View style={styles.header}>
              <Text style={styles.headerText}>Uang Kas per tanggal 20 Oktober 2024</Text>
              <Text style={styles.headerText}>Uang Kas Toko:     Rp {totalKas.Uang_Kas_Toko}</Text>
              <Text style={styles.headerText}>Uang Kas Rekening:     Rp {totalKas.Uang_Kas_Toko_Rekening}</Text>
            </View>
            <Text style={styles.riwayat}>Riwayat Transfer</Text>
            <FlatList data={dataKas} renderItem={ListKas} style={{height: "60%"}}/>
            <TouchableOpacity style={styles.buttonTambah} onPress={() => {setIsShowingModal(true); setTitleModal('Tambah Data Kas')}}>
              <Text style={styles.buttonText}>Tambah Rincian Transfer</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Kas

const styles = StyleSheet.create({
  header : {  
    alignSelf: 'center',
    backgroundColor: "#D9D9D9",
    marginTop : 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  headerText : {
    textAlign: 'center',
    fontSize: 50,
  },
  headerText : {
    textAlign: 'center',
  },
  riwayat : {
    fontSize : 20,
    marginTop: 20,
    marginLeft: 20,
    marginBottom : 20,
  },
  ViewContainer : {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth : 1,
  },
  ViewRiwayatText : {
    flex: 1,
    fontSize : 25,
    textAlign: 'center',
    alignSelf: 'center'
  },
  ViewIcon : {
      justifyContent: 'space-evenly',
      marginRight: 6,
  },
  buttonTambah : {
    position: 'sticky',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor : "#88FF00",
    width : '80%',
    height : 35,
    bottom : 0,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText : {
    textAlign : 'center',
    fontSize : 23
  },
  ModalBackground : {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex : 1,
    justifyContent: 'center',
    alignSelf : 'center',
    width: '100%'
  },
  ModalView : {
      backgroundColor : "#ffffff",
      alignSelf: 'center',
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: 6,
      width: '90%' 
  },
  ModalHeader : { 
      fontSize: 16,
      margin: 10,
      marginBottom: 20,
  },
  ModalLabelInput : {
      marginLeft: 10,
      fontSize: 14
  },
  ModalTextInput : {
      borderBottomWidth : 1,
      marginLeft : 10,
      marginRight: 10,
      fontSize : 14,
      marginBottom: 20
  },
  ModalRowButton : {
      flexDirection : 'row',
      justifyContent : 'center',
      marginBottom : 10,
  },
  ModalButtonbatal: {
      borderColor: "#04D30B",
      borderRadius: 5,
      borderWidth: 2,
      width : '40%',
      marginRight : 10,
  },
  ModalButtonTambah : {
      backgroundColor : "#04D30B",
      width : '40%',
      borderRadius: 5,
  },
  ModalButtonText : {
      fontSize: 16,
      color : '#04D30B',
      textAlign : 'center',
      marginVertical: 10,
  },
  ModalButtonTextTambah : {
      fontSize: 16,
      color : '#ffffff',
      textAlign : 'center',
      marginVertical: 10,
  }
});