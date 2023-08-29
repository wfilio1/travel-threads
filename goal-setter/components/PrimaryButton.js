import { StyleSheet, Text, View, Pressable } from "react-native";

const PrimaryButton = (props) => {
    return (
        
        <View style={styles.buttonOuterContainer}>
            <Pressable style={({pressed}) => pressed && styles.pressedItem} onPress={props.onPress}>
                <Text style={styles.text}>{props.text}</Text>
            </Pressable>   
        </View>
        


    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        backgroundColor: "#b5593a",
        padding: 10,
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
    },
    pressedItem: {
        opacity: 0.75
    },
    text: {
        color: "white",
        textAlign: "center"
    },
});

