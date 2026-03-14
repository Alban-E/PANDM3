import { StyleSheet } from "react-native";

// Color palette
export const Colors = {
    lightBackGround: "#f7f4e8",
    darkBackground: "#5b5a5f",
    title: "#BB5B24",
    darkText: "#342823",
    ligthText: "#F8F7F6",
}

export const styles = StyleSheet.create({
    SplashBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.darkBackground,
    },
    SplashLogo: {
        height: 300,
        width: 300,
        marginBottom: 50,
        borderRadius: 30,
    },
    loadingTxt: {
        backgroundColor: Colors.lightBackGround,
        borderRadius: 5,
        padding: 10,
        margin: 10,
        color: Colors.title,
        fontWeight: "bold",
        fontSize: 30,
    },
    HomeBackground: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: Colors.darkBackground,
        justifyContent: "center",
        alignItems: "center",
    },
    HomeTitle: {
        color: Colors.title,
        fontWeight: "bold",
        fontSize: 50,
    },
    SearchBar: {
        fontSize: 50,
        backgroundColor: Colors.lightBackGround,
        color: Colors.darkText,
        borderRadius: 10,
        width: 350,
        marginTop: 20,
        padding: 5,
    },
    MealCard: {
        flex: 1,
        backgroundColor: Colors.lightBackGround,
        borderRadius: 20,
        marginLeft: 45,
        marginRight: 45,
        marginTop: 45,
        justifyContent: "center",
        alignItems: 'center',
    },
    MealcardImage:{
        borderRadius: 20,
        padding: 10,
        height: 300,
        width: 300,
    },
    MealCardName: {
        color: Colors.darkText,
        paddingBottom: 10,
        fontSize: 20,
    },
    DetailsBackground: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.darkBackground,
    },
    MealTitle: {

    },
    MealCategory: {

    },
    MealArea:{

    },
    MealInstructions: {

    },
    MealThumb: {
        height: 100,
        width: 100,
    },
    MealTags: {

    },
    MealVideo: {

    },
    MealIngredients: {

    },
    MealMeasures: {

    }
})