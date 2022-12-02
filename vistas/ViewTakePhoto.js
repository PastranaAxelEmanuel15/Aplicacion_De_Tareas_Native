import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {View, Image, Text, Vibration} from 'react-native';
import { Boton } from '../components/Boton';
import {Elipse} from '../components/Elipse';
import {styles} from '../components/styles';
import * as ImagePicker from 'react-native-image-picker';
import { addImageAvatar } from '../services/api';
import FlashMessage from 'react-native-flash-message';


export default ({navigation}) => {
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);

  //IMAGE
  const HandlePickImage = async () => {
    Vibration.vibrate();
    const options = {
      title: 'You can choose one image',
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
      },
      includeBase64: true,
    };

    await ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0];
        setImage(`data:${source.type};base64,${source.base64}`);

        const body = new FormData();
        body.append('avatar', {
          uri: source.uri,
          type: source.type,
          name: source.fileName,
        });

        const data = source.fileName;
        //console.log('body: ', body);
        //console.log('bodyParts: ', body._parts[0][1]);
        setAvatar(body._parts[0][1]);
      }
    });

  };

  const HandlePickCamera = async () => {
    Vibration.vibrate();
    // No permissions request is necessary for launching the image library
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: true,
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else {
        const source = response.assets[0];
        //console.log('fileSize -> ', response.fileSize);
        setImage(`data:${source.type};base64,${source.base64}`);
      }
    });
  }

  const handleReturn = () => {
      navigation.navigate('Home');
  };

  const HandleAddAvatar = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      addImageAvatar({avatar: avatar,tokenStorage: token});
      console.log('bien añadido');
    } catch (error) {
      console.log('mal añadido');
      console.log(error);
    }
};

  return (
    <View style={styles.containerBot}>
      <Elipse />
      <Text style={[styles.title, styles.margin60]}>Photo</Text>
      {image ? null : <Image
        source={require('../assets/images/onboarding.png')}
        style={styles.img}
      />
      }
      <View style={styles.separador}/>
      <View style={[styles.containerImage, styles.box]}>
          {image && <Image source={{ uri: image}} style={styles.image} />}
      </View>

      <View style={[styles.butonsContainer, styles.width100]}>
        <View style={styles.margin60} />
        <Boton title={'Take Photo'} onPress={HandlePickCamera}/>
        <View style={styles.separador}/>
        <Boton title={'Upload an image'} onPress={HandlePickImage}/>
        {image ? 
          <View style={[styles.width100, styles.botSubContainer]}>
            <View style={styles.separador}/>
            <Boton title={'Add as avatar'} onPress={HandleAddAvatar}/>
            <View style={styles.separador}/>
          </View>
          : <View style={styles.separador}/> }
        <Boton title={'Return'} onPress={handleReturn}/>
        <View style={styles.margin60} />
      </View>
      <FlashMessage position="top" />
    </View>
  );
};
