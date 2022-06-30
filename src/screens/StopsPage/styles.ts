import {StyleSheet} from 'react-native';
import Colors from '../../styles/Colors';
import {scale, verticalScale} from '../../styles/Utils';

export const styles = StyleSheet.create({
  StopsPage_Container: {
    backgroundColor: Colors.PrimaryRed,
    flex: 1,
  },
  StopsPage: {
    backgroundColor: Colors.Gray,
    flex: 1,
  },
});

export const styles_mode = StyleSheet.create({
  StopsMode_Container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: verticalScale(10),
  },
  StopsMode_Button: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(20),
    width: scale(110),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.PrimaryRed,
    borderWidth: 1,
  },
  StopsMode_Text: {
    color: Colors.PrimaryRed,
    textAlign: 'center',
    fontSize: 18,
  },
  StopsMode_ButtonActive: {
    backgroundColor: Colors.PrimaryRed,
  },
  StopsMode_TextActive: {
    color: Colors.White,
  },
});
