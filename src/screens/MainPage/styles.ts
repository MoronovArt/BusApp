import { StyleSheet } from 'react-native';
import Colors from "../../styles/Colors";

export const styles = StyleSheet.create({
    MainPage: {
        backgroundColor: Colors.PrimaryRed,
        flexDirection: "column",
        justifyContent: "space-between",
        flex:1
    },
    MainPage_Content: {
        flex:1,
        backgroundColor: Colors.Gray
    }
});
