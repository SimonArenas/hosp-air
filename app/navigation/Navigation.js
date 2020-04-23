import React from "react";
import { Icon } from "react-native-elements";

import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import DoctorsScreenStacks from "./DoctorsStack";
import TopListScreenStacks from "./TopListStacks";
import SearchScreenStacks from "./SearchStacks";
import AccountScreenStacks from "./AccountStacks";

const NavigationStacks = createBottomTabNavigator(
  {
    Doctors: {
      screen: DoctorsScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Doctores",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="font-awesome"
            name="stethoscope"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },

    TopList: {
      screen: TopListScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Ranking",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="font-awesome" name="star" size={22} color={tintColor} />
        ),
      }),
    },

    Search: {
      screen: SearchScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="font-awesome" name="search" size={22} color={tintColor} />
        ),
      }),
    },
    Account: {
      screen: AccountScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Mi perfil",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="font-awesome"
            name="user-circle"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: "Doctors",
    order: ["Doctors", "TopList", "Search", "Account"],
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#02ab95",
    },
  }
);

export default createAppContainer(NavigationStacks);
