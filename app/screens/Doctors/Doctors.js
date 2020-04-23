import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListDoctors from "../../components/Doctors/ListDoctors";
const db = firebase.firestore(firebaseApp);

export default function Doctors(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [startDoctors, setStartDoctors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [isReloadDoctors, setIsReloadDoctors] = useState(false);
  const limitDoctors = 25;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("doctors")
      .get()
      .then((snap) => {
        setTotalDoctors(snap.size);
        
      });

      

    // Viejo
    (async () => {
      const resultDoctors = [];

      const doctors = db
        .collection("doctors")
        .orderBy("createAt", "desc")
        .limit(limitDoctors);

      await doctors.get().then((response) => {
        setStartDoctors(response.docs[response.docs.length - 1]);

        response.forEach((doc) => {
          let doctor = doc.data();
          doctor.id = doc.id;
          resultDoctors.push({ doctor });
        });
        setDoctors(resultDoctors);
      });
    })();
    setIsReloadDoctors(false);
  }, [isReloadDoctors]);

  const handleLoadMore = async () => {
    const resultDoctors = [];
    doctors.length < totalDoctors && setIsLoading(true);

    const doctorsDb = db
      .collection("doctors")
      .orderBy("createAt", "desc")
      .startAfter(startDoctors.data().createAt)
      .limit(limitDoctors);

    await doctorsDb.get().then((response) => {
      if (response.docs.length > 0) {
        setStartDoctors(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      response.forEach((doc) => {
        let doctor = doc.data();
        doctor.id = doc.id;
        resultDoctors.push({ doctor });
      });

      setDoctors([...doctors, ...resultDoctors]);
    });
  };

  return (
    <View style={styles.viewBody}>
      <ListDoctors
      doctors={doctors}
      isLoading={isLoading}
      handleLoadMore={handleLoadMore}
      navigation={navigation}
      />
      {user && (
        <AddDoctorButton
          navigation={navigation}
          setIsReloadDoctors={setIsReloadDoctors}

        />
      )}
    </View>
  );
}

function AddDoctorButton(props) {
  const { navigation, setIsReloadDoctors } = props;

  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() =>
        navigation.navigate("AddDoctor", { setIsReloadDoctors })
      }
    />
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
});
