import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import * as firebase from "firebase";

export default function ListDoctors(props) {
  const { doctors, isLoading, handleLoadMore, navigation } = props;

  return (
    <>
      <View></View>
      <View>
        {doctors ? (
          <FlatList
            data={doctors}
            renderItem={(doctor) => (
              <Doctor doctor={doctor} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
            ListFooterComponent={<FooterList isLoading={isLoading} />}
          />
        ) : (
          <View style={styles.loaderDoctors}>
            <ActivityIndicator size="large" />
            <Text>Cargando restaurantes</Text>
          </View>
        )}
      </View>
    </>
  );
}

function Doctor(props) {
  const { doctor, navigation } = props;
  const { name, speciality, images } = doctor.item.doctor;
  const [imageDoctor, setImageDoctor] = useState(null);

  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`doctores-imagenes/${image}`)
      .getDownloadURL()
      .then((result) => {
        setImageDoctor(result);
      });
  });

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Doctor", {doctor})}>
      <View></View>
      <View style={styles.viewDoctor}>
        <View style={styles.viewDoctorImage}>
          <Image
            resizeMode="cover"
            source={{ uri: imageDoctor }}
            style={styles.imageDoctor}
            PlaceholderContent={<ActivityIndicator color="#fff" />}
          />
        </View>
        <View>
          <Text style={styles.doctorName}>{name}</Text>
          <Text style={styles.doctorSpeciality}>{speciality}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loadingDoctors}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundDoctors}>
        <Text>Ya has llegado al final de la lista 😜</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingDoctors: {
    marginTop: 20,
    alignItems: "center",
  },
  viewDoctor: {
    flexDirection: "row",
    margin: 10,
  },
  viewDoctorImage: {
    marginRight: 15,
  },
  imageDoctor: {
    width: 80,
    height: 80,
  },
  doctorName: {
    fontWeight: "bold",
  },

  doctorSpeciality: {
    paddingTop: 2,
    color: "#00a680",
    //   width: 150,
    paddingLeft: 15,
    borderRadius: 15,
  },
  loaderDoctors: {
    marginTop: 10,
    marginBottom: 10,
  },

  notFoundDoctors: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
