import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import PrimaryButton from "../components/PrimaryButton";
import AuthContext from "../context/AuthContext"
import { useNavigation } from "@react-navigation/native";
import GoogleButton from "../components/GoogleButton";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const navigation = useNavigation();

    useEffect(() => {
        console.log("Errors:", errors);
      }, [errors]);

    const usernameHandler = (enteredText) => {
        setUsername(enteredText);

    }

    const passwordHandler = (enteredText) => {
        setPassword(enteredText);

    }

    const submitHandler = async(event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
    
      if (response.status === 200) {
        const { jwt_token } = await response.json();
        auth.login(jwt_token);
        navigation.navigate("Home");
      // This code executes if the request fails
      } else if (response.status === 403) {
        setErrors(["Login failed, please ensure the username and password are correct."]);
        // console.log("Errors after setting state:", errors);
      } else {
        setErrors(["Unknown error."]);
        // console.log("Errors after setting state:", errors);
      } 

      
      console.log("Response status:", response.status);
      console.log(errors);

    }

    useEffect(() => {
      console.log("User after successful login:", auth.user);
    }, [auth.user]);

    

    return(
        <View style={styles.inputContainer}>
            {errors.map(error => <Text key={error}>{error}</Text>)}
        <Text  maxLength={50} style={styles.header}>Username:</Text>
        <TextInput style={styles.input} onChangeText={usernameHandler} value={username} />
        <Text style={styles.header}>Password:</Text>
        <TextInput style={styles.input} secureTextEntry={true} onChangeText={passwordHandler} value={password} />

            <View style={styles.buttonContainer}>
                <View style={styles.buttons}>
                <PrimaryButton onPress={submitHandler} text="Login" />
                </View>
 
            </View>
              
            <View style={styles.signIn} >
              <GoogleButton />
                              
              <Button title="Don't have an account yet?" />
            </View>
            

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
    signIn: {
      paddingBottom: 650,
    },
});