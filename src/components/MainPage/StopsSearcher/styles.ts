import { StyleSheet } from 'react-native';
import {fontScale, moderateScale, scale, verticalScale} from "../../../styles/Utils";
import Colors from "../../../styles/Colors";

export const styles = StyleSheet.create({
    iconStyle: {
        color: Colors.PrimaryRed,
        width: moderateScale(24)
    },
    StopsSearcher_Button: {
        backgroundColor: Colors.White,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(5),
        paddingVertical: verticalScale(10)
    },
    StopsSearcher_Text: {
        flex:1,
        paddingHorizontal: scale(4),
        fontFamily: 'Montserrat-Medium'
    },
    StopsSearcher_Container: {
        marginHorizontal: scale(10),
        marginVertical: verticalScale(10)
    },
    StopsSearcher_Label: {
        marginBottom: verticalScale(5),
        fontFamily: 'Montserrat-Medium'
    }
});
