import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const InfoUser = (props) => {
  const {
    userInfo: { uid, displayName, email, photoURL },
    SetReloadData,
    toastRef,
    SetIsLoading,
    SetTextLoading,
  } = props;

  const changeAvatar = async () => {
    const resultPermision = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const resultPermissionCamera =
      resultPermision.permissions.cameraRoll.status;
    if (resultPermissionCamera === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galería",
        1200
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show("Has cerrado la galería de imagenes", 1200);
      } else {
        uploadImage(result.uri, uid).then(() => {
          updatePhotoUrl(uid);
        });
      }
    }
  };
  //   Subir la imagen a Firebase
  const uploadImage = async (uri, nameImage) => {
    SetTextLoading("Actualizando avatar");
    SetIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`avatar/${nameImage}`);
    return ref.put(blob);
  };

  //   Actualizar avatar
  const updatePhotoUrl = (uid) => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (result) => {
        const update = {
          photoURL: result,
        };
        await firebase.auth().currentUser.updateProfile(update);
        SetReloadData(true);
        SetIsLoading(false);
      })
      .catch(() => {
        toastRef.current.show("Error al recuperar imagen del servidor", 1200);
      });
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={{
          uri: photoURL ? photoURL : "https://i.imgur.com/ejrV12s.jpg",
        }}
      />
      <View>
        <Text styles={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text>{email ? email : "Loggeado con Facebook"}</Text>
      </View>
    </View>
  );
};

export default InfoUser;

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
  },
});
