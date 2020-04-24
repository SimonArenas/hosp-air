import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, View, Dimensions } from "react-native";
import * as firebase from "firebase";
import Carrousel from "../../components/Carrousel";
import { Rating, Icon, Divider } from "react-native-elements";
import ListReview from "../../components/Doctors/ListReview";

const screenWidth = Dimensions.get("window").width;

const Doctor = (props) => {
  const { navigation } = props;
  // TODO: CHANGED
  // const { doctor } = navigation.state.params.doctor.item;
  const { doctor } = navigation.state.params;

  const [imagesDoctor, setImagesDoctor] = useState([]);
  const [rating, setRating] = useState(doctor.rating);
 


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
    <ScrollView style={styles.viewBody}>
      <Carrousel arrayImages={imagesDoctor} width={screenWidth} height={200} />
      <TitleDoctor
        name={doctor.name}
        description={doctor.description}
        rating={doctor.rating}
        phone={doctor.phone}
        speciality={doctor.speciality}
        rating={rating}
      />
      <ListReview navigation={navigation} idDoctor={doctor.id} setRating={setRating}/>
    </ScrollView>
  );
};

function TitleDoctor(props) {
  const { name, description, rating, phone, speciality } = props;
  return (
    <View style={styles.viewDoctorTitle}>
      <View styles={{ flexDirection: "row" }}>
        <Text style={styles.nameDoctor}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>

      <Text
        style={{
          backgroundColor: "#00a680",
          alignSelf: "flex-start",
          padding: 5,
          marginTop: 5,
          color: "white",
        }}
      >
        {speciality}
      </Text>
      <Text style={styles.descriptionDoctor}>{description}</Text>
      <Divider style={styles.divider} />

      <Text style={styles.phoneDoctor}>📱 {phone}</Text>
    </View>
  );
}

export default Doctor;

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  viewDoctorTitle: {
    margin: 15,
  },
  nameDoctor: {
    fontSize: 20,
    fontWeight: "bold",
    width: "70%",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  descriptionDoctor: {
    marginTop: 15,
    color: "grey",
  },
  phoneDoctor: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    color: "orange",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 20,
  },
});
