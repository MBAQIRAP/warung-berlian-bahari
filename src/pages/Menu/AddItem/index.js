import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';

export default function AddItem({navigation, route}) {
  const {addItem} = route.params;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  // Pilih gambar dari galeri
  const pickImageFromGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(error => {
        console.log('Error picking image: ', error.message);
      });
  };

  // Ambil gambar dari kamera
  const pickImageFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(error => {
        console.log('Error taking photo: ', error.message);
      });
  };

  // Simpan item baru
  const handleSave = () => {
    if (!name || !price || !category) {
      Alert.alert('Peringatan', 'Semua data wajib diisi!');
      return;
    }

    const newItem = {
      id: Date.now(), // ID unik berdasarkan timestamp
      name,
      price: parseInt(price, 10),
      category,
      image,
      quantity: 0, // Default quantity
    };

    addItem(newItem);
    Alert.alert('Sukses', 'Menu berhasil ditambahkan!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Input Nama */}
      <Text style={styles.label}>Nama Menu</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Masukkan nama menu"
      />

      <Text style={styles.label}>Harga</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Masukkan harga"
        keyboardType="numeric"
      />

      {/* Input Kategori */}
      <Text style={styles.label}>Kategori</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Masukkan kategori"
      />

      {/* Upload Gambar */}
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={pickImageFromGallery}>
          <Text style={styles.imageButtonText}>Pilih Gambar dari Galeri</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={pickImageFromCamera}>
          <Text style={styles.imageButtonText}>Ambil Gambar dari Kamera</Text>
        </TouchableOpacity>
      </View>

      {image && <Image source={{uri: image}} style={styles.imagePreview} />}

      {/* Tombol Simpan */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Simpan</Text>
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
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
