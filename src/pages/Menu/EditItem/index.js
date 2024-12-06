import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ImageCropPicker from 'react-native-image-crop-picker';

export default function EditItem({route, navigation}) {
  const {item, updateItem} = route.params;
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price.toString());
  const [category, setCategory] = useState(item.category);
  const [image, setImage] = useState(null);

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

  const handleSave = () => {
    if (!name.trim() || !price.trim() || !category.trim()) {
      Alert.alert('Error', 'Semua field wajib diisi!');
      return;
    }

    if (isNaN(price) || parseInt(price, 10) <= 0) {
      Alert.alert('Error', 'Harga harus berupa angka positif!');
      return;
    }

    const updatedItem = {
      ...item,
      name,
      price: parseInt(price, 10),
      category,
    };

    updateItem(updatedItem);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.label}>Kategori</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Masukkan kategori"
      />

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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});
