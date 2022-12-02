import React, { useEffect, useState, useCallback, useReducer } from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import { Boton } from '../components/Boton';
import {Elipse} from '../components/Elipse';
import {styles} from '../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllTasks, logoutApp } from '../services/api';
import Task from '../components/Task';
import ListEmpty from '../components/ListEmpty';
import SwipeableFlatList from 'react-native-swipeable-list';
import { RefreshControl } from 'react-native-gesture-handler';
import { QuickActions } from '../components/QuickAction';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default ({navigation}) => {

  const [tasks, setTasks] = useState([]);
  const [user,setUser] = useState('User');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const usuario = await AsyncStorage.getItem('user');
      setUser(usuario);
      getAllTasks({
        tokenStorage: token,
        setTasks: setTasks,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewTask = () => {
    navigation.navigate('CreateTask');
  };
  const handleTakePhoto = () => {
    navigation.navigate('TakePhoto');
  };

  const handleLogOut = async () => {
    const token = await AsyncStorage.getItem('token');
    logoutApp({tokenStorage: token, navigation:navigation});
  };

  const handlePressEdit = async (idSelected) => {
    await AsyncStorage.setItem('idTarea', idSelected);
    navigation.navigate('EditTask');
  };

  useEffect(() =>{
    navigation.addListener('focus', async () => {
      getToken();
    });
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(4).then(() => {setRefreshing(false);
    getToken();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Elipse />
      <View style={[styles.containerList, styles.width100]}>
        <Text style={styles.title}>To Do LIST</Text>
        <Text style={styles.welcome}>Welcome {user}</Text>
        {loading ? (
          <ActivityIndicator size={'large'} color={'blue'} />
        ) : (
          <View style={styles.width100}>
            <SwipeableFlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh} />
              }
              data={tasks}
              keyExtractor={x => String(x._id)}
              renderItem={({item}) => <Task completed={item.completed} onPress={()=> {handlePressEdit(item._id)}}>{item.description}</Task>}
              maxSwipeDistance={55}
              renderQuickActions={item => QuickActions(item, onRefresh)}
              ListEmptyComponent={<ListEmpty onPress={handleNewTask}/>}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </View>
        )}
      </View>
      <View style={[styles.botContainer, styles.width100]}>
          <Boton title={'Create new Task'} onPress={handleNewTask}/>
          <Boton title={'Take a Photo'} onPress={handleTakePhoto}/>
          <Boton title={'Logout'} onPress={handleLogOut}/>
      </View>
    </View>
  );
};
