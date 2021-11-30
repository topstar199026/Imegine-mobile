export const UpperCaseString = (str, flag) => {
    if(!str) return '';

    if(flag == 'First') {
        return str[0].toUpperCase();
    } else if (flag == 'Full') {
        return str[0].toUpperCase() + str.slice(1);
    } else if (flag == 'Sub') {
        let strArr = str.split(' ');
        let returnStr = '';
        strArr.map((subStr, index) => {
            if(subStr && subStr !== '' && subStr !== ' ')
                returnStr = returnStr + (index === 0 || returnStr === '' ? '' : ' ') + UpperCaseString(subStr, 'Full');
        })
        return returnStr;
    }

    return str;
}

export const subFormatString = (str, length) => {
    return str.length < length + 1 ? str : str.substring(0, length) + '.';
}