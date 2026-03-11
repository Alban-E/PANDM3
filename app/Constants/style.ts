import { StyleSheet } from "react-native";

// Color palette
// --bone: #e7e0cf;
// --grey: #5b5a5f;
// --camel: #b99d82;
// --floral-white: #f7f4e8;
// --palm-leaf: #959777;
// --Text: #BB5B24

export const styles = StyleSheet.create({
    SplashBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5b5a5f",
    },
    SplashLogo: {
        height: 300,
        width: 300,
        marginBottom: 50,
        borderRadius: 30,
    },
    loadingTxt: {
        backgroundColor: "#e7e0cf",
        borderRadius: 5,
        padding: 10,
        color: "#BB5B24",
        fontWeight: "bold",
        fontSize: 30,
    },
    HomeBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    DetailsBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

})