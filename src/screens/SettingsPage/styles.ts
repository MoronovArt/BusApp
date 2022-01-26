import {StyleSheet} from "react-native";
import Colors from "../../styles/Colors";
import {fontScale, moderateScale, scale, verticalScale} from "../../styles/Utils";

export const styles = StyleSheet.create({
    SettingsPage: {
        backgroundColor: Colors.PrimaryRed,
    },
    SettingsPage_ViewContent: {
        backgroundColor: Colors.Gray,
    },
    SettingsPage_Content: {
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10),
    },
    SettingsPage_CityTitle: {
        fontFamily: "Montserrat-Bold",
        color: Colors.Black,
        fontSize: fontScale(14),
        marginBottom: verticalScale(5)
    },
    SettingsPage_CityButton: {
        backgroundColor: Colors.White,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(5),
        paddingVertical: verticalScale(10),
        borderColor: Colors.PrimaryRed,
        borderWidth: 1,
    },
    iconStyle: {
        color: Colors.PrimaryRed,
        width: moderateScale(24)
    },
    SettingsPage_City: {
        flex:1,
        paddingHorizontal: scale(4),
        fontFamily: 'Montserrat-Medium',
        color: Colors.Black
    }
});
