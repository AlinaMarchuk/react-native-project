import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import SvgComponent from "../assets/inputSvg";
import SvgComponentPhoto from "../assets/photoSvg";

const RegistrationScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/photobg.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <Formik
            initialValues={{ displayName: "", email: "", password: "" }}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <Text style={styles.formHeader}>Реєстрація</Text>
                <SvgComponentPhoto />
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <View style={[styles.inputContainer, { marginTop: 55 }]}>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Логін"
                      onBlur={handleBlur("displayName")}
                      onChangeText={handleChange("displayName")}
                      value={values.displayName}
                    ></TextInput>
                    <SvgComponent style={styles.inputSvg}></SvgComponent>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Адреса електронної пошти"
                      onBlur={handleBlur("email")}
                      onChangeText={handleChange("email")}
                      value={values.email}
                    ></TextInput>
                    <SvgComponent style={styles.inputSvg}></SvgComponent>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Пароль"
                      onBlur={handleBlur("password")}
                      onChangeText={handleChange("password")}
                      value={values.password}
                    ></TextInput>
                    <SvgComponent style={styles.inputSvg}></SvgComponent>
                  </View>
                </KeyboardAvoidingView>
                <Pressable style={styles.formButton} onPress={handleSubmit}>
                  <Text style={styles.buttonTitle}>Зареєстуватися</Text>
                </Pressable>

                <Text style={styles.formFooter}>Вже є акаунт? Увійти</Text>
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
    marginTop: 263,
  },
  formHeader: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontStyle: "normal",
    marginTop: 92,
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
    top: 330,
    left: 271,
  },
});

export default RegistrationScreen;
