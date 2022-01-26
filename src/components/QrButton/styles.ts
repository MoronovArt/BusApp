import Colors from "../../styles/Colors";
import {moderateScale} from "../../styles/Utils";
import {StyleSheet} from "react-native";
export const styles = StyleSheet.create({
    iconQRStyle: {
        color: Colors.White,
        width: moderateScale(40)
    },
    IconQRContainer: {
        backgroundColor: Colors.PrimaryRed,
        width: moderateScale(55),
        height: moderateScale(55),
        justifyContent: "center",
        alignItems: "center",
    },
});
