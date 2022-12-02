import React, { useEffect, useState } from 'react';
import Routes from './vistas/Routes';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

const Stack = createStackNavigator();

const App = () => {
  const [tokenStorage, setTokenStorage] = useState('');

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setTokenStorage(token);
  };

  useEffect(() =>{
      getToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={tokenStorage? "Home" : "LogIn"}>
        <Stack.Screen
          name="LogIn"
          component={Routes.ViewLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={Routes.ViewRegister}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GetStarted"
          component={Routes.ViewStarter}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Routes.ViewListTasks}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateTask"
          component={Routes.CreateTask}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditTask"
          component={Routes.EditTask}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TakePhoto"
          component={Routes.TakePhoto}
          options={{headerShown: false}}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;