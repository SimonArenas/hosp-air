import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SocialIcon } from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../utils/Social";
import Loading from "../Loading";
import { withNavigation } from "react-navigation";

const LoginFacebook = (props) => {
  const { toastRef, navigation } = props;

  async function login() {
    try {
      await Facebook.initializeAsync("234676551104491");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        const credentials = firebase.auth.FacebookAuthProvider.credential(
          token
        );
        await firebase
          .auth()
          .signInWithCredential(credentials)
          .then(() => {
            navigation.navigate("Account");
          });
        // Get the user's name using Facebook's Graph API
        // const response = await fetch(
        //   `https://graph.facebook.com/me?access_token=${token}`
        // );
        // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <>
      <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={login}
      />
    </>
  );
};

export default withNavigation(LoginFacebook);

const styles = StyleSheet.create({});
