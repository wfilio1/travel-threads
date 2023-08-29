import { View, Text, StyleSheet, Pressable } from "react-native";

const GoalItem = (props) => {

    const deleteGoalHandler = () => {
        props.onDeleteItem(props.id);
    }

    return(
        
        <View style={styles.goalItemContainer}>
            <Pressable onPress={deleteGoalHandler} style={({pressed}) =>  pressed && styles.pressedItem} >
                <Text style={styles.goalItemText}>{props.text}</Text>
         </Pressable>
         </View>
       
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    goalItemContainer: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: "#d8714f",
      },
      pressedItem: {
        opacity: 0.5,
      },
      goalItemText: {
        color: "white",
        padding: 8,
      },
});