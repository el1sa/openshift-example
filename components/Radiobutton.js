//TÄNNE RADIOBUTTONIN MUOTOILUT
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Checkbox } from "react-native-paper";

// PROPSINA HOME KOMPONENTISTA DATA ARRAYN VAIHTOEHDOT JA ONSELECT JOS KÄYTTÄJÄ TEKEE VALINNAN
export default function Radiobutton({ tyopaikat, styles, valintamuuttujat }) {
  const [userOption, setUserOption] = valintamuuttujat;
  // luodaan data-arrayn verran false-stateja:
  const [checked, setChecked] = useState(
    new Array(tyopaikat.length).fill(true)
  );

  // SELECTHANDLER AJAA ONSELECTIN SEKÄ CHECKAA + PÄIVITTÄÄ KÄYTTÄJÄN VALINNAN
  const selectHandler = (value, position) => {
    // vaihdetaan klikatun checkboxin sijaintia vastaava state:
    const updatedChecked = checked.map((item, index) =>
      index === position ? !item : item
    );
    // korvataan checked-statearray äsken päivitetyllä
    setChecked(updatedChecked);

    // päivitetään userOption-statearrayhyn nimet
    // jos nimi on jo arrayssa, filtteröidään se pois
    if (userOption.indexOf(value) > -1) {
      let filtered = userOption.filter((item) => item !== value);
      setUserOption(filtered);
      // jos nimi ei ole vielä arrayssa, lisätään se arrayn perään
    } else {
      setUserOption((userOption) => [...userOption, value]);
    }
  };
  return (
    <View style={styles.horizontal}>
      {tyopaikat.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              minWidth: "30%",
              flexGrow: 0,
              marginRight: "2%",
            }}
          >
            <Checkbox.Android
              value={item}
              // EHTO, JOSSA TARKASTETAAN, ONKO KÄYTTÄJÄN VALINTA SAMA KUIN JOKU BUTTONIN ARVOISTA
              status={checked[index] === true ? "checked" : "unchecked"}
              // ONPRESS AJAA SELECTHANDLER METODIN
              onPress={() => selectHandler(item, index)}
            />
            <Text>{item}</Text>
          </View>
        );
      })}
    </View>
  );
}
