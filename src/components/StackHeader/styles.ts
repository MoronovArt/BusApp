import { StyleSheet } from 'react-native';
import Colors from "../../styles/Colors";
import {fontScale, moderateScale, scale, verticalScale} from "../../styles/Utils";

export const styles = StyleSheet.create({
    BusStopsTitle: {
        backgroundColor: Colors.PrimaryRed,
        flexDirection: "row",
        height: verticalScale(50),
        alignItems: "center",
        paddingHorizontal: scale(8)
    },
    BusStopsTitle_TextContainer: {
        flex:1,
        textAlign: "left",
        marginLeft: scale(8),
        flexDirection: "column",
    },
    BusStopsTitle_Text: {
        fontFamily: 'Montserrat-Bold',
        color: Colors.White,
        fontSize: fontScale(16)
    },
    iconStyle: {
        color: Colors.White,
        width: moderateScale(24)
    },
    BusStopsTitle_IconContainer: {
        width: scale(46),
        alignItems: "center"
    },
    BusStopsTitle_CityText: {
        fontFamily: 'Montserrat-Medium',
        color: Colors.White,
        fontSize: fontScale(12),
    },
});
