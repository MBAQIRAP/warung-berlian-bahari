import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function TransactionDetail({route}) {
  const {transaction} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rincian Transaksi</Text>
      <Text>Tanggal: {new Date(transaction.date).toLocaleString()}</Text>
      <Text>Metode Pembayaran: {transaction.paymentMethod}</Text>
      <Text>
        Total Harga: Rp {transaction.totalPrice.toLocaleString('id-ID')}
      </Text>
      <Text>
        Jumlah Dibayar: Rp {transaction.paidAmount.toLocaleString('id-ID')}
      </Text>
      <Text>Kembalian: Rp {transaction.change.toLocaleString('id-ID')}</Text>
      <Text>Rincian Pesanan:</Text>
      {transaction.items.map((item, index) => (
        <Text key={index}>
          {item.name} x{item.quantity}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 16},
  header: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
});

