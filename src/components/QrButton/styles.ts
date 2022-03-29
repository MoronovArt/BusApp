import Colors from "../../styles/Colors";
import {moderateScale} from "../../styles/Utils";
import {Platform, StyleSheet} from "react-native";
export const styles = StyleSheet.create({
    iconQRStyle: {
        color: Colors.White,
        width: Platform.OS === 'ios' ? moderateScale(50) : moderateScale(40)
    },
    IconQRContainer: {
        backgroundColor: Colors.PrimaryRed,
        width: Platform.OS === 'ios' ? moderateScale(65) : moderateScale(55),
        height: Platform.OS === 'ios' ? moderateScale(65) : moderateScale(55),
        justifyContent: "center",
        alignItems: "center",
    },
});
