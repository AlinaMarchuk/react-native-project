import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import ExitSvg from "../assets/exitSvg";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Публікації</Text>
        <TouchableHighlight>
          <ExitSvg />
        </TouchableHighlight>
      </View>
      <View style={styles.body}>
        <View style={styles.photoBox}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
            }}
            source={require("../assets/rectangle.png")}
          />
          <View styles={styles.photoInfo}>
            <Text>Natali Romanova</Text>
            <Text>email@example.com</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 88,
    background: "#FFF",
    justifyContent: "center",
    backdropFilter: "blur(13.591408729553223px)",
    shadowColor: "rgba(0, 0, 0, 0.30)",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 1,
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
  body: {
    height: 640,
  },
  photoBox: {
    flexDirection: "row",
    gap: 8,
    marginLeft: 16,
    marginTop: 32,
  },
  photoInfo: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    height: "100%",
  },
  footer: {
    height: 83,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
