import { StyleSheet, View, Text } from "react-native";
import Constants from 'expo-constants';
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import FormModal from "./FormModal";

const DiscussionBoard = () => {

    const [formIsVisible, setFormIsVisible] = useState(false);

    const startFormHandler = () => {
        setFormIsVisible(true);

    }

    const endQuestionHandler = () => {
        setFormIsVisible(false);
    }

    const createQuestionHandler = () => {

    }

    return(
        <View style={styles.container}>
            <FormModal createQuestionHandler={createQuestionHandler} visible={formIsVisible} onCloseModal={endQuestionHandler} />
            <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                    <Text style={styles.forumHeader}>Discussion Board</Text>
                    <PrimaryButton text="Ask a Question" onPress={startFormHandler}/>
                </View>
                <View style={styles.tableRow}>
                <View style={styles.topicHeader}>
                    <Text style={styles.textHeader}>Topic</Text>
                </View>
                <View style={styles.tableColumnHeader2}>
                    <Text style={styles.textHeader}>Date</Text>
                </View>
                <View style={styles.tableColumnHeader2}>
                    <Text style={{...styles.textHeader, justifyContent: "flex-end"}}>Posts</Text>
                </View>
                </View>
                <View style={styles.tableRow}>
                <View style={styles.tableTopicRegular}>
                    <Text style={styles.textLineItem}>Placeholder for topic of this board</Text>
                </View>
                <View style={styles.tableColumnRegular}>
                    <Text style={styles.textLineItem}>placeholder</Text>
                </View>
                <View style={styles.tableColumnRegular}>
                    <Text style={{...styles.textLineItem, justifyContent: "flex-end"}}>placeholder</Text>
                </View>
                </View>
            </View>
    </View>
  );
}

export default DiscussionBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 10,
      },
      tableContainer: {
        flex: 1,
      },
      tableRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
      },
      tableColumnHeader: {
        flex: 4,
        flexDirection: "row",
        height: 25,
        alignItems: "center",
        justifyContent: "center"
      },
      tableColumnHeader2: {
        flex: 2,
        flexDirection: "row",
        backgroundColor: "#c47062",
        height: 25,
        alignItems: "center",
        justifyContent: "center"
      },
      topicHeader: {
        flex: 4,
        flexDirection: "row",
        backgroundColor: "#c47062",
        height: 25,
        alignItems: "center",
        justifyContent: "center"
      },
      tableColumnRegular: {
        flex: 2,
        flexDirection: "column",
        backgroundColor: "#c7c7c7",
        alignItems: "center",
        height: 60,
        padding: 5
      },
      tableTopicRegular: {
        flex: 4,
        flexDirection: "column",
        backgroundColor: "#c7c7c7",
        alignItems: "center",
        height: 60,
        padding: 5,
        flexWrap: "wrap",
      },
      forumHeader: {
        color: "#b5593a",
        fontWeight: "bold",
        fontSize: 20,
      },
      textHeader: {
        color: "white"
      },
      textLineItem: {
        color: "black"
      }
});