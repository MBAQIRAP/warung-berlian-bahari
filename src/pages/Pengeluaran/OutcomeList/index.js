import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function OutcomeList({ navigation }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [activeDate, setActiveDate] = useState('start'); // 'start' or 'end'

  const categories = [
    { id: '1', name: 'Belanja Pasar', items: 5, total: 50000 },
    { id: '2', name: 'Belanja Sembako', items: 3, total: 75000 },
    { id: '3', name: 'Biaya Tetap', items: 2, total: 120000 },
    { id: '4', name: 'Belanja Lain-Lain', items: 6, total: 40000 },
  ];

  const showDatePicker = (type) => {
    setActiveDate(type);
    setDatePickerVisibility(true);
  };

  const handleDateConfirm = (selectedDate) => {
    if (activeDate === 'start') {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      {/* Rentang Tanggal */}
      <View style={styles.dateRangeContainer}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => showDatePicker('start')}>
          <Text style={styles.dateText}>Dari: {startDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => showDatePicker('end')}>
          <Text style={styles.dateText}>Sampai: {endDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>

      {/* Nominal Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Pengeluaran:</Text>
        <Text style={styles.totalValue}>Rp 285,000</Text>
      </View>

      {/* Kategori Pengeluaran */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <View>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text>{item.items} item - Rp {item.total.toLocaleString('id-ID')}</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                navigation.navigate('OutcomeDetail', { category: item })
              }>
              <Text style={styles.addButtonText}>Tambah</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  dateRangeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  dateButton: { padding: 10, backgroundColor: '#4CAF50', borderRadius: 8 },
  dateText: { color: '#fff', fontWeight: 'bold' },
  totalContainer: { alignItems: 'center', marginBottom: 16 },
  totalLabel: { fontSize: 16, fontWeight: 'bold' },
  totalValue: { fontSize: 24, color: '#4CAF50', fontWeight: 'bold' },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryName: { fontSize: 18, fontWeight: 'bold' },
  addButton: { backgroundColor: '#2196F3', padding: 8, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
});
