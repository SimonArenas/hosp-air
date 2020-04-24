import { createStackNavigator } from "react-navigation-stack";
import TopDoctorsScreen from "../screens/TopDoctors";

const TopListScreenStacks = createStackNavigator({
  topDoctors: {
    screen: TopDoctorsScreen,
    navigationOptions: () => ({
      title: "Los mejores doctores ⭐",
    }),
  },
});

export default TopListScreenStacks;
