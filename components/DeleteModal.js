import React from 'react';
import { Button, Modal, Text, View } from 'react-native';
import { styles } from './styles';

export default ({visible, Delete, close, task}) => {
    return (
        <Modal animationType='slide' transparent={true} visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalSubContainer}>
                    <View>
                        <Text style={[styles.txt, styles.bold]}>Are you want to delete the task: </Text>
                        <Text style={[styles.txt, styles.bold]}>{task}</Text>
                    </View>
                    <View style={styles.row}>
                        <Button title="delete" onPress={Delete} color={'#50C2C9'}/>
                        <View style={styles.separador}/>
                        <Button title="delete" onPress={Delete} color={'#50C2C9'}/>
                    </View>
                </View>
            </View>
        </Modal>

    );
};
