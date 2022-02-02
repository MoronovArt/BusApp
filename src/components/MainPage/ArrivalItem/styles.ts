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
        maxWidth: scale(65),
        minHeight: verticalScale(35),

    },
    ArrivalItem_IconContainerStyle: {
        paddingVertical: verticalScale(6),
        paddingLeft: scale(5),
        justifyContent: "center",
        alignItems: "center",
    },
    ArrivalItem_IconStyle: {
        flex:1,
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        aspectRatio: 1,
        maxWidth: scale(35)
    },
    ArrivalItem_IconStyleSize: {
        aspectRatio: 0.5,
        maxHeight: verticalScale(35)
    },
    ArrivalItem_Text: {
        fontFamily: 'Montserrat-Medium',
        fontSize: fontScale(15),
        color: Colors.Black,

    },
    ArrivalItem_TextWhite: {
        color: Colors.White,
        paddingRight: scale(5),
        textAlign: "right",
        fontSize: fontScale(16),
        flex:1
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
