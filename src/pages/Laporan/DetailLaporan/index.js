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
import {IconGoFood, IconGrab, IconQris, IconWallet} from '../../../components'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';


const DetailLaporan = ({route}) => {
    const {tgl, total, pemasukan, pengeluaran} = route.params;
    const [visiblePemasukan,setVisiblePemasukan] = useState();
    const [visiblePengeluaran,setVisiblePengeluaran] = useState();
    const [visibleTablePemasukan,setVisibleTablePemasukan] = useState('none');
    const [visibleTablePengeluaran,setVisibleTablePengeluaran] = useState('none');
    const head = ['Nama', 'Jumlah Transaksi','Total Harga'];

    const tableData = [
        ['Ayam Goreng',  10, 70000],
        ['Ayam Bakar',  20, 650000],
        ['Es Teh',  30, 300000],
        
    ]

    const headPengeluaran = ['Produk','Satuan','Harga'];
    const tableDataPengeluaran =[
        ['Kentang','4Kg',80000],
        ['Kacang Merah','3Kg',60000],
    ];


    const _lihatRincianPemasukan = () => {
        if(visiblePemasukan=='none'){
            setVisiblePemasukan('');
            setVisibleTablePemasukan('none');
        }else{
            setVisiblePemasukan('none');
            setVisibleTablePemasukan('');
        }
    }

    const _lihatRincianPengeluaran = () => {
        if(visiblePengeluaran=='none'){
            setVisiblePengeluaran('');
            setVisibleTablePengeluaran('none');
        }else{
            setVisiblePengeluaran('none');
            setVisibleTablePengeluaran('');
        }
    }
    const TablePemasukan = () => {
        return(
            <Table borderStyle={{borderWidth: 1, borderColor: '#000000'}} style={styles.TableUser}>
                    <Row data={head} textStyle={{textAlign: 'center'}} />
                    <Rows data={tableData} textStyle={{textAlign: 'center'}}/>
                </Table>
        )
    }

    const TablePengeluaran = () => {
        return(
            <Table borderStyle={{borderWidth: 1, borderColor: '#000000'}} style={styles.TableUser}>
                    <Row data={headPengeluaran} textStyle={{textAlign: 'center'}} />
                    <Rows data={tableDataPengeluaran} textStyle={{textAlign: 'center'}}/>
                </Table>
        )
    }
    return ( 
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
                <View style={styles.Header}>
                    <View style={styles.HeaderPemasukan}>
                        <Text style={styles.HeaderText}>{total} Transaksi</Text>
                        <Text style={styles.HeaderText}>Rp {pemasukan.toLocaleString('id-ID')}</Text>
                    </View>
                    <View style={styles.HeaderPemasukan}>
                        <Text style={styles.HeaderText}>Belanja dan Biaya</Text>
                        <Text style={styles.HeaderText}>Rp {pengeluaran.toLocaleString('id-ID')}</Text>
                    </View>
                </View>
                <View style={{display: visiblePengeluaran}}>
                    <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 20}}>
                        <Text style={styles.TextMetodeBayar}>Metode Pembayaran</Text>
                        <TouchableOpacity style={styles.ButtonRincianMetode} onPress={_lihatRincianPemasukan}>
                            <Text style={styles.TextRincianMetode}>Lihat Rincian</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ViewTotalPembayaran}>
                        <View style={styles.IconWallet}><IconWallet size={40}/></View>
                        <Text style={styles.TextTotalMetode}>Total Pembayaran Tunai</Text>
                        <Text style={styles.TextTotalPembayaran}>Rp 1.650.000</Text>
                    </View>
                    <View style={styles.ViewTotalPembayaran}>
                        <View style={styles.IconWallet}><IconQris/></View>
                        <Text style={styles.TextTotalMetode}>Total Pembayaran Qris</Text>
                        <Text style={styles.TextTotalPembayaran}>Rp 450.000</Text>
                    </View>
                    <View style={styles.ViewTotalPembayaran}>
                        <View style={styles.IconWallet}><IconGoFood size={40}/></View>
                        <Text style={styles.TextTotalMetode}>Total Pembayaran GoFood</Text>
                        <Text style={styles.TextTotalPembayaran}>Rp 0</Text>
                    </View>
                    <View style={styles.ViewTotalPembayaran}>
                        <View style={styles.IconWallet}><IconGrab size={34} /></View>
                        <Text style={styles.TextTotalMetode}>Total Pembayaran Grab</Text>
                        <Text style={styles.TextTotalPembayaran}>Rp 0</Text>
                    </View>
                    <View style={styles.ViewContainerTotalMasuk}>
                        <View style={styles.ViewTotalMasuk}>
                            <Text style={styles.TextTotalMasuk}>Total Masuk Rekening</Text>
                            <Text style={{fontSize: 16}}>Rp 2.100.000</Text>
                        </View>
                        <View style={styles.ViewTotalMasuk}>
                            <Text style={styles.TextTotalMasuk}>Total Masuk Keseluruhan</Text>
                            <Text style={{fontSize: 16}}>Rp 2.100.000</Text>
                        </View>
                    </View>
                </View>
                <View style={{display: visiblePemasukan}}>
                    <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
                        <Text style={styles.TextMetodeBayar}>Pengeluaran</Text>
                        <TouchableOpacity style={styles.ButtonRincianMetode} onPress={_lihatRincianPengeluaran}>
                            <Text style={styles.TextRincianMetode}>Lihat Rincian</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ViewTotalPembayaran}>
                        <Text style={styles.TextTotalMetode}>Belanja Pasar</Text>
                        <Text style={styles.TextTotalPembayaran}>Rp 650.000</Text>
                    </View>
                    <View style={styles.ViewTotalPembayaran}>
                        <Text style={styles.TextTotalMetode}>Belanja Sembako</Text>
                        <Text style={styles.TextTotalPembayaran}>Rp 450.000</Text>
                    </View>
                    <View style={styles.ViewTotalPembayaran}>
                        <Text style={styles.TextTotalMetode}>Belanja Lain - Lain</Text>
                        <Text style={styles.TextTotalPembayaran}>Rp 450.000</Text>
                    </View>
                    <View style={styles.ViewTotalPembayaran}>
                        <Text style={styles.TextTotalMetode}>Biaya Tetap</Text>
                        <Text style={styles.TextTotalPembayaran}>Rp 450.000</Text>
                    </View>
                    <View style={styles.ViewContainerTotalMasuk}>
                        <View style={styles.ViewTotalMasuk}>
                            <Text style={styles.TextTotalMasuk}>Total Pengeluaran</Text>
                            <Text style={{fontSize: 16}}>Rp 1.300.000</Text>
                        </View>
                    </View>
                </View>
                <View style={{display: visibleTablePemasukan}}>
                    <Text style={{fontSize: 16, marginVertical: 20, marginLeft: 20,}}>Menu Yang Terjual</Text>
                    <View>
                        <TablePemasukan head={head}/>
                    </View>
                </View>
                <View style={{display: visibleTablePengeluaran}}>
                    <Text style={{fontSize: 16, marginVertical: 20, marginLeft: 20,}}>Pengeluaran</Text>
                    <View>
                        <TablePengeluaran head={head}/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default DetailLaporan

