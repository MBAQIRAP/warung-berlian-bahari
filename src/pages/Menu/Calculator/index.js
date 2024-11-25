import {React,useState} from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Pressable,
    Alert,
    Modal,
    TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const Calculator = ({route,navigation}) => {
    const {totalPrice, selectedPaymentMethod, selectedItems} = route.params || {totalPrice: 0}; // Data total harga dari navigasi
    const [inputValue, setInputValue] = useState(''); // Input uang pelanggan

    const handleInput = value => {
        if (value === 'backspace') {
          setInputValue(inputValue.slice(0, -1)); // Hapus karakter terakhir
        } else {
          setInputValue(inputValue + value); // Tambah angka ke input
        }
        if (value === 'C') {
          setInputValue('');
          return;
        }
    };

    // Fungsi untuk shortcut uang pecahan
    const handleShortcut = value => {
        setInputValue(value.toString());
    };

    // Fungsi untuk tombol uang pas
    const handleExactAmount = () => {
        setInputValue(totalPrice.toString());
    };

    return(
        <View style={styles.container}>
        {/* Total Harga */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Harga</Text>
          <Text style={styles.totalValue}>
            Rp {totalPrice.toLocaleString('id-ID')}
          </Text>
        </View>
  
        {/* Tampilan Input */}
        <TextInput
          style={styles.inputDisplay}
          value={inputValue}
          editable={false}
          placeholder="0"
        />
  
        {/* Tombol Angka */}
        <View style={styles.buttonGrid}>
          {[
            '7',
            '8',
            '9',
            '4',
            '5',
            '6',
            '1',
            '2',
            '3',
            'C',
            '0',
            'backspace',
          ].map(value => (
            <TouchableOpacity
              key={value}
              style={styles.numberButton}
              onPress={() => handleInput(value)}>
              <Text style={styles.numberText}>
                {value === 'backspace' ? '⌫' : value}
                {value === 'C' }
              </Text>
            </TouchableOpacity>
          ))}
        </View>
  
        {/* Shortcut Pecahan */}
        <View style={styles.shortcutContainer}>
          {[10000, 20000, 50000].map(amount => (
            <TouchableOpacity
              key={amount}
              style={styles.shortcutButton}
              onPress={() => handleShortcut(amount)}>
              <Text style={styles.shortcutText}>
                Rp {amount.toLocaleString('id-ID')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
  
        {/* Tombol Uang Pas dan Bayar */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.exactButton}
            onPress={handleExactAmount}>
            <Text style={styles.actionText}>Uang Pas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => {
              if (parseFloat(inputValue) < totalPrice) {
                Alert.alert('Perhatian', 'Uang yang diberikan kurang!');
              }else if(!parseFloat(inputValue)){
                Alert.alert('Perhatian','Tolong isikan nilai uang yang diberikan pelanggan' );
              } else {
                const change = parseFloat(inputValue) - totalPrice;
                navigation.navigate('Receipt', {
                  totalPrice,
                  paidAmount: parseFloat(inputValue),
                  change,
                  paymentMethod: selectedPaymentMethod,
                  selectedPaymentMethod,
                  items: selectedItems,
                });
              }
            }}>
            <Text style={styles.actionText}>Bayar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff', padding: 16},
    totalBox: {alignItems: 'center', marginBottom: 20},
    totalLabel: {fontSize: 25, fontWeight: 'bold', color: '#000'},
    totalValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#4CAF50',
      marginTop: 5,
    },
    inputDisplay: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 10,
      fontSize: 24,
      color: '#000',
      textAlign: 'right',
      marginBottom: 20,
    },
    buttonGrid: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    numberButton: {
      backgroundColor: '#f1f1f1',
      width: '30%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderRadius: 8,
    },
    numberText: {fontSize: 24, fontWeight: 'bold', color: '#333'},
    shortcutContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    shortcutButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 8,
    },
    shortcutText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    exactButton: {
      backgroundColor: '#2196F3',
      flex: 1,
      padding: 15,
      marginRight: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    payButton: {
      backgroundColor: 'green',
      flex: 1,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    actionText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  });

export default Calculator