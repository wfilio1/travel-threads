import { StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";

const PrimaryButton = (props) => {
    return (
        
        <View style={styles.buttonOuterContainer}>
            <TouchableOpacity onPress={props.onPress}>
                <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>
        </View>
        


    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        backgroundColor: "#b5593a",
        padding:15,
        borderRadius: 28,
        overflow: "hidden",
        height: 50,
        width: 100,
    },
    text: {
        color: "white",
        textAlign: "center"
    },
});

