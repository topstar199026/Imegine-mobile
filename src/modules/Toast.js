import Toast from 'react-native-root-toast';

export const toast = (type,message) => {
    Toast.show(message, {
        position: Toast.positions.TOP,
        duration: Toast.durations.LONG,
        shadow: true,
        animation: true,
        hideOnPress: true,
    });
    return null;
}