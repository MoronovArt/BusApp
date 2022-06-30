import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {styles as s} from './styles';
import {IconAntd} from '../../icons/AntDesign';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {PinBlock} from '../index';
import {useLocation} from '../../hooks';

interface TStackHeaderProps {
  title: string;
}

const StackHeader = ({title}: TStackHeaderProps) => {
  const navigation = useNavigation();
  const city = useSelector(
    (state: RootState) => state.cities?.selectedCity.name,
  );

  const [isLoading, location, getLocation, setCurrentPosition] = useLocation();

  const onPressPin = () => {
    if (location) {
      setCurrentPosition(null);
    } else {
      if (typeof getLocation === 'function') {
        getLocation();
      }
    }
  };

  return (
    <View
      style={[
        s.BusStopsTitle,
        title === 'QR' ? {backgroundColor: 'transparent'} : {},
      ]}>
      <TouchableOpacity onPress={navigation.goBack}>
        <View style={s.BusStopsTitle_IconContainer}>
          <IconAntd
            title={'left'}
            size={s.iconStyle.width}
            color={s.iconStyle.color}
          />
        </View>
      </TouchableOpacity>
      {title !== 'QR' && (
        <View style={s.BusStopsTitle_TextContainer}>
          {title === 'Остановки' && (
            <Text
              style={s.BusStopsTitle_CityText}
              numberOfLines={1}
              ellipsizeMode={'tail'}>{`Город ${city}`}</Text>
          )}
          <Text
            style={s.BusStopsTitle_Text}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {title}
          </Text>
        </View>
      )}
      {title !== 'QR' && title !== 'Настройки' && title !== 'Остановки' && (
        <View style={s.BusStopsTitle_PinContainer}>
          {isLoading ? (
            <ActivityIndicator
              size={'small'}
              color={s.ActivityIndicator.color}
            />
          ) : (
            <PinBlock active={location ? true : false} onPress={onPressPin} />
          )}
        </View>
      )}
    </View>
  );
};

export default StackHeader;
