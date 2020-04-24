import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import * as firebase from "firebase";

import { Card, Image, Rating } from "react-native-elements";

const ListTopDoctors = (props) => {
  const { doctors, navigation } = props;

  return (
    <FlatList
      data={doctors}
      renderItem={(doctor) => (
        <Doctor doctor={doctor} navigation={navigation} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

function Doctor(props) {
  const { doctor, navigation } = props;
  const { name, description, images, rating } = doctor.item;

  const [imageDoctor, setImagedoctor] = useState(null);
  console.log(doctor);

  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`doctores-imagenes/${image}`)
      .getDownloadURL()
      .then((response) => {
        setImagedoctor(response);
      });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("OK")
      }}
    >
      <Card containerStyle={styles.containerCard}>
        <Image
          style={styles.doctorImage}
          resizeMode="cover"
          source={{ uri: imageDoctor }}
        />
        <View style={styles.titleRating}>
          <Text style={styles.title}>{name}</Text>
          <Rating
            imageSize={20}
            startingValue={rating}
            readonly
            style={styles.rating}
          />
        </View>
        <Text style={styles.description}>{description}</Text>
      </Card>
    </TouchableOpacity>
  );
}

export default ListTopDoctors;

const styles = StyleSheet.create({
  containerCard: {
    marginBottom: 30,
    borderWidth: 0,
  },
  doctorImage: {
    width: "100%",
    height: 200,
  },
  titleRating: {
    flexDirection: "row",
    marginTop: 10,
  },
  title: {
    width: "60%",
    fontSize: 20,
    fontWeight: "bold",
  },
  ration: {
    position: "absolute",
    right: 0,
  },
  description: {
    color: "grey",
    marginTop: 10,
    textAlign: "justify",
  },
});
