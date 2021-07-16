import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList} from 'react-native';
import GoalItem from './components/GoalItem'
import GoalInput from "./components/GoalInput";

export default function App() {
    const [courseGoals, setCourseGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);


    const addGoalHandler = (goalTitle) => {
        if (goalTitle.length === 0) {
            return;
        }
        setCourseGoals(currentGoals => [
            ...currentGoals, { id: Math.random().toString(),
                value: goalTitle}]
        );
        setIsAddMode(false)

    }

    const cancelGoalAdditionalHandler = () => {
        setIsAddMode(false);
    }

    const removeFoalHandler = goalId => {
        setCourseGoals(currentGoals => {
            return currentGoals.filter((goal) => (
                goal.id !== goalId
            ))
        })
    }

    return (
        <View style={styles.screen}>
            <Button title='Add new Goat' onPress={() => setIsAddMode(true)}/>
            <GoalInput onCancel={cancelGoalAdditionalHandler} visible={isAddMode} onAddGoal={addGoalHandler}/>

            <FlatList
                keyExtractor={(item, index) => item.id}
                data={courseGoals}
                renderItem={itemData => (
                    <GoalItem
                        onDelete={removeFoalHandler}
                        title={itemData.item.value}
                        id={itemData.item.id}
                    />)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 50
    }
});
