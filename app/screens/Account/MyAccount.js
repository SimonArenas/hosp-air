import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import UserLogged from "../../screens/Account/UserLogged";
import UserGuest from "../../screens/Account/UserGuest";

const MyAccount = () => {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) {
    return <Loading isVisible={true} text="Cargando" />;
  }
  return login ? <UserLogged /> : <UserGuest />;
};

export default MyAccount;
