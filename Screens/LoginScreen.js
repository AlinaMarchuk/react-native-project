import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import SvgComponent from "../assets/inputSvg";
import { Formik } from "formik";

const LoginScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/photobg.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <Text style={styles.formHeader}>Увійти</Text>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <View style={[styles.inputContainer, { marginTop: 60 }]}>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Адреса електронної пошти"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    ></TextInput>
                    <SvgComponent style={styles.inputSvg}></SvgComponent>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Пароль"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    ></TextInput>
                    <SvgComponent style={styles.inputSvg}></SvgComponent>
                  </View>
                </KeyboardAvoidingView>
                <Pressable style={styles.formButton} onPress={handleSubmit}>
                  <Text style={styles.buttonTitle}>Увійти</Text>
                </Pressable>

                <Text style={styles.formFooter}>
                  Немає аккаунту ? Зареєстуватися
                </Text>
                <Pressable style={styles.showPassword}>
                  <Text style={{ fontSize: 16 }}>Показати</Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    height: 549,
    flexShrink: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFF",
    marginTop: 323,
  },
  formHeader: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontStyle: "normal",
    marginTop: 32,
    //fontWeight: 500,
    // // lineHeight: "normal",
    // letterSpacing: 0.3,
  },
  inputContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 16,
  },
  formInput: {
    width: 343,
    height: 50,
    flexShrink: 0,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    zIndex: 1,
  },
  inputSvg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  formButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: 343,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 60,
  },
  buttonTitle: {
    fontSize: 16,
    lineHeight: 21,
    color: "white",
  },
  formFooter: {
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    marginTop: 16,
  },
  showPassword: {
    position: "absolute",
    top: 212,
    left: 271,
  },
});

export default LoginScreen;
