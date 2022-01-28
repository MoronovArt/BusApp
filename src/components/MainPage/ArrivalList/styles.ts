import { StyleSheet } from 'react-native';
import Colors from "../../../styles/Colors";
import {fontScale, scale, verticalScale} from "../../../styles/Utils";

export const styles = StyleSheet.create({
    ListContainer: {
        paddingHorizontal: scale(10),
        //height: "100%"
    },
    EmptyComponent: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(5)
    },
    EmptyText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: fontScale(14),
        color: Colors.Black,
        textAlign: "center"
    },
    ActivityIndicator: {
        color: Colors.PrimaryRed
    },
    FooterComponent: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10)
    },
});
