import {StyleSheet} from "react-native";
import Colors from "../../styles/Colors";
import {moderateScale, verticalScale} from "../../styles/Utils";

export const styles = StyleSheet.create({
    CitiesSelectorPage_Title: {
        fontFamily: "Montserrat-Bold",
        textAlign: "center",
        color: Colors.Black,
        marginTop: verticalScale(10)
    },
    CitiesSelectorPage_Logo: {
        width: moderateScale(80),
        height: moderateScale(80)
    },
    CitiesSelectorPage_Header: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(20)
    }
})
