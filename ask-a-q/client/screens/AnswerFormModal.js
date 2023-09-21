import { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Modal, Text} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import AuthContext from "../context/AuthContext"
import { useNavigation } from "@react-navigation/native";

const AnswerFormModal = (props) => {

    const auth = useContext(AuthContext);

    const navigation = useNavigation();

    const [answerInput, setAnswerInput] = useState("");

    const [questionId, setQuestionId] = useState(props.questionId);

    const [userId, setUserId] = useState(0);

    const [errors, setErrors] = useState([]);


    const answerInputHandler = (enteredText) => {
        setAnswerInput(enteredText);
      }


    const create = (evt) => {
      evt.preventDefault()
  
      const newPost = {
        answerInput, userId, questionId
      }
  
      let verb = "POST";
      let url = "http://localhost:8080/api/answer"
  
      fetch(url, {
        method: verb,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + auth.user.token
        },
        body: JSON.stringify(newPost)
      })
      .then(response => {
        if (response.ok) {
          response.json()
          .then(q => {
            closeFormModalHandler(),
            //reset state
            setAnswerInput("");
            props.answerChecker(true);
            //close Modal
          })
        } else {
          response.json()
          .then(errors => {
            if (Array.isArray(errors)) {
              setErrors(errors)
            } else {
              setErrors([errors])
            }
          })
        }
      })
  
    }

    const closeFormModalHandler = () => {
        props.onCloseModal(props.visible);

    }


    return (
      <Modal visible={props.visible} animationType="slide">
        <View style={styles.inputContainer}>
          {errors.map(error => <Text style={styles.errorText}key={error}>{error}</Text>)}
            <Text style={styles.subjectHeader}>Message:</Text>
            <TextInput editable multiline style={styles.messageInput} onChangeText={answerInputHandler} value={answerInput} />

            <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
                <PrimaryButton onPress={create} text="Post" />
            </View>
            <View style={styles.buttons}>
                <PrimaryButton onPress={closeFormModalHandler} text="Cancel" />
            </View>
            </View>

        </View>
      </Modal>
    );
}

export default AnswerFormModal;

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
    errorText: {
      color: "#752828",
      margin: 10,
    },
});