const styles = StyleSheet.create({
    Header : {
        flexDirection: 'row',
    },
    HeaderPemasukan : {
        flex: 1,
        backgroundColor: '#007004',
        marginTop: 20,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 6,
    },
    HeaderText : {
        textAlign: 'center',
        color: '#ffffff',
        fontSize : 16,
    },
    TextMetodeBayar : {
        flex: 1,
        marginLeft: 20,
        fontSize: 16
    },
    ButtonRincianMetode : {
        backgroundColor: '#88FF00',
        borderRadius: 50,
        width: '25%',
        marginRight: 20,
    },
    TextRincianMetode : {
        textAlign : 'center',
    },
    ViewTotalPembayaran : {
        flexDirection : 'row',
        borderBottomWidth: 1,
        paddingVertical : 5,
    },
    IconWallet : {
        marginRight : 15,
        marginLeft : 10,
        width: 34,
        height: 34,
    },
    TextTotalMetode : {
        flex : 2,
        textAlign: 'left',
        alignSelf: 'center'
    },
    TextTotalPembayaran : {
        flex : 1,
        textAlign: 'right',
        alignSelf: 'center',
        marginRight : 20,
    },
    ViewContainerTotalMasuk : {
        marginTop : 20,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 20,
        paddingVertical : 15,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    ViewTotalMasuk: {
        flexDirection : 'row',
    },
    TextTotalMasuk : {
        flex : 1,
        fontSize: 16
    },
    TableUser : {
        width : "90%",
        alignSelf: 'center',
    },
});