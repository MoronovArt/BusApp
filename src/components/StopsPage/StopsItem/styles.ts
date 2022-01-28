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
    },
    StopsItem_IconStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain'
    },
    StopsItem_IconStyleRed: {
        backgroundColor: Colors.PrimaryRed
    },
    StopsItem_IconStyleGreen: {
        backgroundColor: Colors.Green
    },
    StopsItem_IconStyleBlue: {
        backgroundColor: Colors.Blue
    },
    StopsItem_IconContainerStyle: {
        marginRight:scale(4),
        paddingVertical: verticalScale(6),
        paddingHorizontal: scale(5),
        borderRadius: 10,
        height: moderateScale(35),
        width: moderateScale(35)
    }
});
