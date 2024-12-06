import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';

export default function IncomeList() {
  const navigation = useNavigation();

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filterMethod, setFilterMethod] = useState('Semua');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const storedTransactions =
        JSON.parse(await AsyncStorage.getItem('transactions')) || [];
      setTransactions(storedTransactions);
      setFilteredTransactions(storedTransactions);
    };
    fetchTransactions();
  }, []);

  const applyFilters = () => {
    let filtered = transactions;

    // Filter by date range
    filtered = filtered.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

    // Filter by payment method
    if (filterMethod !== 'Semua') {
      filtered = filtered.filter(
        transaction => transaction.paymentMethod === filterMethod,
      );
    }

    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [startDate, endDate, filterMethod]);

  return (
    <View style={styles.container}>
      {/* Picker untuk tanggal */}
      <View style={styles.datePickers}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowStartPicker(true)}>
          <Text style={styles.dateText}>
            Dari: {startDate.toLocaleDateString('id-ID')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowEndPicker(true)}>
          <Text style={styles.dateText}>
            Sampai: {endDate.toLocaleDateString('id-ID')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal DateTimePicker */}
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}

      {/* Filter Metode Pembayaran */}
      <View style={styles.filterRow}>
        <Text style={styles.transactionCount}>
          Jumlah Transaksi: {filteredTransactions.length}
        </Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
          <Text style={styles.dropdownText}>Metode: {filterMethod}</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Modal */}
      {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          {['Semua', 'Tunai', 'QRIS', 'Gojek', 'GoFood'].map(method => (
            <TouchableOpacity
              key={method}
              style={styles.dropdownItem}
              onPress={() => {
                setFilterMethod(method);
                setIsDropdownVisible(false);
              }}>
              <Text>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Daftar Transaksi */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.transactionItem}
            onPress={() =>
              navigation.navigate('TransactionDetail', {transaction: item})
            }>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionText}>
                Rp {item.totalPrice.toLocaleString('id-ID')}
              </Text>
              <Text style={styles.transactionText}>{item.paymentMethod}</Text>
            </View>
            <Text style={styles.transactionTime}>
              {new Date(item.date).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada pemasukan</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 16},
  datePickers: {flexDirection: 'row', justifyContent: 'space-between'},
  dateButton: {padding: 10, backgroundColor: '#4CAF50', borderRadius: 8},

  dateText: {fontSize: 16, color: '#fff'},
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  transactionCount: {fontSize: 16, fontWeight: 'bold'},
  dropdown: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  dropdownText: {fontSize: 16, color: '#333'},
  dropdownMenu: {
    position: 'absolute',
    top: 80,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    zIndex: 10,
    padding: 10,
  },
  dropdownItem: {
    padding: 8,
  },
  transactionItem: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {flex: 1},
  transactionText: {fontSize: 16, color: '#333'},
  transactionTime: {fontSize: 14, color: '#777'},
  emptyText: {textAlign: 'center', marginTop: 20, color: '#999'},
});
