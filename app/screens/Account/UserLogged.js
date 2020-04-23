import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/Account/AccountOptions";

const UserLogged = () => {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, SetReloadData] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const [textLoading, SetTextLoading] = useState("");

  const toastRef = useRef();
  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    SetReloadData(false);
  }, [reloadData]);

  return (
    <View style={styles.viewUserInfo}>
      <InfoUser
        userInfo={userInfo}
        SetReloadData={SetReloadData}
        toastRef={toastRef}
        SetIsLoading={SetIsLoading}
        SetTextLoading={SetTextLoading}
      />
      <AccountOptions />
      <Button
        title="Cerrar sesión"
        onPress={() => firebase.auth().signOut()}
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
      />

      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading text={textLoading} isVisible={isLoading} />
    </View>
  );
};

export default UserLogged;

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSessionText: {
    color: "#00a680",
  },
});
