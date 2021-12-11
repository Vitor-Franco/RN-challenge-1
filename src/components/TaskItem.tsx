import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Task } from './TasksList';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/pen.png';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
  index: number;
}

function TaskItem({
  task: item,
  toggleTaskDone,
  removeTask,
  editTask,
  index,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitle, setTaskNewTitle] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    setIsEditing(false);
    editTask(item.id, taskNewTitle);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={taskNewTitle}
            onChangeText={setTaskNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}
      >
        {!isEditing ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 18 }}
            onPress={handleStartEditing}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 18 }}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        )}

        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: 'rgba(196, 196, 196, 0.24)',
          }}
        ></View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 18 }}
          onPress={() => removeTask(item.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
});

export { TaskItem };
