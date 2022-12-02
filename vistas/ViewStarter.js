import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Image, Text} from 'react-native';
import { Boton } from '../components/Boton';
import {Elipse} from '../components/Elipse';
import {styles} from '../components/styles';
import t from '../services/translate';

export default ({navigation}) => {

  const handleGetStarted = () => {
      navigation.navigate('LogIn');
  };

  return (
    <View style={styles.containerBot}>
      <Elipse />
      <Image
        source={require('../assets/images/onboarding.png')}
        style={styles.img}
      />
      <Text style={styles.title}>Gets things done with ToDo</Text>
      <View style={styles.separador}/>
      <Text style={[styles.txt, styles.txtMargin]}>
        {t('onboarding.description')}
      </Text>
      <View style={styles.margin60} />
      <Boton title={'Get Started'} onPress={handleGetStarted}/>
      <View style={styles.margin60} />
    </View>
  );
};
