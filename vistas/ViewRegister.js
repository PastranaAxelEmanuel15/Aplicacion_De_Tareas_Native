import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Boton} from '../components/Boton';
import {Elipse} from '../components/Elipse';
import {styles} from '../components/styles';
import t from '../services/translate';
import Form from '../components/Form';
import { SignIn } from '../services/api';

function ViewRegister({navigation}){
    const [Name, setName] = useState();
    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [Confirm, setConfirm] = useState();

    return(
      <KeyboardAvoidingView style={styles.container} enabled="false" behavior="height" >
      <Elipse />
      <Text style={styles.title}>Welcome OnBoard!</Text>
      <Text style={styles.txt}>Lets Help you meet up tasks.</Text>
      <View style={styles.separador40} />
      <Form placehold={t('register.inputName')} onChangeText={setName} />
      <View style={styles.separador} />
      <Form
        type={'email'}
        placehold={t('register.inputEmail')}
        onChangeText={setEmail}
      />
      <View style={styles.separador} />
      <Form
        type={'password'}
        placehold={t('register.inputPassword')}
        onChangeText={setPassword}
      />
      <View style={styles.separador} />
      <Form
        type={'password'}
        placehold={t('register.inputConfirm')}
        onChangeText={setConfirm}
      />
      <View style={styles.separador40} />
      <Boton
        title={'Register'}
        onPress={() =>
          SignIn({
            Name: Name,
            Email: Email,
            Password: Password,
            Confirm: Confirm,
            navigation: navigation,
          })
        }
      />
      <View style={styles.separador} />
      <View style={styles.row}>
        <Text style={styles.txt}>Already have an account ? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LogIn');
          }}>
          <Text style={[styles.txt, styles.pressableTxt]}>Log In</Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" />
    </KeyboardAvoidingView>
    );
}

export default ViewRegister;
