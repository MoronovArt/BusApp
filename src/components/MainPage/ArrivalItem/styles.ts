import { StyleSheet } from 'react-native';
import Colors from "../../../styles/Colors";
import {fontScale, moderateScale, scale, verticalScale} from "../../../styles/Utils";

export const styles = StyleSheet.create({
    ArrivalItem: {
        flexDirection: "row",
        marginBottom: verticalScale(8),
        alignItems: "center",
    },
    ArrivalItem_Icon: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    ArrivalItem_IconContainerStyle: {
        paddingVertical: verticalScale(6),
        paddingHorizontal: scale(5),
        height: moderateScale(35),
        width: moderateScale(35)
    },
    ArrivalItem_IconStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
    },
    ArrivalItem_Text: {
        fontFamily: 'Montserrat-Medium',
        fontSize: fontScale(15),
        color: Colors.Black,

    },
    ArrivalItem_TextWhite: {
        color: Colors.White,
        paddingRight: scale(5),
        minWidth: scale(25),
        textAlign: "right",
        fontSize: fontScale(16)
    },
    ArrivalItem_Column: {
        justifyContent: "center",
        alignItems: "center",
    },
    ArrivalItem_NameText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: fontScale(15),
        color: Colors.Black
    },
    Padding_5: {
        paddingHorizontal: scale(5),
    },
    Padding_8: {
        paddingHorizontal: scale(8),
    },
    ArrivalItem_IconStyleRed: {
        backgroundColor: Colors.PrimaryRed
    },
    ArrivalItem_IconStyleGreen: {
        backgroundColor: Colors.Green
    },
    ArrivalItem_IconStyleBlue: {
        backgroundColor: Colors.Blue
    },
});
