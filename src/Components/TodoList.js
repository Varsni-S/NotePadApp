import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import TodoModal from './TodoModal';

export default function TodoList({list}) {
  const completedCount = list.todos.filter(todo => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View>
      <Modal visible={modalOpen} animationType="slide" transparent={false}>
        <View>
          <TodoModal
            list={list}
            closeModal={() => setModalOpen(false)}
            //  updateList={updateList}
          />
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => setModalOpen(true)}
        style={[styles.listContainer, {backgroundColor: list.color}]}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.count}>{remainingCount}</Text>
          <Text style={styles.subTitle}>Remaining</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.count}>{completedCount}</Text>
          <Text style={styles.subTitle}>Completed</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: '200',
    color: 'white',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
});
