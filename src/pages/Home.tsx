import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists =
      tasks.length && tasks.find((task) => task.title === newTaskTitle);

    if (taskAlreadyExists) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const taskToggled = tasks.find((task) => task.id === id);

    const updatedTasks = tasks.map((task) => {
      if (taskToggled && task.id === id) {
        return {
          ...taskToggled,
          done: !task.done,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'default',
        },
        {
          text: 'Sim',
          onPress: () =>
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)),
          style: 'cancel',
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const taskToggled = tasks.find((task) => task.id === taskId);

    const updatedTasks = tasks.map((task) => {
      if (taskToggled && task.id === taskId) {
        return {
          ...taskToggled,
          title: taskNewTitle,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
