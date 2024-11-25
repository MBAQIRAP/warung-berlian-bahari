import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image , ScrollView} from 'react-native';
import { ImageCheckmark } from '../../../assets';

export default function Receipt({ route, navigation }) {
  // Data yang dikirim dari halaman sebelumnya
  const {
    totalPrice,
    change,
    paymentMethod,
    paidAmount,
    items,
  } = route.params || {};

  // Mendapatkan waktu saat ini
  const currentDateTime = new Date();
  const formattedDate = currentDateTime.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = currentDateTime.toLocaleTimeString('id-ID');

  return (
    <ScrollView style={styles.container}>
      

      <View style={styles.content}>
        {/* Waktu Transaksi */}
        <Text style={styles.dateTime}>
          {formattedDate}, {formattedTime}
        </Text>

        {/* Kembalian */}
        <Text style={styles.sectionTitle}>Kembalian</Text>
        <Text style={styles.amount}>Rp {change.toLocaleString('id-ID')}</Text>

        {/* Logo Centang */}
        <Image
          source={ImageCheckmark} // Pastikan file checkmark.png ada
          style={styles.checkmark}
        />

        {/* Pembayaran Berhasil */}
        <Text style={styles.successText}>Pembayaran Berhasil</Text>

        {/* Metode Pembayaran */}
        <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
        <Text style={styles.detailText}>{paymentMethod}</Text>

        {/* Jumlah Dibayar */}
        <Text style={styles.sectionTitle}>Jumlah Dibayar</Text>
        <Text style={styles.amount}>Rp {paidAmount.toLocaleString('id-ID')}</Text>

        {/* Total Harga */}
        <Text style={styles.sectionTitle}>Total Harga</Text>
        <Text style={styles.amount}>Rp {totalPrice.toLocaleString('id-ID')}</Text>

        {/* Rincian Item */}
        <Text style={styles.sectionTitle}>Rincian Pesanan:</Text>
        {items.map((item, index) => (
          <Text key={index} style={styles.itemText}>
            {item.name} x{item.quantity}
          </Text>
        ))}
      </View>

      {/* Tombol Transaksi Baru */}
      <TouchableOpacity
        style={styles.newTransactionButton}
        onPress={() => navigation.navigate('Drawers')}>
        <Text style={styles.newTransactionText}>Transaksi Baru</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  dateTime: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  checkmark: {
    width: 80,
    height: 80,
    marginVertical: 20,
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  newTransactionButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 10,
  },
  newTransactionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});