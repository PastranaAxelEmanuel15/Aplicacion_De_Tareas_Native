
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

const api = 'https://http-nodejs-production-9473.up.railway.app';
const apiLogin = api + '/user/login';
const apiLogOut = api + '/user/logout';
const apiRegister = api + '/user/register';
const apiMe = api + '/user/me';
const apiAvatar = apiMe + '/avatar';

const apiTaskList = api + '/task';

export const loginApp = ({Email, Password, navigation}) => {
  if (!Email || !Password){
    showMessage({
      message: 'Plase fill in all the fields',
      type: 'warning',
      icon: 'auto',
      statusBarHeight: 40,
    });
  } else if (Email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email)){
      showMessage({
        message: 'Must enter a valid E-mail address',
        type: 'warning',
        icon: 'auto',
        statusBarHeight: 40,
      });

  } else if (Password && Password.length < 7){
    showMessage({
        message: 'Passwords must be have at least 7 characters',
        type: 'warning',
        icon: 'auto',
        statusBarHeight: 40,
      });
  } else {
      fetch(apiLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: Email,
            password: Password,
        }),
      })
      .then(response => response.json())
      .then(async data => {
        console.log(data);
        console.log('TOKEN Obtenido: ' + data.token);
        if (data.token === undefined){
          showMessage({
            message: 'Usuario No Registrado',
            type: 'danger',
            icon: 'danger',
            statusBarHeight: 40,
          });
        } else {
          showMessage({
            message: 'Loged In Succesfuly',
            type: 'success',
            icon: 'success',
            statusBarHeight: 40,
          });
        }
        console.log(data);
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', data.user.name);
        setTimeout(()=>{navigation.navigate('Home')},2000);
      }).catch((error) => {
        console.log(error.message);
      });
    }
};

export const logoutApp = ({tokenStorage, navigation}) => {
    fetch(apiLogOut, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenStorage,
        },
    }).then(async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        navigation.navigate('LogIn');
    });
};

export const SignIn = ({Name, Email, Password, Confirm, navigation}) => {
    if (!Name || !Email || !Password || !Confirm){
      showMessage({
        message: 'Plase fill in all the fields',
        type: 'warning',
        icon: 'auto',
        statusBarHeight: 40,
      });
    } else if (Name && !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(Name)){
      showMessage({
        message: 'The Name must not have special characters',
        type: 'warning',
        icon: 'auto',
        statusBarHeight: 40,
      });

    } else if (Email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email)){
        showMessage({
          message: 'Must enter a valid E-mail address',
          type: 'warning',
          icon: 'auto',
          statusBarHeight: 40,
        });

    } else if (Password && Password.length < 7){
      showMessage({
          message: 'Passwords must be have at least 7 characters',
          type: 'warning',
          icon: 'auto',
          statusBarHeight: 40,
        });
    } else if (Confirm !== Password){
      showMessage({
          message: 'Passwords must be the same',
          type: 'warning',
          icon: 'auto',
          statusBarHeight: 40,
        });
    } else {
      fetch(apiRegister, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: Name,
          email: Email,
          password: Password,
        }),
      })
      .then(response => response.json())
      .then(async data => {
        console.log(data);
        console.log('TOKEN OBTENIDO: ' + data.token);
        await AsyncStorage.setItem('token', data.token);
        // eslint-disable-next-line no-alert
        alert('Bienvenido, Usuario Registrado');
        navigation.navigate('Home');
      });
    }
    };

export const tokenLogIn = ({navigation, tokenStorage}) => {
    fetch(apiMe, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + tokenStorage,
        },
    }).then(()=>{
        navigation.navigate('Home');
    });
  };

  export const getAllTasks = ({tokenStorage, setTasks}) => {
    fetch(apiTaskList, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + tokenStorage,
        },
    })
     .then(response => response.json())
     .then(async data => {
        console.log('Data traida');
        //console.log(data);
        setTasks(data.data);
     });
  };

  export const addTask = ({description, completed, tokenStorage}) => {
    if(!description){
        showMessage({
            message: 'Cannot create an empty task',
            type: 'danger',
            icon: 'danger',
            statusBarHeight: 40,
        });
    } else {
        fetch(apiTaskList, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + tokenStorage,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: description,
                completed: completed,
            }),
        });
    }
};

export const deleteTask = (_id, token) => {
  fetch(apiTaskList + '/' + _id , {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })
    .then(()=>{console.log('Correctamente Borrado')})
    .catch((error) => {console.log(error.message);});
};

export const UpdateTask = ({_id, description, completed, token}) => {
  fetch(apiTaskList + '/' + _id , {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: description,
      completed: completed,
    }),
  })
    .then(()=>{
      console.log('Correctamente Actualizada La Tarea');
    })
    .catch((error) => {console.log(error.message);});
};

export const GetTaskID = ({_id, tokenStorage, setEditableTask, setCompleted, setIdTask}) => {
  fetch(apiTaskList + '/' + _id, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + tokenStorage,
      'Content-Type': 'application/json',
    },
})
 .then(response => response.json())
 .then(async data => {
    console.log('Data traida');
    console.log(data);
    setEditableTask(data.data.description);
    setCompleted(data.data.completed);
    setIdTask(data.data._id);
 });
};

//subir imagen con avatar


export const addImageAvatar = ({avatar, tokenStorage}) => {
  if(!avatar){
      showMessage({
          message: 'The Avatar Image is Failed',
          type: 'danger',
          icon: 'danger',
          statusBarHeight: 40,
      });
  } else {
      fetch(apiAvatar, {
          method: 'POST',
          headers: {
              Authorization: 'Bearer ' + tokenStorage,
          },
          body: {avatar},
      }).then(()=>{console.log('Correctamente Actualizado')})
      .catch((error) => {console.log(error.message);});
  }
};