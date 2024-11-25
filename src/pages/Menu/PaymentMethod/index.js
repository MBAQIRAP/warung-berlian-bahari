import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useState} from 'react';
import {Alert} from 'react-native';
import { ImagePlaceHolder } from '../../../assets';

export default function PaymentMethod({route, navigation}) {
  const {selectedItems = [], totalPrice = 0} = route.params || {};
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const paymentMethods = [
    {id: 'qris', label: 'QRIS'},
    {id: 'cash', label: 'Tunai'},
    {id: 'gojek', label: 'Gojek'},
    {id: 'gofood', label: 'GoFood'},
  ];

  return (
    <View style={styles.container}>
      {/* Kotak Total Harga */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>TOTAL</Text>
        <Text style={styles.totalPrice}>
          RP{' '}
          {selectedItems
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toLocaleString('id-ID')}
        </Text>
      </View>

      {/* Rincian Pesanan */}
      <FlatList
        data={selectedItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.menuItem}>
            <Image
              style={styles.image}
              source={ImagePlaceHolder} // Gambar kosong (placeholder)
            />
            <View style={styles.menuDetails}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuPrice}>
                Rp {item.price.toLocaleString('id-ID')}
              </Text>
            </View>
            <Text style={styles.quantityText}>{item.quantity}X</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada pesanan.</Text>
        }
      />

      {/* Metode Pembayaran */}
      <View style={styles.paymentMethods}>
        <Text style={styles.paymentTitle}>Metode Pembayaran</Text>
        <View style={styles.buttonContainer}>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentButton,
                selectedPaymentMethod === method.id && {
                  backgroundColor: 'green',
                },
              ]}
              onPress={() => setSelectedPaymentMethod(method.id)}>
              <Text
                style={[
                  styles.paymentButtonText,
                  selectedPaymentMethod === method.id && {
                    color: 'white',
                  },
                ]}>
                {method.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tombol Bayar */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={() => {
          if (!selectedPaymentMethod) {
            Alert.alert(
              'Perhatian',
              'Pilih metode pembayaran terlebih dahulu!',
            );
          } else {
            navigation.navigate('Calculator', {
              selectedPaymentMethod,
              selectedItems,
              totalPrice,
            });
          }
        }}>
        <Text style={styles.payButtonText}>Lanjut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 16},
  totalBox: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  totalPrice: {color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 10},
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginRight: 16,
  },
  menuDetails: {flex: 2},
  menuName: {fontSize: 16, color: '#333'},
  menuPrice: {fontSize: 14, color: '#4CAF50'},
  quantityText: {fontSize: 16, fontWeight: 'bold', color: '#333'},
  emptyText: {textAlign: 'center', color: '#999', marginTop: 20, fontSize: 16},
  paymentMethods: {marginTop: 20},
  paymentTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  paymentButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 5,
  },
  paymentButtonText: {color: '#000', textAlign: 'center', fontWeight: 'bold'},
  payButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});