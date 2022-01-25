import { StyleSheet } from 'react-native';
import {fontScale, moderateScale, scale, verticalScale} from "../../../styles/Utils";
import Colors from "../../../styles/Colors";

export const styles = StyleSheet.create({
    Header: {
        height: verticalScale(50),
        backgroundColor: Colors.PrimaryRed,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(8)
    },
    Header_Text: {
        fontFamily: 'Montserrat-Bold',
        color: Colors.White,
        fontSize: fontScale(16),
    },
    Header_CityText: {
        fontFamily: 'Montserrat-Medium',
        color: Colors.White,
        fontSize: fontScale(12),
    },
    Header_TextContainer: {
        flexDirection: "column",
        flex:1,
        marginLeft: scale(8),
    },
    Header_IconContainer: {
        width: scale(46),
        alignItems: "center"
    }
});
