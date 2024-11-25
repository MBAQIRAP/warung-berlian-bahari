import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Alert } from 'react-native';
import { ImagePlaceHolder } from '../../../assets';

export default function Transaksi({navigation}) {
  const [menuItems, setMenuItems] = useState([
    {id: 1, name: 'Es Teh', price: 5000, category: 'Minuman', quantity: 0},
    {id: 2, name: 'Es Jeruk', price: 7000, category: 'Minuman', quantity: 0},
    {
      id: 3,
      name: 'Nutrisari Mangga',
      price: 8000,
      category: 'Minuman',
      quantity: 0,
    },
    {
      id: 4,
      name: 'Ayam Goreng',
      price: 15000,
      category: 'Makanan',
      quantity: 0,
    },
    {
      id: 5,
      name: 'Sayur Kentang',
      price: 10000,
      category: 'Makanan',
      quantity: 0,
    },
    {
      id: 6,
      name: 'Ikan Goreng',
      price: 20000,
      category: 'Makanan',
      quantity: 0,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Filter berdasarkan kategori
  const filterByCategory = category => {
    setSelectedCategory(category);
    const filtered =
      category === 'Semua'
        ? menuItems
        : menuItems.filter(item => item.category === category);
    setFilteredItems(filtered);
  };

  // Filter berdasarkan pencarian
  const handleSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      filterByCategory(selectedCategory); // Tetap filter berdasarkan kategori
    } else {
      const filtered = filteredItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredItems(filtered);
    }
  };

  // Update jumlah pesanan
  const updateQuantity = (index, type) => {
    const updatedItems = [...menuItems];
    if (type === 'increase') {
      updatedItems[index].quantity += 1;
    } else if (type === 'decrease' && updatedItems[index].quantity > 0) {
      updatedItems[index].quantity -= 1;
    }
    setMenuItems(updatedItems);
    filterByCategory(selectedCategory);
  };

  // Reset transaksi
  const resetTransaction = () => {
    const resetItems = menuItems.map(item => ({...item, quantity: 0}));
    setMenuItems(resetItems);
    filterByCategory('Semua');
    setFilteredItems(resetItems);
  };

  // Hitung total harga
  const calculateTotal = () => {
    return menuItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <View style={styles.container}>
      {/* Input Pencarian */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari menu..."
        value={searchQuery}
        onChangeText={text => handleSearch(text)}
      />

      {/* Tombol Kategori */}
      <View style={styles.categoryContainer}>
        {['Semua', 'Makanan', 'Minuman'].map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategory,
            ]}
            onPress={() => filterByCategory(category)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.activeCategoryText,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Daftar Menu */}
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
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
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(index, 'decrease')}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityCount}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(index, 'increase')}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Menu tidak ditemukan.</Text>
        }
      />

      {/* Tombol Bayar dan Reset */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetTransaction}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            const selectedItems = menuItems.filter(item => item.quantity > 0); // Filter langsung item dengan quantity > 0
            if (selectedItems.length === 0) {
              Alert.alert('Perhatian', 'Pilih menu terlebih dahulu!');
            } else {
              navigation.navigate('PaymentMethod', {
                totalPrice: calculateTotal(),
                selectedItems, // Kirim selectedItems ke halaman berikutnya
              });
            }
          }}>
          <Text style={styles.buttonText}>
            Bayar (Rp {calculateTotal().toLocaleString('id-ID')})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  activeCategory: {
    backgroundColor: 'green',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  activeCategoryText: {
    color: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    elevation: 1,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginRight: 16,
  },
  menuDetails: {
    flex: 2,
  },
  menuName: {
    fontSize: 16,
    color: '#333',
  },
  menuPrice: {
    fontSize: 14,
    color: '#4CAF50',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityCount: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  payButton: {
    flex: 1,
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 5,
  },
  resetButton: {
    flex: 1,
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 16,
  },
});