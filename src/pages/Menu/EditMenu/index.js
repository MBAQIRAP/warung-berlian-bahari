import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {ImagePlaceHolder} from '../../../assets'; // Placeholder untuk gambar

export default function EditMenu({navigation}) {
  const [menuItems, setMenuItems] = useState([
    {id: 1, name: 'Es Teh', price: 5000, category: 'Minuman'},
    {id: 2, name: 'Es Jeruk', price: 7000, category: 'Minuman'},
    {id: 3, name: 'Nutrisari Mangga', price: 8000, category: 'Minuman'},
    {id: 4, name: 'Ayam Goreng', price: 15000, category: 'Makanan'},
    {id: 5, name: 'Sayur Kentang', price: 10000, category: 'Makanan'},
    {id: 6, name: 'Kerupuk Udang', price: 2000, category: 'Lain-lain'},
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [filteredItems, setFilteredItems] = useState(menuItems);

  const updateMenu = newItem => {
    setMenuItems(prevItems => [...prevItems, newItem]);
    setFilteredItems(prevItems => [...prevItems, newItem]);
  };

  const updateItem = updatedItem => {
    setMenuItems(prevItems =>
      prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item)),
    );
    setFilteredItems(prevItems =>
      prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

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
    const filtered = menuItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredItems(
      selectedCategory === 'Semua'
        ? filtered
        : filtered.filter(item => item.category === selectedCategory),
    );
  };

  // Hapus Item
  const deleteItem = itemId => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menghapus item ini?',
      [
        {text: 'Batal', style: 'cancel'},
        {
          text: 'Hapus',
          onPress: () => {
            const updatedItems = menuItems.filter(item => item.id !== itemId);
            setMenuItems(updatedItems);
            setFilteredItems(updatedItems);
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari menu..."
        value={searchQuery}
        onChangeText={text => handleSearch(text)}
      />

      {/* Filter Kategori */}
      <View style={styles.categoryContainer}>
        {['Semua', 'Makanan', 'Minuman', 'Lain-lain'].map(category => (
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
        renderItem={({item}) => (
          <View style={styles.menuItem}>
            <Image style={styles.image} source={ImagePlaceHolder} />
            <View style={styles.menuDetails}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuPrice}>
                Rp {item.price.toLocaleString('id-ID')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                navigation.navigate('EditItem', {
                  item , // Data item yang akan diedit
                  updateItem,
                })
              }>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteItem(item.id)}>
              <Text style={styles.buttonText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Menu tidak ditemukan.</Text>
        }
      />

      {/* Tombol Tambah Menu */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('AddItem', {
            addItem: newItem => {
              setMenuItems(prevItems => [...prevItems, newItem]);
              setFilteredItems(prevItems => [...prevItems, newItem]);
            },
          })
        }>
        <Text style={styles.addButtonText}>Tambah Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
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
    flex: 1,
  },
  menuName: {
    fontSize: 16,
    color: '#333',
  },
  menuPrice: {
    fontSize: 14,
    color: '#4CAF50',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
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
