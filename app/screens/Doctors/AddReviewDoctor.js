import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import Toast from "react-native-easy-toast";

import Loading from "../../components/Loading";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const AddReviewDoctor = (props) => {
  const { navigation } = props;
  const { idDoctor, setReviewReload } = navigation.state.params;

  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState(null);
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toastRef = useRef();

  const addReview = () => {
    if (rating === null) {
      toastRef.current.show("No ha dado ninguna puntuación", 1200);
    } else if (!title) {
      toastRef.current.show("El título es obligatorio", 1200);
    } else if (!review) {
      toastRef.current.show("El comentario es obligatorio", 1200);
    } else {
      setIsLoading(true);
      const user = firebase.auth().currentUser;
      const payload = {
        idUser: user.uid,
        avatarUser: user.photoURL,
        idDoctor: idDoctor,
        title: title,
        review: review,
        rating: rating,
        createAt: new Date(),
      };
      db.collection("reviews")
        .add(payload)
        .then(() => {
          updateDoctor();
        })
        .catch(() => {
          toastRef.current.show(
            "Error al enviar la review, inténtelo más tarde"
          );
          setIsLoading(false);
        });
    }
  };
  const updateDoctor = () => {
    const doctorRef = db.collection("doctors").doc(idDoctor);

    doctorRef.get().then((response) => {
      const restaurantData = response.data();
      const ratingTotal = restaurantData.ratingTotal + rating;
      const quantityVoting = restaurantData.quantityVoting + 1;
      const ratingResult = ratingTotal / quantityVoting;

      doctorRef
        .update({ rating: ratingResult, ratingTotal, quantityVoting })
        .then(() => {
          setReviewReload(true);
          setIsLoading(false);
          navigation.goBack();
        });
    });
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          reviews={["Pésimo", "Deficiente", "Normal", "Muy bueno", "Excelente"]}
          defaultRating={0}
          size={35}
          onFinishRating={(value) => setRating(value)}
        />
      </View>
      <View style={styles.formReview}>
        <Input
          placeholder="Título"
          containerStyle={styles.input}
          onChange={(e) => setTitle(e.nativeEvent.text)}
        />
        <Input
          placeholder="Comentario..."
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={(e) => setReview(e.nativeEvent.text)}
        />
        <Button
          title="Enviar comentario"
          onPress={addReview}
          containerStyle={styles.container}
          buttonStyle={styles.btn}
        />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={isLoading} text="Enviando comentario" />
    </View>
  );
};

export default AddReviewDoctor;

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2",
  },
  formReview: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    marginTop: 40,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 150,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 10,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
