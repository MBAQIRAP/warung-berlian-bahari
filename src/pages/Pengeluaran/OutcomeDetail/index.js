import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';

export default function OutcomeDetail({route}) {
  const {category} = route.params;
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    unit: '',
    price: '',
  });

  const handleAddItem = () => {
    if (editingItem) {
      setItems(prev =>
        prev.map(item =>
          item.id === editingItem.id ? {...editingItem, ...newItem} : item,
        ),
      );
      setEditingItem(null);
    } else {
      setItems(prev => [...prev, {...newItem, id: Date.now().toString()}]);
    }
    setNewItem({name: '', quantity: '', unit: '', price: ''});
    setModalVisible(false);
  };

  const handleDeleteItem = id => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price || 0) * parseFloat(item.quantity || 0),
    0,
  );

  return (
    <View style={styles.container}>
      {/* Header Box */}
      <View style={styles.headerBox}>
        <Text style={styles.header}>
          {category.name} - Total: {items.length} item
        </Text>
        <Text style={styles.totalPrice}>
          Total Harga: Rp {totalPrice.toLocaleString('id-ID')}
        </Text>
      </View>

      {/* Tabel Belanja */}
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.itemRow}>
            <View>
              <Text>{item.name}</Text>
              <Text>Jumlah: {item.quantity} {item.unit}</Text>
              <Text>Harga: Rp {item.price}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setEditingItem(item);
                  setNewItem(item);
                  setModalVisible(true);
                }}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteItem(item.id)}>
                <Text style={styles.deleteText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Tambah Item */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addText}>Tambah Item</Text>
      </TouchableOpacity>

      {/* Modal Form */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingItem ? 'Edit Data' : 'Tambah Data'}
            </Text>
            <TextInput
              placeholder="Nama Produk"
              value={newItem.name}
              onChangeText={text => setNewItem(prev => ({...prev, name: text}))}
              style={styles.input}
            />
            <TextInput
              placeholder="Jumlah"
              value={newItem.quantity}
              keyboardType="numeric"
              onChangeText={text =>
                setNewItem(prev => ({...prev, quantity: text}))
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Satuan (mis. kg, pcs)"
              value={newItem.unit}
              onChangeText={text => setNewItem(prev => ({...prev, unit: text}))}
              style={styles.input}
            />
            <TextInput
              placeholder="Harga"
              value={newItem.price}
              keyboardType="numeric"
              onChangeText={text =>
                setNewItem(prev => ({...prev, price: text}))
              }
              style={styles.input}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddItem}>
                <Text style={styles.saveText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  headerBox: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  header: {fontSize: 18, fontWeight: 'bold'},
  totalPrice: {fontSize: 16, color: '#333'},
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  actionButtons: {flexDirection: 'row'},
  editButton: {backgroundColor: '#FFEB3B', padding: 5, borderRadius: 5},
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 5,
    marginLeft: 10,
    borderRadius: 5,
  },
  editText: {color: '#000'},
  deleteText: {color: '#fff'},
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  addText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    padding: 5,
  },
  buttonRow: {flexDirection: 'row', justifyContent: 'space-between'},
  cancelButton: {backgroundColor: '#F44336', padding: 10, borderRadius: 5},
  saveButton: {backgroundColor: '#4CAF50', padding: 10, borderRadius: 5},
  cancelText: {color: '#fff', textAlign: 'center'},
  saveText: {color: '#fff', textAlign: 'center'},
});
