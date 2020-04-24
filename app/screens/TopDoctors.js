import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import Toast from "react-native-easy-toast";
import ListTopDoctors from "../components/Ranking/ListTopDoctors";
const db = firebase.firestore(firebaseApp);

const TopDoctors = (props) => {
  const { navigation } = props;
  const [doctors, setDoctors] = useState([]);
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      db.collection("doctors")
        .orderBy("rating", "desc")
        .limit(5)
        .get()
        .then((response) => {
          const doctorArray = [];
          response.forEach((doc) => {
            let doctor = doc.data();
            doctor.id = doc.id;
            doctorArray.push(doctor);
          });
          setDoctors(doctorArray);
        })
        .catch(() => {
          toastRef.current.show(
            "Error al cargar el ranking. Inténtelo más tarde"
          ),
            3000;
        });
    })();
  }, []);

  return (
    <View>
      <ListTopDoctors doctors={doctors} navigation={navigation} />
      <Toast ref={toastRef} position="center" opacity={0.8} />
    </View>
  );
};

export default TopDoctors;

const styles = StyleSheet.create({});
