
import React, { useState } from 'react';
import {View, Text, KeyboardAvoidingView, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Boton } from '../components/Boton';
import  Form  from '../components/Form';
import {Elipse} from '../components/Elipse';
import {styles} from '../components/styles';
import { addTask } from '../services/api';
import t from '../services/translate';

export default ({navigation}) => {

  const [newTask, setNewTask] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleCreate = async () => {
    const token = await AsyncStorage.getItem('token');
    addTask({
      description: newTask,
      completed: completed,
      tokenStorage: token,
    });
    setNewTask('');
    navigation.goBack();
  };

  const handleReturn = () => {
    navigation.goBack();
  };

  const handleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <KeyboardAvoidingView style={styles.container} enabled="false" behavior="height">
      <Elipse />
      <View style={[styles.container, styles.width100]}>
        <Form placehold={t('createTask.taskPlaceHolder')} onChangeText={setNewTask} />
        <View style={styles.separador} />
        <Switch onValueChange={handleCompleted} value={completed} />
        <Text style={styles.txt}>Completed</Text>
      </View>
      <View style={[styles.botContainer, styles.width100]}>
        <Boton title={'Create Task'} onPress={handleCreate}/>
        <Boton title={'Return'} onPress={handleReturn}/>
      </View>
    </KeyboardAvoidingView>
  );
};
