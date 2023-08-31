import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Modal, Text} from "react-native";
import PrimaryButton from "../components/PrimaryButton";

const FormModal = (props) => {
    const [questionTitle, setQuestionTitle] = useState("");

    const [questionInput, setQuestionInput] = useState("");

    const questionTitleHandler = (enteredText) => {
      setQuestionTitle(enteredText);
    }

    const questionInputHandler = (enteredText) => {
        setQuestionInput(enteredText);
      }

    const createQuestionHandler = () => {
        //do post request here

        closeFormModalHandler(),
        //reset state
        setQuestionTitle("");
        setQuestionInput("");

        //close Modal

    }

    const closeFormModalHandler = () => {
        props.onCloseModal(props.visible);

    }

    // //once user submits form, close the modal
    // useEffect(() => {
    //     closeFormModalHandler();
    // }, [createQuestionHandler])

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Text  maxLength={50} style={styles.subjectHeader}>Subject:</Text>
                <TextInput style={styles.titleInput} onChangeText={questionTitleHandler} value={questionTitle} />
                <Text style={styles.subjectHeader}>Message:</Text>
                <TextInput editable multiline style={styles.messageInput} onChangeText={questionInputHandler} value={questionInput} />

            <View style={styles.buttonContainer}>
              <View style={styles.buttons}>
                <PrimaryButton onPress={createQuestionHandler} text="Create Question" />
              </View>
              <View style={styles.buttons}>
                <PrimaryButton onPress={closeFormModalHandler} text="Cancel" />
              </View>
            </View>

          </View>
        </Modal>

    );
}

export default FormModal;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fef9f8"
      },
      subjectHeader : {
        color: "#b5593a",
        alignSelf: "left",
        marginLeft: 45,
        fontSize: 20,
        fontWeight: "bold",
      },
    titleInput: {
        margin: 15,
        backgroundColor: "#ebc0b2",
        borderRadius: 6,
        width: "80%",
        padding: 10,
    },
    messageInput: {
        margin: 15,
        backgroundColor: "#ebc0b2",
        borderRadius: 6,
        width: "80%",
        height: 200,
        padding: 10,
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