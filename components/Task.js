import React from 'react';
import {Pressable, Text, View} from 'react-native';
import { styles } from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default ({children, onPress, completed}) => {
  let color;
  let icon;
  // eslint-disable-next-line no-lone-blocks
  {completed ? color = '#6BBD79' : color = '#FC9F9F';}
  {completed ? icon = 'check-circle' : icon = 'exclamation-circle';}

  return (
      <Pressable style={[styles.center]} onPress={onPress}>
          <View style={[styles.taskContainer,{backgroundColor: color}]}>
            <Text style={styles.txt} >{children}</Text>
            <View style={styles.separador}/>
            <FontAwesome5 style={styles.iconoTask} name={icon}/>
          </View>
      </Pressable>
  );
};
