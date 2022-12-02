import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { styles } from './styles';

export default ({onPress}) => {
    return (
        <>
        <View style={styles.margin60} />
        <View style={[styles.width100, styles.center]}>
            <TouchableOpacity style={styles.addTask} onPress={onPress}>
                <Text style={styles.btnTxt}>Add new task</Text>
            </TouchableOpacity>
        </View>
        </>
    );
};
