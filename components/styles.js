import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerList: {
    flex: 3,
    flexDirection: 'column',
    marginTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: '60%',
  },
  containerBot: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  botContainer:{
    flex: 1,
    marginTop: '10%',
    marginBottom: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  taskContainer: {
    width: '80%',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    marginVertical: 5,
    padding: 10,
    flexDirection: 'row-reverse'
  },
  modalContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalSubContainer: {
    width: '70%',
    height: '18%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 6,
  },
  flatList: {
    backgroundColor: '#fff',
    width: '90%',
    height: '90%',
    marginTop: 30,
    borderRadius: 30,
  },
  addTask: {
    width: 200,
    height: 200,
    backgroundColor: '#50C2C9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  txt: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  pressableTxt: {
    fontSize: 18,
    color: '#50C2C9',
  },
  bold: {
    fontWeight: 'bold',
  },
  txtInput: {
    borderRadius: 30,
    backgroundColor: '#fff',
    width: '80%',
    paddingLeft: 30,
    color: '#000',
  },
  txtMargin: {
    marginHorizontal: 60,
  },
  btn: {
    backgroundColor: '#50C2C9',
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#eee',
    margin: 10,
  },
  img: {
    height: 250,
    resizeMode: 'contain',
    margin: 15,
  },
  separador: {
    margin: 5,
  },
  separador40: {
    margin: 40,
  },
  row: {
    flexDirection: 'row',
  },
  margin60: {
    margin: 60,
  },
  elipse: {
    position: 'absolute',
    top: -100,
    left: -100,
  },
  width100: {
    width:'100%',
  },
  center:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  complete: {
    backgroundColor: 'green',
  },
  incomplete: {
    backgroundColor: 'tomato',
  },
  deleteBotton: {
    borderRadius: 22,
    marginTop: 12,
    marginLeft: 305,
    marginRight: 61,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#E21504',
  },
  deleteButtonText:{
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  botSubContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
  image: {
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 2,
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  containerImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: '50%',
  },
  butonsContainer:{
    flex: 1,
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20%',
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  iconoTask:{
    alignSelf: 'center',
    flexGrow: 3,
  },
});
