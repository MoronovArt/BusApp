import {StyleSheet} from "react-native";
import Colors from "../../styles/Colors";

export const styles = StyleSheet.create({
    QrPage: {
        backgroundColor: Colors.Gray,
        flex:1
    },
    QrLoader: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
    },
});
