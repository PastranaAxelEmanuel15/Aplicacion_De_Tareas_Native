
import React, { useEffect, useState } from 'react';
import {View, Text, KeyboardAvoidingView, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Boton } from '../components/Boton';
import  Form  from '../components/Form';
import {Elipse} from '../components/Elipse';
import {styles} from '../components/styles';
import { GetTaskID, UpdateTask } from '../services/api';
import t from '../services/translate';

export default ({navigation}) => {

  const [editableTask, setEditableTask] = useState('');
  const [completed, setCompleted] = useState(false);
  const [idTask, setIdTask] = useState('');

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
        UpdateTask({
          _id: idTask,
          description: editableTask,
          completed: completed,
          token: token,
        });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturn = () => {
    navigation.goBack();
  };

  const handleCompleted = () => {
    setCompleted(!completed);
  };

  const getTaskEditable = async () => {
    try {
      const idTarea = await AsyncStorage.getItem('idTarea');
      const token = await AsyncStorage.getItem('token');
      GetTaskID({
        _id: idTarea,
        tokenStorage: token,
        setEditableTask: setEditableTask,
        setCompleted: setCompleted,
        setIdTask: setIdTask,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>{
    getTaskEditable();
  }, []);


  return (
    <KeyboardAvoidingView style={styles.container} enabled="false" behavior="height">
      <Elipse />
      <View style={[styles.container, styles.width100]}>
        <Form placehold={t('editableTask.taskPlaceHolder')} onChangeText={setEditableTask} text={editableTask}/>
        <View style={styles.separador} />
        {/* Switch con Completed y set Completed*/}
        <Switch onValueChange={handleCompleted} value={completed} />
        <Text style={styles.txt}>Completed</Text>
      </View>
      <View style={[styles.botContainer, styles.width100]}>
        <Boton title={'Update Task'} onPress={handleUpdate}/>
        <Boton title={'Return'} onPress={handleReturn}/>
      </View>
    </KeyboardAvoidingView>
  );
};
