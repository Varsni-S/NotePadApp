import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {TextInput} from 'react-native-gesture-handler';
import {useLinkProps} from '@react-navigation/native';
import tempData from '../Data/tempData';

export default function AddTodoList({closeModal}) {
  //, addList
  const backgroundColors = [
    '#5CD859',
    '#24A6D9',
    '#595BD9',
    '#D159D8',
    '#D88559',
  ];

  const [name, setName] = useState('');
  const [color, setColors] = useState('');
  const [addTodos, setAddTodos] = useState(name, color);

  const createTodos = () => {
    //  console.log(name, color);
    // const list = {name, color};
    tempData.push({
      name,
      color,
      todos: [],
    });
    // addList(list);
    setAddTodos({name: '', color: ''});
    closeModal();
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={closeModal}
          style={{
            //   position: 'absolute',
            top: 24,
            right: 32,
            left: 99,

            marginLeft: 130,
          }}>
          <FontAwesomeIcon icon={faTimes} />
        </TouchableOpacity>
        <Text style={styles.title}>Create New Todos</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Create Todo"
        value={name}
        onChangeText={value => setName(value)}
      />
      <View style={{display: 'flex', flexDirection: 'row'}}>
        {backgroundColors.map(color => {
          return (
            <TouchableOpacity
              style={{
                height: 30,
                width: '10%',
                backgroundColor: color,
              }}
              key={JSON.stringify(color)}
              onPress={() => setColors(color)}></TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        onPress={createTodos}
        style={[styles.create, {backgroundColor: color ? color : 'blue'}]}>
        <Text style={{color: 'white', fontWeight: '800', fontSize: 20}}>
          Create
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    marginTop: 20,
    //backgroundColor: '#ADD8E6',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
    alignItems: 'center',
    marginTop: 200,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  create: {
    marginTop: 24,
    width: 200,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
