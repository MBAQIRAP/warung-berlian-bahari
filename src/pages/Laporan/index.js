import {React,useState} from 'react'
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
    Modal,
    TouchableOpacity
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const ListLaporan = ({total,tgl,pemasukan,pengeluaran}) => {
    return(
        <View style={styles.ViewContainer}>
            <View style={{flex: 1, paddingHorizontal: 20,}}>
                <Text style={{fontSize: 15}}>{tgl}</Text>
                <Text>{total} Transaksi</Text>
            </View>
            <View style={{flex: 1}}>
                <Text>Pemasukan : Rp {pemasukan.toLocaleString('id-ID')}</Text>
                <Text>Pengeluaran : Rp {pengeluaran.toLocaleString('id-ID')}</Text>
            </View>
        </View>
    )
}

const Laporan = () => {
    const [dataLaporan, setDataLaporan] = useState([
        {id: 1,tgl : 'Kamis, 12 Oktober 2024', total: 20, pemasukan: 1600000, pengeluaran: 100000},
        {id: 2,tgl : 'Jumat, 13 Oktober 2024', total: 21, pemasukan: 1700000, pengeluaran: 200000},
        {id: 3,tgl : 'Sabtu, 14 Oktober 2024', total: 10, pemasukan: 1700000, pengeluaran: 200000},
        {id: 4,tgl : 'Minggu, 15 Oktober 2024', total: 50, pemasukan: 1700000, pengeluaran: 200000},
    ]);
    return (
        <SafeAreaView style={{flexDirection: 'col', flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Total Selama Periode</Text>
                <Text style={styles.headerText}>12 Oktober 2024 -  20 Oktober 2024</Text>
                <Text style={styles.headerText}></Text>
                <Text style={styles.headerText}>Omset (Tunai) : Rp 1.500.000</Text>
                <Text style={styles.headerText}>Pengeluaran : Rp 1.200.000</Text>
                <Text style={styles.headerText}>Sisa : Rp -300.000</Text>
                <Text style={styles.headerText}>Omset (Rekening) : Rp 400.000</Text>
            </View>
            <FlatList style={{flex: 1}} data={dataLaporan} keyExtractor={item => item.id} renderItem={({item,index}) => <ListLaporan total={item.total} tgl={item.tgl} pemasukan={item.pemasukan} pengeluaran={item.pengeluaran}/>}/>
        </SafeAreaView>
    )
}

export default Laporan

const styles =  StyleSheet.create({
    header : {
        backgroundColor: '#D9D9D9',
        paddingVertical: 15,
        marginVertical: 20,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 6,
    },
    headerText : {
        paddingLeft : 30,
    },
    ViewContainer : {
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    TextList : {

    },
});