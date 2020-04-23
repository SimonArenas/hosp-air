import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
var uuid = require("random-uuid-v4");
var uuidv4 = uuid();

const code = uuidv4;

const db = firebase.firestore(firebaseApp);
const widthScreen = Dimensions.get("window").width;

const AddDoctorForm = (props) => {
  const { toastRef, setIsLoading, navigation, setIsReloadDoctors } = props;
  const [imagesSelected, SetImagesSelected] = useState([]);

  const [doctorName, setDoctorName] = useState("");
  const [doctorDescription, setDoctorDescription] = useState("");
  const [doctorSpeciality, setDoctorSpeciality] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");

  const addDoctor = () => {
    if (
      !doctorName ||
      !doctorDescription ||
      !doctorSpeciality ||
      !doctorPhone
    ) {
      toastRef.current.show(
        "Todos los campos del formulario son obligatorios",
        2000
      );
    } else if (imagesSelected.length === 0) {
      toastRef.current.show(
        "El doctor tiene que tener al menos una foto",
        2000
      );
    } else {
      setIsLoading(true);
      uploadImageStorage(imagesSelected).then((arrayImages) => {
        db.collection("doctors")
          .add({
            name: doctorName,
            description: doctorDescription,
            speciality: doctorSpeciality,
            phone: doctorPhone,
            images: arrayImages,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createBy: firebaseApp.auth().currentUser.uid,
          })
          .then(() => {
            setIsLoading(false);
            setIsReloadDoctors(true);
            navigation.navigate("Doctors");
          })
          .catch((error) => {
            setIsLoading(false);
            toastRef.current.show("Error al subir. Inténtelo más tarde");
          });
      });
    }
  };

  const uploadImageStorage = async (imageArray) => {
    const imagesBlob = [];
    await Promise.all(
      imageArray.map(async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage().ref("doctores-imagenes").child(uuid());
        await ref.put(blob).then((result) => {
          imagesBlob.push(result.metadata.name);
        });
      })
    );
    return imagesBlob;
  };

  return (
    <ScrollView>
      <ImagePortada ImagePortada={imagesSelected[0]} />
      <FormAdd
        setDoctorName={setDoctorName}
        setDoctorDescription={setDoctorDescription}
        setDoctorSpeciality={setDoctorSpeciality}
        setDoctorPhone={setDoctorPhone}
      />
      <UploadImage
        imagesSelected={imagesSelected}
        SetImagesSelected={SetImagesSelected}
        toastRef={toastRef}
      />
      <Button
        title="Enviar"
        onPress={addDoctor}
        buttonStyle={styles.btnAddDoctor}
      />
    </ScrollView>
  );
};

function ImagePortada(props) {
  const { ImagePortada } = props;

  return (
    <View style={styles.viewPhoto}>
      {ImagePortada ? (
        <Image
          source={{ uri: ImagePortada }}
          style={{ width: widthScreen, height: 200 }}
        />
      ) : (
        <Image
          source={require("../../../assets/img/no-image.png")}
          style={{ width: widthScreen, height: 200 }}
        />
      )}
    </View>
  );
}

function UploadImage(props) {
  const { imagesSelected, SetImagesSelected, toastRef } = props;
  const imageSelect = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galería."),
        2000;
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show("Has cerrado la galería de imagenes", 1200);
      } else {
        SetImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };
  const removeImage = (image) => {
    const arrayImages = imagesSelected;
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro de que deseas eliminar la imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            SetImagesSelected(
              arrayImages.filter((imageUrl) => imageUrl !== image)
            );
          },
        },
        {
          cancelable: false,
        },
      ]
    );
  };

  return (
    <View style={styles.viewImages}>
      {imagesSelected.length < 5 && (
        <Icon
          type="font-awesome"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {imagesSelected.map((imageDoctor, index) => (
        <Avatar
          key={index}
          onPress={() => removeImage(imageDoctor)}
          style={styles.miniatureStyle}
          source={{ uri: imageDoctor }}
        />
      ))}
    </View>
  );
}
export default AddDoctorForm;

function FormAdd(props) {
  const {
    setDoctorName,
    setDoctorDescription,
    setDoctorSpeciality,
    setDoctorPhone,
  } = props;
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del doctor"
        containerStyle={styles.input}
        onChange={(e) => setDoctorName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Descripción"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setDoctorDescription(e.nativeEvent.text)}
      />
      <Input
        placeholder="Especialidad"
        containerStyle={styles.input}
        onChange={(e) => setDoctorSpeciality(e.nativeEvent.text)}
      />
      <Input
        placeholder="Número de teléfono"
        containerStyle={styles.input}
        keyboardType="numeric"
        onChange={(e) => setDoctorPhone(e.nativeEvent.text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },

  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddDoctor: {
    margin: 20,
    backgroundColor: "#00a680",
  },
});
