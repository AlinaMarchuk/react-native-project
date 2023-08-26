import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
import Arrow from "react-native-vector-icons/FontAwesome5";
import { addComment } from "../redux/rootReducer/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import SvgComponent from "../assets/inputSvg";
import { addCommentDB } from "../firebase/operations";
import { Formik } from "formik";

const CommentScreen = () => {
  const state = useSelector((state) => state.chosenPub);
  const dispatch = useDispatch();

  const onBackHandler = () => {
    console.log("WTF");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TouchableHighlight
          onPress={onBackHandler}
          style={{ backgroundColor: "red" }}
        >
          <Icon
            name="arrowleft"
            size={24}
            color="#212121"
            style={{
              position: "absolute",
              top: 54,
              left: 16,
            }}
          />
        </TouchableHighlight>
        <View style={styles.header}>
          <Text style={styles.headerText}>Коментарі</Text>
        </View>
        <View>
          <Image source={{ uri: state.image }} style={styles.image}></Image>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 30,
              justifyContent: "center",
            }}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/reactnativetutorial-d05d0.appspot.com/o/avatars%2Favatar-source.jpeg?alt=media&token=f755e837-c2aa-4799-aad3-68bc1acb7391",
              }}
            />
            <View style={styles.comment}>
              <Text style={styles.commentText}>
                Really love your most recent photo. I’ve been trying to capture
                the same thing for a few months and would love some tips!
              </Text>
              <Text style={styles.commentDate}>09 червня, 2020 | 08:40</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={async ({ message }) => {
          console.log("id:", state.id);
          try {
            const res = await addCommentDB({ message, id: state.id });
            console.log("res", res);
            dispatch(addComment({ message }));
          } catch (error) {
            console.log("send comment error:", error);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Коментувати"
              onChangeText={handleChange("message")}
              onBlur={handleBlur("message")}
              value={values.message}
            />
            <TouchableHighlight
              onPress={handleSubmit}
              style={{
                position: "absolute",
                top: 6,
                right: 10,
                zIndex: 2,
              }}
            >
              <Arrow name="arrow-circle-up" size={34} color="#FF6C00" />
            </TouchableHighlight>
            <SvgComponent style={styles.svgInput} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  header: {
    height: 88,
    background: "#FFF",
    justifyContent: "center",
    backdropFilter: "blur(13.591408729553223px)",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Roboto",
    marginHorizontal: "auto",
    marginTop: 44,
    paddingHorizontal: 48,
    paddingVertical: 11,
    fontSize: 17,
  },
  image: {
    width: 343,
    height: 240,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
  comment: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    width: 300,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentText: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 13,
  },
  commentDate: {
    color: "#BDBDBD",
    textAlign: "right",
    fontFamily: "Roboto",
    fontSize: 10,
    marginTop: 10,
  },
  inputContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    position: "fixed",
    bottom: 20,
    borderRadius: 30,
  },
  commentInput: {
    width: 343,
    height: 50,
    padding: 16,
    zIndex: 1,
  },
  svgInput: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
