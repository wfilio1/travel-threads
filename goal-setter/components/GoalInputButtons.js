import { StyleSheet, Text, View, Pressable } from "react-native";

const GoalInputButtons = (props) => {
    return (
        <Pressable onPress={props.onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </Pressable>
    );
}

export default GoalInputButtons;

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#943d24",
        borderRadius: 28,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    text: {
        color: "white",
        textAlign: "center"
    }
});