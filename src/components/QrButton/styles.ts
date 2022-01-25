import Colors from "../../styles/Colors";
import {moderateScale} from "../../styles/Utils";
import {StyleSheet} from "react-native";
export const styles = StyleSheet.create({
    iconQRStyle: {
        color: Colors.White,
        width: moderateScale(35)
    },
    IconQRContainer: {
        backgroundColor: Colors.PrimaryRed,
        width: moderateScale(50),
        height: moderateScale(50),
        justifyContent: "center",
        alignItems: "center",
    },
});
