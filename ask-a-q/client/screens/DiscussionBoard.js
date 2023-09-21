import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import FormModal from "./QuestionForm";
import LinkText from "../components/LinkText";
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

const DiscussionBoard = () => {

    const navigation = useNavigation();

    const [board, setBoard] = useState([]);

    const [formIsVisible, setFormIsVisible] = useState(false);

    const [postCount, setPostCount] = useState(0);

    const [isUpdated, setIsUpdated] = useState(false);

    const isFocused = useIsFocused();

    const route = useRoute();

    const { id } = route.params;

    useEffect(() => {
      if (isFocused || isUpdated) {
        loadBoard();
        setIsUpdated(false)
      }
    }, [isFocused, isUpdated]);

    
    const startFormHandler = () => {
        setFormIsVisible(true);

    }

    const endQuestionHandler = () => {
        setFormIsVisible(false);
    }
   
    const loadBoard = () => {
      const url = "http://localhost:8080/api/question"
              fetch(url, {
                  method: "GET"
                })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Failed to fetch all questions');
          }
      })
      .then(data => {
          const filteredDataPerCategory = data.filter(question => question.categoryId === parseInt(id))

          setBoard(filteredDataPerCategory);
      })
      .catch(error => {
          console.error(error);
      });
  };
  
    // Add a new useEffect to fetch answers and update postCount
    useEffect(() => {
      const fetchAnswers = async () => {
        try {
          for (const q of board) {
            const response = await fetch(`http://localhost:8080/api/answer/${q.questionId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch answers');
            }
            const data = await response.json();
            // Update the postCount for the specific question
            setPostCount(prevPostCount => ({
              ...prevPostCount,
              [q.questionId]: data.length,
            }));
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchAnswers();
    }, [board]);
    
    
  

    return(
        <View style={styles.container}>
            <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                    <Text style={styles.forumHeader}>Discussion Board</Text>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.topicHeader}>
                      <Text style={styles.textHeader}>Topic</Text>
                  </View>
                  <View style={styles.tableAuthorHeader}>
                      <Text style={styles.textHeader}>Author</Text>
                  </View>
                  <View style={styles.tablePostHeader}>
                      <Text style={{...styles.textHeader, justifyContent: "flex-end"}}>Posts</Text>
                  </View>
                </View>
                {board.map(q => 
                  <View key={q.questionId} style={styles.tableRow}>
                  <View style={styles.tableTopicRegular}>
                      <LinkText text={q.questionTitle} style={styles.textLineItem} onPress={() => { navigation.navigate("Question", {questionId: q.questionId})} }/>
                  </View>
                  <View style={styles.tableAuthor}>
                      <Text style={styles.textLineItem}>{q.username}</Text>
                  </View>
      
                  <View style={styles.tablePostCount}>
                      <Text style={{...styles.textLineItem, justifyContent: "flex-end"}}>{postCount[q.questionId]}</Text>
                  </View>
                </View>
              
                  )}
                
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
      topicHeader: {
        flex: 3,
        flexDirection: "row",
        backgroundColor: "#de6c46",
        height: 25,
        alignItems: "center",
        justifyContent: "center"
      },
      tableTopicRegular: {
        flex: 3,
        flexDirection: "column",
        backgroundColor: "#cd9475",
        alignItems: "center",
        height: 60,
        padding: 5,
        flexWrap: "wrap",
      },
      tableAuthorHeader: {
        flex: 2.5,
        flexDirection: "row",
        backgroundColor: "#de6c46",
        height: 25,
        alignItems: "center",
        justifyContent: "center"
      },
      tableAuthor: {
        flex: 2.5,
        flexDirection: "column",
        backgroundColor: "#D7B19D",
        alignItems: "center",
        height: 60,
        padding: 5
      },
      tablePostHeader: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#de6c46",
        height: 25,
        alignItems: "center",
        justifyContent: "center"
      },
      tablePostCount: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#cd9475",
        alignItems: "center",
        height: 60,
        padding: 5
      },
      forumHeader: {
        color: "#9d4b30",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
      },
      textHeader: {
        color: "white"
      },
      textLineItem: {
        color: "#563624"
      }
});