import { View, Image, Text, TouchableOpacity } from "react-native";
import {styles} from "./Constants/style";
import { useRouter, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";

export default function Index(){
    return(
        <View style={styles.SplashBackground}>
            <Image source={require('../assets/icon.png')} style={styles.SplashLogo}/>
            <Text style={styles.loadingTxt}>Loading . . .</Text>
        </View>
);
}