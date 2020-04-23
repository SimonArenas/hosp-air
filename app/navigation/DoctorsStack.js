import { createStackNavigator } from "react-navigation-stack";
import DoctorsScreen from "../screens/Doctors/Doctors";
import AddDoctorScreen from "../screens/Doctors/AddDoctor";

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
});

export default DoctorsScreenStacks;
