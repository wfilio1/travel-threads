import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import PrimaryButton from "../components/PrimaryButton";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usernameHandler = (enteredText) => {
        setUsername(enteredText);

    }

    const passwordHandler = (enteredText) => {
        setPassword(enteredText);

    }

    const submitHandler = () => {
        //do post request here

        //reset state after
        //once logged in, navigate back to the home page

    }

    return(
        <View style={styles.inputContainer}>
        <Text  maxLength={50} style={styles.header}>Username:</Text>
        <TextInput style={styles.input} onChangeText={usernameHandler} value={username} />
        <Text style={styles.header}>Password:</Text>
        <TextInput style={styles.input} secureTextEntry={true} onChangeText={passwordHandler} value={password} />

            <View style={styles.buttonContainer}>
                <View style={styles.buttons}>
                <PrimaryButton onPress={submitHandler} text="Login" />
                </View>
            </View>

            <Button title="Don't have an account yet?" />

        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fef9f8"
      },
      header : {
        color: "#b5593a",
        alignSelf: "left",
        marginLeft: 45,
        fontSize: 20,
        fontWeight: "bold",
      },
    input: {
        margin: 15,
        backgroundColor: "#ebc0b2",
        borderRadius: 6,
        width: "80%",
        padding: 10,
    },
    buttonContainer: {
      flexDirection: "row",
    },
    buttons: {
      margin: 10,
    },
});