/* eslint-disable react/react-in-jsx-scope */
import { Pressable, View, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteTask } from '../services/api';
import { styles } from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const createTwoButtonAlert = (_id, description, onRefresh) => {
    Alert.alert(
      'Esta seguro que desea eliminar esta tarea?',
      `${description}`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'OK', onPress: async () => {
            const token = await AsyncStorage.getItem('token');
            deleteTask(_id, token);
            onRefresh();
          },
        },
      ],
    );
  };

export const QuickActions = (item, onRefresh) => {
    const { _id, description } = item.item;
    return (
        <Pressable onPress={() => createTwoButtonAlert(_id, description, onRefresh)}>
          <View style={styles.deleteBotton}>
            <Text style={styles.deleteButtonText}>
              <FontAwesome5 name={'trash'}/>
            </Text>
          </View>
        </Pressable>
    );
  };
