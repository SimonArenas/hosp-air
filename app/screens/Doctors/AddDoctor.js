import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddDoctorForm from "../../components/Doctors/AddDoctorForm";

const AddDoctor = (props) => {
  const { navigation } = props;
  const { setIsReloadDoctors } = navigation.state.params;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View>
      <AddDoctorForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
        setIsReloadDoctors={setIsReloadDoctors}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={isLoading} text="Creando doctor" />
    </View>
  );
};

export default AddDoctor;

const styles = StyleSheet.create({});
