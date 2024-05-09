import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import 'react-native-get-random-values';
import {FlutterwaveInit} from 'flutterwave-react-native';
import WebViewModal from './WebViewModal';
// Pre-step, call this before any NFC operations
NfcManager.start();

function Home() {
  const [ismodalVisible, setIsModalVisible] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);
  const [ammount, setAmmount] = useState(null);

  const handleAmmountChange = text => {
    setAmmount(text);
  };

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

  const handlePaymentInitiation = async () => {
    try {
      // initialize payment
      const Link = await FlutterwaveInit({
        tx_ref: generateTransactionReference(20),
        authorization: 'FLWPUBK_TEST-0f6335aff300d743e2c864258d738c41-X',
        customer: {
          email: 'ajogujoseph0317@gmail.com',
          phonenumber: '08146821934',
          name: 'Joseph Ajogu',
        },
        amount: 1000,
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

  const handleOnRedirect = data => {
    console.log(data);
  };

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
      <Button title="Open Modal" onPress={handlePaymentInitiation} />

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
});

export default Home;
