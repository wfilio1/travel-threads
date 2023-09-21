import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native"
import AuthContext from "../context/AuthContext"
import PrimaryButton from "../components/PrimaryButton";
import AnswerFormModal from "./AnswerFormModal";
import LinkText from "../components/LinkText";

const QuestionPage = () => {

    const auth = useContext(AuthContext);

    const route = useRoute();
    
    const { questionId } = route.params;

    const [question, setQuestion] = useState(null);

    const [answers, setAnswers] = useState([]);

    const [formIsVisible, setFormIsVisible] = useState(false);

    const [isUpdated, setIsUpdated] = useState(false);

    const navigation = useNavigation();


    useEffect(() => {
        loadAnswer(questionId);
      }, [isUpdated])

    useEffect(() => {
        if (auth.user && auth.user.token) {
            const url = "http://localhost:8080/api/question/" + questionId;
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + auth.user.token,
                },
            })
            .then((response) => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("Failed to fetch data");
                }
            })
            .then((questionData) => {
                setQuestion(questionData);
            })
            .catch((error) => {
                console.error(error);
                navigation.navigate("Login");
            });

        } else {
            navigation.navigate("Login");
        }

    }, []);

const loadAnswer = (questionId) => {
    fetch(`http://localhost:8080/api/answer`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch answers');
        }
    })
    .then(data => {
        const filteredAnswers = data.filter(answer => answer.questionId === parseInt(questionId));
        setAnswers(filteredAnswers);

    })
    .catch(error => {
        console.error(error);
    });
};

const startAnswerFormHandler = () => {
    setFormIsVisible(true);

}

const endAnswerFormHandler = () => {
    setFormIsVisible(false);
}

const editQuestionHandler = () => {
    navigation.navigate("Question Form", {questionId})

}

    return(
        <View style={styles.container}>
            <AnswerFormModal visible={formIsVisible} onCloseModal={endAnswerFormHandler} answerChecker={setIsUpdated} questionId={parseInt(questionId)}/>
            <View style={styles.postContainer}>
            {question ? (
                <View key={question.questionId}>
                <View style={styles.contentContainer}>
                    <Text style={styles.subject}>{question.questionTitle}</Text>
                    <LinkText text="edit" style={styles.editText} onPress={editQuestionHandler}/>
                </View>
    

        
                <View style={styles.contentContainer}>
                    <View style={styles.questionInput}>
                        <Text style={styles.textLineItem}>
                            
                            <Text style={styles.author}>{question.username}:</Text> {question.questionInput}
                        </Text>
                    </View>
                </View>
                </View>
            ) : (
                <Text>Loading...</Text>
            )}
            
            <FlatList data={answers} renderItem={itemData => {
                return (
                    <View style={styles.contentContainer}>
                        <View style={styles.answerInput}>
                            <Text style={styles.textLineItem}>
                                <Text style={styles.author}>{itemData.item.username}:</Text> {itemData.item.answerInput}
                            </Text>
                        </View>
                    </View>
                );
            }} alwaysBounchVertical={false}>
            </FlatList>
            <View style={styles.postButton} >
                <PrimaryButton text="Post" onPress={startAnswerFormHandler}/>
            </View>
            
            </View>
      </View>
    )
}

export default QuestionPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
      },
      postContainer: {
        flex: 1,
        marginBottom: 5,
      },
      contentContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        margin: 10,
      },
      subject: {
        color: "#b5593a",
        fontWeight: "bold",
        fontSize: 18,
      },
      questionInput: {
        flex: 4,
        flexDirection: "column",
        backgroundColor: "#b5593a8a",
        alignItems: "center",
        height: 60,
        padding: 5,
        flexWrap: "wrap",
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
      },
      answerInput: {
        flex: 4,
        flexDirection: "column",
        backgroundColor: "#c7c7c7",
        alignItems: "center",
        height: 60,
        padding: 5,
        flexWrap: "wrap",
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
      },
      textLineItem: {
        color: "black"
      },
      author: {
        fontWeight: "bold",
      },
      postButton: {
        flex:10,
        alignItems: "center",
      },
      editText: {
        color: "#5757c1"
      },

});