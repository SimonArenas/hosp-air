import { createStackNavigator } from "react-navigation-stack";
import DoctorsScreen from "../screens/Doctors/Doctors";
import AddDoctorScreen from "../screens/Doctors/AddDoctor";
import DoctorScreen from "../screens/Doctors/Doctor";
import AddReviewDoctorScreen from "../screens/Doctors/AddReviewDoctor";

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
      // TODO: Changed
      // title: props.navigation.state.params.doctor.item.doctor.name,
      title: props.navigation.state.params.doctor.name,
    }),
  },
  AddReviewDoctor: {
    screen: AddReviewDoctorScreen,
    navigationOptions: () => ({
      title: "Nuevo comentario",
    }),
  },
});

export default DoctorsScreenStacks;
