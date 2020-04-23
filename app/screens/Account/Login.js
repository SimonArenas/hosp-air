import React, { useRef } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Divider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast";
import LoginFacebook from "../../components/Account/LoginFacebook";

const Login = (props) => {
  const { navigation } = props;
  const toastRef = useRef();
  return (
    <ScrollView>
      <View style={styles.view}>
        <Image
          source={require("../../../assets/img/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount navigation={navigation} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef} navigation={navigation} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
};

function CreateAccount(props) {
  const { navigation } = props;
  return (
    <Text style={styles.textResgister}>
      ¿Aún no tienes una cuenta?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("Register")}
      >
        Regístrate
      </Text>
    </Text>
  );
}

export default Login;

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "60%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textResgister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
});
