import { StyleSheet, Text, View, Pressable } from "react-native";

const LinkText = (props) => {
    return (
        
        <View style={styles.buttonOuterContainer}>
            <Pressable style={({pressed}) => pressed && styles.pressedItem} onPress={props.onPress}>
                <Text style={styles.text}>{props.text}</Text>
            </Pressable>   
        </View>
        


    );
}

export default LinkText;

const styles = StyleSheet.create({
    pressedItem: {
        backgroundColor: "#ce856d",

    },
    text: {
        marginLeft: 10,
        color: "#563624",
        textAlign: "center",
        textDecorationLine: "underline",
    },
});

