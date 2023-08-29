import { useState } from "react";
import { Button, StyleSheet, TextInput, View, Modal, Image } from "react-native";
import GoalInputButtons from "./GoalInputButtons";

const GoalInput = (props) => {
    const [enteredGoalText, setEnteredGoalText] = useState("");

    const goalInputHandler = (enteredText) => {
      setEnteredGoalText(enteredText);
    }

    const addGoalHandler = () => {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText("");
    }

    const closeModalHandler = () => {
        props.onCloseModal(props.visible);

    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require("../assets/images/goal.png")} />
                <TextInput style={styles.textInput} placeholder="Your course goal!" onChangeText={goalInputHandler} value={enteredGoalText} />

            <View style={styles.buttonContainer}>
              <View style={styles.buttons}>
                <GoalInputButtons onPress={addGoalHandler} text="Add Goal" />
              </View>
              <View style={styles.buttons}>
                <GoalInputButtons onPress={closeModalHandler} text="Cancel" />
              </View>
            </View>

          </View>
        </Modal>

    );
}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fef9f8"
      },
    textInput: {
        margin: 15,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#ebc0b2",
        borderRadius: 6,
        width: "80%",
        padding: 20,
    },
    buttonContainer: {
      flexDirection: "row",
    },
    buttons: {
      margin: 10,
    },
    image: {
      width: 100,
      height: 100,
    },
});