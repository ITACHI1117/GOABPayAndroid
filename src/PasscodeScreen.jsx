import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';
import ReactNativePinView from 'react-native-pin-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cancel from 'react-native-vector-icons/Foundation';
import Enter from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const PasscodeScreen = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [showCompletedButton, setShowCompletedButton] = useState(false);
  const [userHasPasscode, setUserHasPasscode] = useState();

  useEffect(() => {
    if (enteredPin.length > 0) {
      setShowRemoveButton(true);
    } else {
      setShowRemoveButton(false);
    }
    if (enteredPin.length === 4) {
      setShowCompletedButton(true);
    } else {
      setShowCompletedButton(false);
    }
  }, [enteredPin]);
  //   console.log(enteredPin);

  //   Check if user HAS SET A PASSCODE
  const checkPasscode = async () => {
    try {
      const checkStoredPasscode = await AsyncStorage.getItem('passcode');
      checkStoredPasscode != undefined
        ? setUserHasPasscode(true)
        : setUserHasPasscode(false);
    } catch (error) {
      console.error('Error retrieving passcode:', error);
    }
  };

  checkPasscode();

  // delete stored passcode
  //   const removePasscode = async () => {
  //     try {
  //       await AsyncStorage.removeItem('passcode');
  //       console.log('Passcode removed successfully');
  //     } catch (error) {
  //       console.error('Error removing passcode:', error);
  //     }
  //   };

  //   removePasscode();

  // Store Passcode
  const storePasscode = async () => {
    try {
      await AsyncStorage.setItem('passcode', enteredPin);
      // Navigate to protected screens
      console.log('saved');
      //   navigation.navigate('Home');
    } catch (error) {
      console.error('Error storing passcode:', error);
    }
  };

  //   Get stored Passcode
  const authenticatePasscode = async () => {
    try {
      const storedPasscode = await AsyncStorage.getItem('passcode');
      if (enteredPin === storedPasscode) {
        // Navigate to protected screens
        navigation.replace('Home');
      } else {
        alert('Incorrect passcode!');
      }
    } catch (error) {
      console.error('Error retrieving passcode:', error);
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          // backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            paddingTop: 24,
            paddingBottom: 48,
            color: 'rgba(255,255,255,0.7)',
            fontSize: 50,
          }}>
          {userHasPasscode ? (
            <Text style={{color: colors.text}}>Welcome</Text>
          ) : (
            <Text style={{color: colors.text}}>Create Passcode</Text>
          )}
          {/* GoabPay */}
        </Text>
        <ReactNativePinView
          inputSize={20}
          ref={pinView}
          pinLength={4}
          buttonSize={60}
          onValueChange={value => setEnteredPin(value)}
          buttonAreaStyle={{
            marginTop: 29,
          }}
          inputAreaStyle={{
            marginBottom: 24,
          }}
          inputViewEmptyStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.text,
          }}
          inputViewFilledStyle={{
            backgroundColor: '#6E34B8',
          }}
          buttonViewStyle={{
            // borderWidth: 1,
            borderColor: colors.text,
          }}
          buttonTextStyle={{
            fontSize: 30,
            color: colors.text,
          }}
          onButtonPress={key => {
            if (key === 'custom_left') {
              pinView.current.clear();
            }
            if (key === 'custom_right') {
              // alert('Welocm: ' + enteredPin);
              userHasPasscode ? authenticatePasscode() : storePasscode();
              pinView.current.clearAll();
            }
            // if (key === 'three') {

            //   alert('You just click to 3');
            // }
            // if (key === 'one') {
            //   alert('You just click to 1');
            // }
          }}
          customLeftButton={
            showRemoveButton ? (
              <Cancel
                name="x-circle"
                size={29}
                color="#6E34B8"
                style={{position: 'absolute', zIndex: 1, left: 30, top: 23}}
              />
            ) : //   <Text>X</Text>
            //   <Icon name={'ios-backspace'} size={36} color={'#FFF'} />
            undefined
          }
          customRightButton={
            showCompletedButton ? (
              <Enter
                name="arrow-right-circle"
                size={29}
                color="#6E34B8"
                style={{position: 'absolute', zIndex: 1, left: 20, top: 23}}
              />
            ) : //   <Icon name={'ios-unlock'} size={36} color={'#FFF'} />
            undefined
          }
        />
      </SafeAreaView>
    </>
  );
};
export default PasscodeScreen;
