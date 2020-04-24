import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SearchBar, ListItem, Icon, Image } from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";
import { FlatList } from "react-native-gesture-handler";
import { useDebouncedCallback } from "use-debounce";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });
const Search = (props) => {
  const { navigation } = props;
  const [doctors, setDoctors] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch();
  }, [search]);

  const [onSearch] = useDebouncedCallback(() => {
    if (search) {
      fireSQL
        .query(`SELECT * FROM doctors WHERE name LIKE '${search}%'`)
        .then((response) => {
          setDoctors(response);
        });
    }
  }, 300);
  return (
    <View>
      <SearchBar
        placeholder="Busca tu doctor"
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
      />
      {doctors.length === 0 ? (
        <View>
          <NotFoundDoctor />
        </View>
      ) : (
        <FlatList
          data={doctors}
          renderItem={(doctor) => (
            <Doctor doctor={doctor} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

function Doctor(props) {
  const { doctor, navigation } = props;

  const { name, images } = doctor.item;
  const [imageDoctor, setImageDoctor] = useState(null);

  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`doctores-imagenes/${image}`)
      .getDownloadURL()
      .then((response) => {
        setImageDoctor(response);
      });
  }, []);

  return (
    <ListItem
      title={name}
      leftAvatar={{ source: { uri: imageDoctor } }}
      rightIcon={<Icon type="font-awesome" name="chevron-right" />}
      onPress={() => navigation.navigate("Doctor", { doctor: doctor.item })}
    />
  );
}

function NotFoundDoctor() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../assets/img/not-found.png")}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
  },
});
