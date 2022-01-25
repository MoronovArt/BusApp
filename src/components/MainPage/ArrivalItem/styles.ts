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
        backgroundColor: Colors.Blue,
        paddingVertical: verticalScale(6),
        borderRadius: 10,
        maxWidth: scale(55),
        minWidth: scale(55)
    },
    ArrivalItem_IconStyle: {
        width: moderateScale(25),
        height: moderateScale(25),
        marginRight:scale(4)
    },
    ArrivalItem_Text: {
        fontFamily: 'Montserrat-Medium',
        fontSize: fontScale(15),
        color: Colors.Black
    },
    ArrivalItem_TextWhite: {
        color: Colors.White
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
    }
});
