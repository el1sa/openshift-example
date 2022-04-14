// näkymä, jossa käyttäjä tekee valinnat
import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Radiobutton from "./Radiobutton";
import { TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Colorthemes from "./styles";

export default function Home({
  route,
  navigation,
  theme,
  funktiot,
  muuttujat,
  tyopaikat,
}) {

  const colorthemes = Colorthemes.colorthemes;

  // funktiot ja muuttujat app.js:stä propsina
  const lisaatagi = funktiot.lisaatagi;
  const poistatagi = funktiot.poistatagi;

  const tyopaikkaarray = muuttujat.tyopaikat;

  const [yesword, setYesword] = muuttujat.yesmuuttujat; // kyllä-tagin muistipaikka
  const [noword, setNoword] = muuttujat.nomuuttujat; // ei-tagin muistipaikka
  const [location, setLocation] = muuttujat.locationmuuttujat; //sijainnin muistipaikka

  const [yestags, setYestags] = muuttujat.yesarray; // kaikki kyllä-tagit
  const [notags, setNotags] = muuttujat.noarray; // kaikki ei-tagit
  const [locations, setLocations] = muuttujat.locationsarray; // halutut sijainnit

  const [userOptions, setUserOptions] = muuttujat.valintamuuttujat;

  function Tags(props) {
    return props.data.map((tag, index) => {
      if (tag != null) {
        return (
          <TouchableOpacity
            style={colorthemes.homeStyles.tagbutton}
            key={index}
            onPress={() => {
              poistatagi(index, props.setLitania);
            }}
          >
            <Text style={colorthemes.homeStyles.center}>{tag}</Text>
            <Ionicons
              name="close-outline"
              size={20}
              style={colorthemes.homeStyles.icon}
              color={theme.colors.lighttext}
            />
          </TouchableOpacity>
        );
      }
    });
  }

  return (
    <ScrollView style={colorthemes.homeStyles.form}>
      <Text style={colorthemes.homeStyles.paragraph}>Show jobs from selected companies:</Text>
      <Radiobutton
        tyopaikat={tyopaikkaarray}
        styles={colorthemes.homeStyles}
        valintamuuttujat={[userOptions, setUserOptions]}
      />
      <Text style={colorthemes.homeStyles.paragraph}>
        Show only jobs that contain keywords:
      </Text>
      <View style={colorthemes.homeStyles.horizontalform}>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setYesword(text)}
          value={yesword}
          label="Including keyword..."
          style={colorthemes.homeStyles.fill}
          returnKeyType="done"
          onSubmitEditing={() => lisaatagi(yesword, setYesword, setYestags)}
        ></TextInput>
        <Ionicons
          name="add-circle"
          size={40}
          color={theme.colors.card}
          onPress={() => lisaatagi(yesword, setYesword, setYestags)}
        />
      </View>
      <View style={colorthemes.homeStyles.horizontal}>
        <Tags data={yestags} setLitania={setYestags} />
      </View>
      <Text style={colorthemes.homeStyles.paragraph}>Exclude jobs that contain keywords:</Text>
      <View style={colorthemes.homeStyles.horizontalform}>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setNoword(text)}
          value={noword}
          label="Excluding keyword..."
          style={colorthemes.homeStyles.fill}
          returnKeyType="done"
          onSubmitEditing={() => lisaatagi(noword, setNoword, setNotags)}
        ></TextInput>
        <Ionicons
          name="add-circle"
          size={40}
          color={theme.colors.card}
          onPress={() => lisaatagi(noword, setNoword, setNotags)}
        />
      </View>
      <View style={colorthemes.homeStyles.horizontal}>
        <Tags data={notags} setLitania={setNotags} />
      </View>

      <Text style={colorthemes.homeStyles.paragraph}>Show only jobs from location(s):</Text>
      <View style={colorthemes.homeStyles.horizontalform}>
        <TextInput
          mode="outlined"
          onChangeText={(text) => setLocation(text)}
          value={location}
          label="Location..."
          style={colorthemes.homeStyles.fill}
          returnKeyType="done"
          onSubmitEditing={() => lisaatagi(location, setLocation, setLocations)}
        ></TextInput>
        <Ionicons
          name="add-circle"
          size={40}
          color={theme.colors.card}
          onPress={() => lisaatagi(location, setLocation, setLocations)}
        />
      </View>
      <View style={colorthemes.homeStyles.horizontal}>
        <Tags data={locations} setLitania={setLocations} />
      </View>
    </ScrollView>
  );
}
