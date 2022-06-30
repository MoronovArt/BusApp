import {StyleSheet} from 'react-native';
import Colors from '../../../styles/Colors';

export const styles = StyleSheet.create({
  StopsMap_Container: {
    flex: 1,
  },
  StopsMap_Button: {
    //borderRadius: 8,
    padding: 12,
    backgroundColor: Colors.White,
    borderColor: Colors.PrimaryRed,
    borderWidth: 1,
  },
  StopsMap_IconStyle: {
    width: 24,
    height: 24,
    color: Colors.PrimaryRed,
  },
  StopsMap_ButtonWrapper: {
    marginTop: 10,
  },
  StopMap_ButtonsContainer: {
    position: 'absolute',
    bottom: 60,
    right: '4%',
  },
  StopMap_ActivityIndicator: {
    color: Colors.White,
  },
});
