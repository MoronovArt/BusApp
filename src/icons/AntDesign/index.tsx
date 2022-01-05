import React from 'react';
// @ts-ignore
import Icon from 'react-native-vector-icons/AntDesign';

Icon.loadFont();

type TIcon = {
    title: string,
    color: string,
    size: number
}

export const IconAntd = ({ title, color = 'black', size = 20 } : TIcon) => {
    return <Icon name={title} size={size} color={color} />;
}
