import { useState } from 'react';
import { StyleSheet, View, FlatList, Button, Text } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';
import PrimaryButton from './components/PrimaryButton';

export default function App() {

  const [listGoals, setListGoals] = useState([]);

  const [modalIsVisible, setModalIsVisible] = useState(false);

  const addGoalHandler = (enteredGoalText) => {
    setListGoals(currentCourseGoals => [...currentCourseGoals, 
      { text: enteredGoalText, key: Math.random().toString() }]);
  }

  const deleteGoalHandler = (key) => {
    setListGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.key !== key)
    })
  }

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  }

  const endAddGoalHandler = () => {
    setModalIsVisible(false);
  }

  const checkIfEmpty = (goals) => {
    if(goals.length === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        
        <PrimaryButton onPress={startAddGoalHandler} text="Add New Goal" />
        <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCloseModal={endAddGoalHandler} />
        <View style={styles.goals}>   
        
        {checkIfEmpty(listGoals) ? (<Text style={styles.zeroGoalsText}>You do not have any goals.</Text>) 
        :
        (<FlatList data={listGoals} renderItem={itemData => {
            return (
              <GoalItem text={itemData.item.text} id={itemData.item.key} onDeleteItem={deleteGoalHandler}/>
            );
          }} alwaysBounchVertical={false}>
        </FlatList>)
        }   
        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 70,
    padding:50,
    paddingHorizontal: 16,
    backgroundColor: "#ef9273"
  },
  goals: {
    margin: 10,
  },
  zeroGoalsText: {
    margin: 10,
  }

});