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
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {AntDesign} from 'react-native-vector-icons';
// import { MaterialIcons } from "@expo/vector-icons";
// import { Octicons } from "@expo/vector-icons";
import User from 'react-native-vector-icons/AntDesign';
import Key from 'react-native-vector-icons/Octicons';

const Login = ({navigation}) => {
  const {colors} = useTheme();
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
                  textContentType="username"
                  style={[styles.textInput, {color: 'white'}]}
                  placeholder="Username"
                  placeholderTextColor={colors.placeholder}
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
                  placeholderTextColor={colors.placeholder}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.replace('Home')}>
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
