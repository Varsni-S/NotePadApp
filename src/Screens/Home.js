import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import tempData from '../Data/tempData';
import TodoList from '../Components/TodoList';
import AddTodoList from '../Components/AddTodoList';
import Fire from '../../Fire';
// import firebase from 'firebase';
export default function Home({navigation}) {
  const [name, setName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [lists, setLists] = useState(tempData);
  const [user, setUser] = useState();
  useEffect(() => {
    getData();
    //  firestorefun();
  }, []);

  const updateTodos = (parentIndex, index) => {
    let newLists = [...lists];
    newLists[parentIndex].todos[index].completed =
      !newLists[parentIndex].todos[index].completed;
    // console.log({newLists, lists});
    setLists(newLists);
  };

  const firestorefun = () => {
    firebase = new Fire((error, user) => {
      if (error) {
        alert('went wrong');
        return;
      }
      setUser({user});
    });
  };
  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setName(user.Name);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert('Warning!', 'Please fill the details');
    } else {
      try {
        var user = {
          Name: name,
        };
        await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
        Alert.alert('Sucess!', 'Your data has been updated!');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  const renderList = (list, index) => {
    return (
      <TodoList
        list={list}
        parentIndex={index}
        updateTodos={updateTodos}
        updateList={updateList}
      />
    );
  };

  // const addList = list => {
  //   setLists({lists: [...list, {...list, id: lists.length + 1, todos: []}]});
  // };

  const updateList = list => {
    // console.log(list, 'list');
    let newList = lists.map(item => {
      return item.id === list.id ? list : item;
    });
    setLists(newList);
    console.log('update');
  };

  return (
    <View style={styles.body}>
      <Modal visible={modalOpen} animationType="slide" transparent={false}>
        <View>
          <AddTodoList
            closeModal={() => setModalOpen(false)}
            //  addList={addList}
          />
        </View>
      </Modal>

      {/* <View>
        <Text>user{user.uid}</Text>
      </View> */}

      <Text style={styles.text}>Welcome {name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Change Name"
        value={name}
        onChangeText={value => setName(value)}
      />
      <View style={styles.buttonGrp}>
        <Button title="Update" color="#FFA500" onPress={updateData} />

        <Button title="Remove" color="red" onPress={removeData} />
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>Todo</Text>
        <Text
          style={{
            fontWeight: '500',
            color: 'blue',
            fontSize: 20,
            marginTop: 12,
            marginLeft: 10,
          }}>
          Lists
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addList}
        onPress={() => setModalOpen(true)}>
        <FontAwesomeIcon icon={faPlus} size={25} color={'blue'} />
      </TouchableOpacity>

      <Text style={styles.add}>Add Lists</Text>

      <View style={{height: 275, paddingLeft: 32}}>
        <FlatList
          data={lists}
          keyExtractor={item => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => renderList(item, index)}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
  },
  text: {
    fontSize: 30,
    margin: 10,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    width: '60%',
    margin: 30,
  },
  buttonGrp: {
    flexDirection: 'row',
    padding: 5,
    margin: 5,
  },
  divider: {
    backgroundColor: 'lightblue',
    height: 1,
    flex: 1,
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: 'black',
    //   paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 4,
    margin: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: 'blue',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 25,
  },
});
