import { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Modal, Text} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import AuthContext from "../context/AuthContext"
import { useNavigation, useRoute } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown'

const QuestionForm = (props) => {

    const auth = useContext(AuthContext);

    const navigation = useNavigation();
  
    const [questionTitle, setQuestionTitle] = useState("");

    const [questionInput, setQuestionInput] = useState("");

    const [userId, setUserId] = useState(0);

    const [categoryId, setCategoryId] = useState(0);

    const [errors, setErrors] = useState([]);

    const [catName, setCatName] = useState("");

    const categories = ["General Travel Questions","Destination-specific","Travel Planning and Tips","Accommodation and Transportation","Travel Experiences and Stories"];

    const categoryMapping = {
      "General Travel Questions": 1,
      "Destination-specific": 2,
      "Travel Planning and Tips": 3,
      "Accommodation and Transportation": 4,
      "Travel Experiences and Stories": 5
    };


      const route = useRoute();
      const { questionId } = route.params;
    

    const questionTitleHandler = (enteredText) => {
      setQuestionTitle(enteredText);
    }

    const questionInputHandler = (enteredText) => {
        setQuestionInput(enteredText);
      }

    const categoryHandler = (selectedItem, index) => {
      const categoryNumber = categoryMapping[selectedItem];
      setCategoryId(categoryNumber);
      console.log(`Selected category: ${selectedItem}, Category number: ${categoryNumber}`); //for debugging purposes

    }

    const getCategoryNameByNumber = (catId) => {
      for(const catName in categoryMapping) {
        if(categoryMapping[catName] === catId) {
          return catName;
        }
      }
      return "Select a Category";
    }

    useEffect(() => {
      if (parseInt(questionId) !== 0) {
        //fetch the question to edit
        console.log("EDIT MODE")

        let url = `http://localhost:8080/api/question/${questionId}`;
        fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + auth.user.token,
          },
      })
        .then(response => {
          if(response.ok) {
            return response.json();
          } else {
            //if response is not OK.. what do we do?
            console.log(`Unexpected response status code: ${response.status}`);
          }
        })
        .then(q => {
          setQuestionTitle(q.questionTitle);
          setQuestionInput(q.questionInput);
          setUserId(q.userId);
          setCategoryId(parseInt(q.categoryId));
          setCatName(getCategoryNameByNumber(q.categoryId));
        })
        .catch(error => {
          console.error(error);
        });

      } else {
        resetState();
      }
    }, [])


    const handleSubmit = (evt) => {
      evt.preventDefault()

      console.log(questionId);
  
      const newPost = {
        questionTitle, questionInput, userId, categoryId
      }
  
      let verb = "POST";
      let url = "http://localhost:8080/api/question"

      if(questionId != 0) {
        newPost.questionId = parseInt(questionId);
        verb = "PUT"
        url = url + "/" + questionId;
      }
  
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
          return response.json();
        } else {
          return response.json().then(errors => {
            if (Array.isArray(errors)) {
              setErrors(errors);
            } else {
              setErrors([errors]);
            }
            throw new Error("Error while submitting the form");
          });
        }
      })
      .then(q => {
        resetState();
        navigation.navigate("Question", { questionId: q.questionId });
      })
      .catch(error => {
        console.error(error);
      });
  
    }


    const loadLoginPage = () => {
      navigation.navigate("Login");
      
    }

    const handleCancel = () => {
      navigation.navigate("Home");
    }

    const resetState = () => {
      setQuestionTitle("");
      setQuestionInput("");
      setCategoryId(0);
    }

    return (
      <View style={styles.container}>
        {auth.user ? (
              <View style={styles.inputContainer}>
                {errors.map(error => <Text style={styles.errorText} key={error}>{error}</Text>)}
                <Text style={styles.subjectHeader}>Category:</Text>
                <SelectDropdown
                  data={categories}
                  onSelect={categoryHandler}
                  buttonStyle={styles.titleInput}
                  buttonTextStyle={styles.dropdownText}
                  defaultButtonText={catName}
                  buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                  rowTextForSelection={(item, index) => item}
                />

                  <Text  maxLength={50} style={styles.subjectHeader}>Subject:</Text>
                  <TextInput style={styles.titleInput} onChangeText={questionTitleHandler} value={questionTitle} />
                  <Text style={styles.subjectHeader}>Message:</Text>
                  <TextInput editable multiline style={styles.messageInput} onChangeText={questionInputHandler} value={questionInput} />

              <View style={styles.buttonContainer}>
                <View style={styles.buttons}>
                  <PrimaryButton onPress={handleSubmit} text="Create Question" />
                </View>
                <View style={styles.buttons}>
                  <PrimaryButton onPress={handleCancel} text="Cancel" />
                </View>
              </View>

            </View>
        ) 
          : (
            <View style={styles.inputContainer}>
              <Text>You need to be logged in to create a question.</Text>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={loadLoginPage} text="Login" />
                <PrimaryButton onPress={handleCancel} text="Cancel" />
              </View>
            </View>
          )}
      </View>
    );
}

export default QuestionForm;

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex:1,
      backgroundColor: "#fef9f8"
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fef9f8"
      },
      subjectHeader: {
        color: "#b5593a",
        alignSelf: "flex-start",
        marginLeft: 45,
        fontSize: 20,
        fontWeight: "bold",
      },
      dropdownText: {
        color: "#b5593a",
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
      margin: 3,
      marginBottom: 5,
    },
});