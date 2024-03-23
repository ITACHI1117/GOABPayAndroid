import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {AntDesign} from 'react-native-vector-icons';
import DataContext from './context/DataContext';
// import { MaterialIcons } from "@expo/vector-icons";
// import { Octicons } from "@expo/vector-icons";
import User from 'react-native-vector-icons/AntDesign';
import Key from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const {
    email,
    password,
    loginError,
    LoginLoading,
    allUsers,
    signIn,
    signed,
    setEmail,
    setPassword,
    loggedInUser,
  } = useContext(DataContext);

  const {colors} = useTheme();

  const handleEmailChange = text => {
    setEmail(text);
  };
  const handlePasswordChange = text => {
    setPassword(text);
  };

  const [loginUserId, setLoginInUserId] = useState();
  const [retrivedEmail, setRetrivedEmail] = useState('');

  useEffect(() => {
    let userEmail = email;
    if (allUsers === undefined) {
      return;
    } else {
      allUsers.map(({email, id}) => {
        if (userEmail === email) {
          setLoginInUserId(id);
        }
        return null;
      });
    }
  }, [allUsers, signIn, email]);

  // Store Email function
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data stored successfully!');
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  // Stroing Email value and then redirecting
  async function redirect() {
    await signed;
    storeData('email', email);
    setTimeout(() => {
      // 👇 Redirects to Home Screen
      navigation.navigate('Home');
    });
  }

  if (signed === true) {
    redirect();
  }

  const retrieveData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setRetrivedEmail(value);
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
  retrieveData('email');
  // // Removing the stored
  // const removeData = async key => {
  //   try {
  //     await AsyncStorage.removeItem(key);
  //     console.log('Data removed successfully!');
  //   } catch (error) {
  //     console.error('Error removing data:', error);
  //   }
  // };
  // setTimeout(() => {
  //   removeData('email');
  // }, 9000);

  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          enabled={true}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          // style={{ flex: 1, width: "100%" }}
        >
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              height: '100%',
            }}>
            <Text
              style={{
                paddingTop: 70,
                fontSize: 35,
                fontWeight: 500,
                color: '#2F1155',
                paddingBottom: 20,
                width: '90%',
                textAlign: 'center',
              }}>
              Welcome Back {'\n'} to GOAB Pay Wallet
            </Text>

            <Text
              style={{
                paddingTop: 30,
                fontSize: 15,
                fontWeight: 500,
                color: '#2F1155',
                paddingBottom: 20,
              }}>
              Login with
            </Text>
            <View
              style={{
                paddingTop: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                // height: 100,
                width: '98%',
              }}>
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
                  textContentType="emailAddress"
                  style={[styles.textInput, {color: 'white'}]}
                  placeholder="Email"
                  value={retrivedEmail !== '' ? retrivedEmail : email}
                  onChangeText={handleEmailChange}
                  placeholderTextColor={colors.placeholder}
                  color={colors.text}
                />
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'co',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: 100,
                  width: '98%',
                }}>
                <Key
                  name="key"
                  size={24}
                  color="#6E34B8"
                  style={{position: 'absolute', zIndex: 1, left: 30, top: 23}}
                />
                <TextInput
                  textContentType="password"
                  style={[styles.textInput, {color: 'white'}]}
                  placeholder="Password"
                  value={password}
                  secureTextEntry={true}
                  required
                  placeholderTextColor={colors.placeholder}
                  onChangeText={handlePasswordChange}
                  color={colors.text}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={() => signIn()}>
                <Text style={{color: 'white', fontSize: 22}}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{paddingTop: 20}}
                onPress={() => navigation.navigate('SignIn')}>
                <Text
                  style={{color: '#959598', fontSize: 15, paddingBottom: 20}}>
                  Don't have an account yet?
                  <Text style={{color: '#2DA6FF'}}> Register</Text>
                </Text>
              </TouchableOpacity>
              <Text>{loginError}</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;
const styles = StyleSheet.create({
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
    width: '50%',
    height: 70,
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: '#6E34B8',
    color: 'white',
  },
});
