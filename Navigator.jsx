import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@react-navigation/native';
import {Appearance, StatusBar} from 'react-native';
// import Plan from './screens/Onboarding_Screens/Plan';
import SignIn from './src/SignUp';
import Login from './src/Login';
import Home from './src/Home';
import PasscodeScreen from './src/PasscodeScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CreateAccount from './screens/Registration/CreateAccount';
// import ResetPassword from './screens/Registration/ResetPassword';
// import Confirmation from './screens/Registration/Confirmation';
// import NewPassword from './screens/Registration/NewPassword';
// import Home from './screens/Home/Home';
// import Profile from './screens/Profile/Profile';
// import EditProfile from './screens/Profile/EditProfile';
// import Tour from './screens/Home/Tour';

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  // Getting the device default color mode
  const [colorScheme, setColorScheme] = React.useState(
    Appearance.getColorScheme(),
  );

  React.useEffect(() => {
    Appearance.addChangeListener(({colorScheme}) =>
      setColorScheme(colorScheme),
    );
  }, []);

  // const [firstLaunch, setFirstLaunch] = React.useState(null);
  // React.useEffect(() => {
  //   async function setData() {
  //     const appData = await AsyncStorage.getItem("appLaunched");
  //     if (appData == null) {
  //       setFirstLaunch(true);
  //       AsyncStorage.setItem("appLaunched", "false");
  //     } else {
  //       setFirstLaunch(false);
  //     }
  //   }
  //   setData();
  // }, []);
  const dark = {
    dark: true,
    colors: {
      primary: 'green',
      background: 'black',
      card: 'black',
      text: 'white',
      border: 'blue',
      notification: 'green',
      placeholder: '#959598',
      shadowColor: '#0094FF',
    },
  };
  const light = {
    dark: false,
    colors: {
      primary: 'blue',
      background: 'white',
      card: 'green',
      text: 'black',
      border: 'blue',
      notification: 'green',
      placeholder: '#959598',
      shadowColor: '#171717',
    },
  };

  const {colors} = useTheme();
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? dark : light}>
      <StatusBar animated={true} barStyle="white" />
      <Stack.Navigator>
        {/* {firstLaunch && (
            <Stack.Screen
              name="Plan"
              component={Plan}
              options={{ title: null, headerShown: false }}
            />
          )} */}
        <Stack.Screen
          name="PasscodeScreen"
          component={PasscodeScreen}
          options={{title: null, headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: null, headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: null, headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: null, headerShown: false}}
        />

        {/* <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ title: null, headerShown: false }}
          />
          <Stack.Screen
            name="Confirmation"
            component={Confirmation}
            options={{ title: null, headerShown: false }}
          />
          <Stack.Screen
            name="NewPassword"
            component={NewPassword}
            options={{ title: null, headerShown: false }}
          />
         
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: null, headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ title: null, headerShown: false }}
          />
          <Stack.Screen
            name="Tour"
            component={Tour}
            options={{ title: null, headerShown: false }}
          /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
