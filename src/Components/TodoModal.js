import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlus,
  faSquare,
  faSquareCheck,
  faSquareFull,
  faSquarePollHorizontal,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

export default function TodoModal({list, closeModal}) {
  const taskCount = list.todos.length;
  const completedCount = list.todos.filter(todo => todo.completed).length;

  const backgroundColors = [
    '#5CD859',
    '#24A6D9',
    '#595BD9',
    '#D159D8',
    '#D88559',
  ];

  const [name, setName] = useState('');
  const [color, setColors] = useState('');
  const [todos, setTodos] = useState('');
  const [value, setValue] = useState('');

  const renderTodo = todo => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity>
          <FontAwesomeIcon
            icon={todo.completed ? faSquareCheck : faSquare}
            size={18}
            color={'grey'}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'grey' : 'black',
            },
          ]}>
          {todo.title}
        </Text>
      </View>
    );
  };

  // const onAddMoreTodo = value => {
  //   setValue(value);
  // };
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={closeModal}
          style={{position: 'absolute', top: 24, right: 32, zIndex: 10}}>
          <FontAwesomeIcon icon={faTimes} />
        </TouchableOpacity>

        <View
          style={[styles.section, styles.header, {borderBottomColor: 'grey'}]}>
          <View>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>

        <View style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, {borderColor: 'black'}]}
            placeholder="Add More"
            onChangeText={setValue}
            value={value}
          />
          <TouchableOpacity
            style={[styles.addTodo, {backgroundColor: 'grey'}]}
            onPress={() => setValue('')}>
            <FontAwesomeIcon icon={faPlus} size={20} />
          </TouchableOpacity>
        </View>
        <Text>{value}</Text>

        <View style={[styles.sections]}>
          <FlatList
            data={list.todos}
            renderItem={({item}) => renderTodo(item)}
            keyExtractor={item => item.title}
            contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //  justifyContent: 'center',
    //  alignItems: 'center',
    //
  },
  section: {
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  sections: {
    alignSelf: 'stretch',
  },
  header: {
    justifyContent: 'flex-end',
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: 'black',
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: 'grey',
    fontWeight: '600',
  },
  footer: {
    // paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 6,
    marginRight: 8,
    backgroundColor: 'grey',
    paddingHorizontal: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  addTodo: {
    borderRadius: 4,
    padding: 10,
    justifyContent: 'center',
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todo: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 10,
  },
});
