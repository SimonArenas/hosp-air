import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as firebase from "firebase";
import Carrousel from "../../components/Carrousel";

const screenWidth = Dimensions.get("window").width;

const Doctor = (props) => {
  const { navigation } = props;
  const { doctor } = navigation.state.params.doctor.item;

  const [imagesDoctor, setImagesDoctor] = useState([]);
  console.log(imagesDoctor);

  useEffect(() => {
    const arrayUrls = [];
    (async () => {
      await Promise.all(
        doctor.images.map(async (idImage) => {
          await firebase
            .storage()
            .ref(`doctores-imagenes/${idImage}`)
            .getDownloadURL()
            .then((imageUrl) => {
              arrayUrls.push(imageUrl);
            });
        })
      );
      setImagesDoctor(arrayUrls);
    })();
  }, []);
  return (
    <View>
      <Carrousel arrayImages={imagesDoctor} width={screenWidth} height={200} />
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({});
