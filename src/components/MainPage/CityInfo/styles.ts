import {StyleSheet} from "react-native";
import Colors from "../../../styles/Colors";
import {fontScale, moderateScale, scale, verticalScale} from "../../../styles/Utils";

export const styles = StyleSheet.create({
    CityInfo: {
        backgroundColor: Colors.PrimaryRed,
        height:verticalScale(50),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: scale(10),
        paddingVertical:verticalScale(5)
    },
    CityInfo_Text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: fontScale(13),
        color: Colors.White,
        flex:1
    },
    iconStyle: {
        color: Colors.White,
        width: moderateScale(24)
    },
    CityInfo_SettingsContainer: {
        paddingHorizontal: moderateScale(10)
    }
});
