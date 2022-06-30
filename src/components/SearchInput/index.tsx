import React, {useCallback, useEffect} from 'react';
import {styles as s} from './styles';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconAntd} from '../../icons';
import {STOPS_LIST_LOAD} from '../../store/models/bus_stops';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../store';
import {QrButton} from '../index';
import {CITIES_LIST_LOAD} from '../../store/models/cities';

interface TSearchInputProps {
  type: 'cities' | 'stops';
}

const SearchInput = ({type}: TSearchInputProps) => {
  const dispatch = useDispatch<Dispatch>();
  const {
    account_id,
    rest_url,
    id: cityId,
  } = useSelector((state: RootState) => state.cities?.selectedCity);
  const mode = useSelector((state: RootState) => state.bus_stops?.stops_mode);
  const searchText = useSelector((state: RootState) =>
    type === 'stops' ? state.bus_stops?.searchText : state.cities?.searchText,
  );

  const filterStops = useCallback(() => {
    if (type === 'stops') {
      // @ts-ignore
      dispatch.bus_stops.getStops({
        accountId: account_id,
        skip: STOPS_LIST_LOAD.SKIP,
        limit:
          mode === 'list' ? STOPS_LIST_LOAD.LIMIT : STOPS_LIST_LOAD.MAX_LIMIT,
        searchText,
        rest_url,
        cityId,
      });
    } else {
      // @ts-ignore
      dispatch.cities.getCities({
        skip: CITIES_LIST_LOAD.SKIP,
        limit: CITIES_LIST_LOAD.LIMIT,
        searchText,
      });
    }
  }, [
    type,
    dispatch.bus_stops,
    dispatch.cities,
    account_id,
    mode,
    searchText,
    rest_url,
    cityId,
  ]);

  const changeSearchInput = useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (type === 'stops') {
        dispatch.bus_stops.SET_SEARCH_TEXT({
          searchText: event.nativeEvent.text,
        });
      } else {
        dispatch.cities.SET_SEARCH_TEXT({searchText: event.nativeEvent.text});
      }
    },
    [dispatch.bus_stops, dispatch.cities, type],
  );

  const clearSearchInput = useCallback(() => {
    if (type === 'stops') {
      dispatch.bus_stops.SET_SEARCH_TEXT({searchText: ''});
      // @ts-ignore
      dispatch.bus_stops.getStops({
        accountId: account_id,
        skip: STOPS_LIST_LOAD.SKIP,
        limit:
          mode === 'list' ? STOPS_LIST_LOAD.LIMIT : STOPS_LIST_LOAD.MAX_LIMIT,
        searchText: '',
        rest_url,
        cityId,
      });
    } else {
      dispatch.cities.SET_SEARCH_TEXT({searchText: ''});
      // @ts-ignore
      dispatch.cities.getCities({
        skip: CITIES_LIST_LOAD.SKIP,
        limit: CITIES_LIST_LOAD.LIMIT,
        searchText: '',
      });
    }
  }, [
    type,
    dispatch.bus_stops,
    dispatch.cities,
    account_id,
    mode,
    rest_url,
    cityId,
  ]);

  useEffect(() => {
    if (searchText !== '') {
      if (type === 'stops') {
        const timeOutId = setTimeout(
          () =>
            // @ts-ignore
            dispatch.bus_stops.getStops({
              accountId: account_id,
              skip: STOPS_LIST_LOAD.SKIP,
              limit:
                mode === 'list'
                  ? STOPS_LIST_LOAD.LIMIT
                  : STOPS_LIST_LOAD.MAX_LIMIT,
              searchText,
              rest_url,
              cityId,
            }),
          1500,
        );
        return () => clearTimeout(timeOutId);
      } else {
        const timeOutId = setTimeout(
          () =>
            // @ts-ignore
            dispatch.cities.getCities({
              skip: CITIES_LIST_LOAD.SKIP,
              limit: CITIES_LIST_LOAD.LIMIT,
              searchText,
            }),
          1500,
        );
        return () => clearTimeout(timeOutId);
      }
    }
  }, [
    account_id,
    cityId,
    dispatch.bus_stops,
    dispatch.cities,
    mode,
    rest_url,
    searchText,
    type,
  ]);

  return (
    <View style={s.SearchInput_Container}>
      <View style={s.SearchInput}>
        <IconAntd
          title={'search1'}
          size={s.iconStyle.width}
          color={s.iconStyle.color}
        />
        <TextInput
          style={s.SearchInput_Input}
          value={searchText}
          onChange={changeSearchInput}
          onSubmitEditing={filterStops}
        />
        {!!searchText && (
          <TouchableOpacity onPress={clearSearchInput}>
            <IconAntd
              title={'closesquareo'}
              size={s.iconStyle.width}
              color={s.iconStyle.color}
            />
          </TouchableOpacity>
        )}
      </View>
      {type === 'stops' && (
        <View style={s.SearchInput_QrContainer}>
          <QrButton />
        </View>
      )}
    </View>
  );
};

export default SearchInput;
