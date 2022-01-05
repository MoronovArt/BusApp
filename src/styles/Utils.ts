import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

const BASE_WIDTH: number = 350;
const BASE_HEIGHT: number = 680;

export const scale = (size: number) => (shortDimension / BASE_WIDTH) * size;

export const verticalScale = (size: number) => (longDimension / BASE_HEIGHT) * size;

export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

const BASE_WIDTH_S: number = 320;
const BASE_HEIGHT_S: number = 568;

export const baseScale = (size: number) => (shortDimension / BASE_WIDTH_S) * size;

export const verticalBaseScale = (size: number) => (longDimension / BASE_HEIGHT_S) * size;
export const moderateBaseScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

export const {scaleX, scaleY} = {
    scaleX: (width / BASE_WIDTH_S) as number,
    scaleY: (height / BASE_HEIGHT_S) as number,
};

const wscale = width / 375;
const hscale = height / 667;

export const fontScale = (size: number, based?: 'width' | 'height') => {
    const newSize = based === 'height' ? size * hscale : size * wscale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};
