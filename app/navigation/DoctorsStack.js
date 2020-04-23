import { createStackNavigator } from "react-navigation-stack";
import DoctorsScreen from "../screens/Doctors/Doctors";
import AddDoctorScreen from "../screens/Doctors/AddDoctor";
import DoctorScreen from "../screens/Doctors/Doctor";

const DoctorsScreenStacks = createStackNavigator({
  Doctors: {
    screen: DoctorsScreen,
    navigationOptions: () => ({
      title: "Doctores👨🏻‍⚕️",
    }),
  },
  AddDoctor: {
    screen: AddDoctorScreen,
    navigationOptions: () => ({
      title: "Nuevo doctor",
    }),
  },
  Doctor: {
    screen: DoctorScreen,
    navigationOptions: (props) => ({
      title: props.navigation.state.params.doctor.item.doctor.name,
    }),
  },
});

export default DoctorsScreenStacks;
