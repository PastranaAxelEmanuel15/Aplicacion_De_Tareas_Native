import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const Boton = ({title, onPress}) => {

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  );
};