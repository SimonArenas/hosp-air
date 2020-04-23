import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";

const AccountOptions = () => {
  const menuOptions = [
    {
      title: "Cambiar nombres y apellidos",
      iconType: "font-awesome",
      iconNameLeft: "user",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => console.log("Changed display name"),
    },
    {
      title: "Cambiar email",
      iconType: "font-awesome",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => console.log("Changed display email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "font-awesome",
      iconNameLeft: "key",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => console.log("Changed display contraseña"),
    },
  ];
  return (
    <View>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          onPress={menu.onPress}
          containerStyle={styles.menuItem}
        />
      ))}
    </View>
  );
};

export default AccountOptions;

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
