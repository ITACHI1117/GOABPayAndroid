import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import 'react-native-get-random-values';
import {FlutterwaveInit} from 'flutterwave-react-native';
import WebViewModal from './WebViewModal';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from 'react-native-vector-icons/AntDesign';
import {database} from '../firebaseconfig';
import {
  ref,
  child,
  get,
  serverTimestamp,
  set,
  push,
  onDisconnect,
  onValue,
} from 'firebase/database';
import {useTheme} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';

// Pre-step, call this before any NFC operations
NfcManager.start();

function Home({route}) {
  const {colors} = useTheme();

  const navigation = useNavigation();
  const [ismodalVisible, setIsModalVisible] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState();
  const [userDetails, setUserDetails] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [amount, setAmount] = useState('');

  const handelAmountChange = text => {
    setAmount(text);
  };

  // get user from Login
  useEffect(() => {
    const retrieveData = async key => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setUserDetails(JSON.parse(value));
          // console.log('Data Retrived');

          return value;
        } else {
          console.log('No data found for key:', key);
          return null;
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
      }
    };
    retrieveData('signed');
  }, []);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Generating random text reference
  const generateTransactionReference = length => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // const generateTransactionReference = () => {
  //   const txRef = uuidv4();
  //   return txRef;
  // };

  // const txRef = generateTransactionReference();

  // const handlePaymentInitiation = async () => {
  //   try {
  //     // initialize payment
  //     const Link = await FlutterwaveInit(paymentDetails);

  //     // Set the payment link in state
  //     setPaymentLink(Link);
  //     console.log(Link);
  //   } catch (error) {
  //     console.error('Error initializing payment:', error);
  //   }
  //   openModal();
  // };

  const handleOnRedirect = data => {
    console.log(data);
  };

  useEffect(() => {
    if (userDetails && userDetails.uid) {
      const dbRef = ref(database);
      get(child(dbRef, `users/` + userDetails.uid))
        .then(snapshot => {
          if (snapshot.exists()) {
            setCurrentUser(Object.values(snapshot.val()));
            //   console.log(allUsers);
          } else {
            console.log('No data available');
          }
        })
        .catch(error => {
          console.error(error);
          setLoadError(error);
        });
    }
  }, [database, userDetails]);

  async function readNdef() {
    // Inside your component
    ToastAndroid.show('Scan Tag!!', ToastAndroid.LONG);
    try {
      // Register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // The resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      ToastAndroid.show('Tag Found', ToastAndroid.LONG);

      // Check if the tag contains NDEF message
      if (tag.ndefMessage) {
        // Log the NDEF message
        // console.log('NDEF Message:', tag.ndefMessage);

        // Get the payload array from the first record
        const payloadArray = tag.ndefMessage[0].payload;

        // Convert the payload array to Uint8Array
        const uint8Array = new Uint8Array(payloadArray);

        // Convert the payload array to a string assuming UTF-8 encoding
        const text = String.fromCharCode.apply(null, uint8Array);

        setPaymentDetails(text);

        console.log(text);

        // get user information

        console.log(currentUser);

        const handlePaymentInitiation = async () => {
          try {
            // initialize payment
            const Link = await FlutterwaveInit({
              tx_ref: generateTransactionReference(20),
              authorization: text,
              customer: {
                email: userDetails.email,
                phonenumber: currentUser[4],
                name: `${currentUser[1]} ${currentUser[3]} `,
              },
              amount: amount,
              currency: 'NGN',
              payment_options: 'card',
              redirect_url: 'https://example.com/',
            });

            // Set the payment link in state
            setPaymentLink(Link);
            console.log(Link);
          } catch (error) {
            console.error('Error initializing payment:', error);
          }
          openModal();
        };

        handlePaymentInitiation();

        // Process the NDEF message as needed
        // For example, you can extract and decode records from the NDEF message
      } else {
        console.warn('Tag does not contain NDEF message');
      }
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // Stop the NFC scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 100,
          width: '98%',
        }}>
        <User
          name="user"
          size={24}
          color="#6E34B8"
          style={{position: 'absolute', zIndex: 1, left: 30, top: 23}}
        />
        <TextInput
          keyboardType="numeric"
          style={[styles.textInput, {color: 'black'}]}
          placeholder="Amount"
          onChangeText={handelAmountChange}
          placeholderTextColor={colors.placeholder}
        />
      </View>
      {amount == '' || amount < 100 ? (
        <TouchableOpacity
          disabled
          onPress={readNdef}
          style={[styles.button, {opacity: 0.5}]}>
          <Text>Scan a Tag</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={readNdef} style={styles.button}>
          <Text>Scan a Tag</Text>
        </TouchableOpacity>
      )}

      {/* <Button title="Open Modal" onPress={handlePaymentInitiation} /> */}

      {/* Modal component */}
      <WebViewModal
        url={paymentLink}
        onClose={closeModal}
        visible={ismodalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  textInput: {
    backgroundColor: '#EDF0F7',
    width: '90%',
    height: 60,
    padding: 10,
    paddingLeft: 45,
    fontSize: 14,
    marginTop: 5,
    borderRadius: 15,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 50,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: '#6E34B8',
    color: 'white',
  },
});

export default Home;
