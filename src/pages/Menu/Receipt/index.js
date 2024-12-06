import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {ImageCheckmark} from '../../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Receipt({route, navigation}) {
  const saveTransaction = async transaction => {
    try {
      const existingTransactions =
        JSON.parse(await AsyncStorage.getItem('transactions')) || [];
      const updatedTransactions = [...existingTransactions, transaction];
      await AsyncStorage.setItem(
        'transactions',
        JSON.stringify(updatedTransactions),
      );
    } catch (e) {
      console.error('Error saving transaction:', e);
    }
  };

  const {totalPrice, change, paymentMethod, paidAmount, items} =
    route.params || {};

  const currentDateTime = new Date();
  const formattedDate = currentDateTime.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = currentDateTime.toLocaleTimeString('id-ID');

  return (
    <View style={styles.container}>
      {/* ScrollView untuk konten */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Struk Transaksi</Text>

        {/* Waktu Transaksi */}
        <Text style={styles.dateTime}>
          {formattedDate}, {formattedTime}
        </Text>

        {/* Kembalian */}
        <Text style={styles.kembalian}>Kembalian</Text>
        
        <Text style={styles.largeAmount}>
          Rp {change.toLocaleString('id-ID')}
        </Text>

        {/* Logo Centang */}
        <Image source={ImageCheckmark} style={styles.checkmark} />

        {/* Pembayaran Berhasil */}
        <Text style={styles.successText}>Pembayaran Berhasil</Text>

        {/* Dua Kolom */}
        <View style={styles.row}>
          {/* Kolom Kiri: Rincian Pesanan */}
          <View style={styles.leftColumn}>
            <Text style={styles.sectionTitle}>Rincian Pesanan:</Text>
            {items.map((item, index) => (
              <Text key={index} style={styles.itemText}>
                {item.name} x{item.quantity}
              </Text>
            ))}
          </View>

          {/* Kolom Kanan: Metode, Jumlah Bayar, Total Harga */}
          <View style={styles.rightColumn}>
            <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
            <Text style={styles.detailText}>{paymentMethod}</Text>

            <Text style={styles.sectionTitle}>Jumlah Dibayar</Text>
            <Text style={styles.amount}>
              Rp {paidAmount.toLocaleString('id-ID')}
            </Text>

            <Text style={styles.sectionTitle}>Total Harga</Text>
            <Text style={styles.amount}>
              Rp {totalPrice.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Tombol Transaksi Baru */}
      <TouchableOpacity
        style={styles.newTransactionButton}
        onPress={async () => {
          await saveTransaction({
            date: new Date(),
            paymentMethod,
            totalPrice,
            paidAmount,
            change,
            items,
          });
          navigation.navigate('Drawers');
        }}>
        <Text style={styles.newTransactionText}>Transaksi Baru</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  dateTime: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  kembalian:{
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    paddingTop: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  largeAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  checkmark: {
    width: 80,
    height: 80,
    marginVertical: 20,
    alignSelf: 'center',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flex: 1,
    marginLeft: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  newTransactionButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  newTransactionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
