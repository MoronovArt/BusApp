import {StyleSheet} from "react-native";
import Colors from "../../../styles/Colors";
import {fontScale, moderateScale, scale, verticalScale} from "../../../styles/Utils";

export const styles = StyleSheet.create({
    iconStyle: {
        color: Colors.PrimaryRed,
        width: moderateScale(24)
    },
    StopsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10),
        borderBottomWidth:0.5,
    },
    StopsItem_Text: {
        flex:1,
        fontFamily: "Montserrat-Medium",
        fontSize: fontScale(14),
        color: Colors.Black
    }
});
