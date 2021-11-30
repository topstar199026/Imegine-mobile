

export const _style = (styles) => {
    return  Object.assign({}, ...styles)
}
export const _font = (fontFamily, color, fontSize, lineHeight = 0) => {
    if(lineHeight === 0) 
        return {
            fontFamily: fontFamily,
            color: color,
            fontSize: fontSize,
        }
    else  
        return {
            fontFamily: fontFamily,
            color: color,
            fontSize: fontSize,
            lineHeight: lineHeight,
        }
}

export const _size = (width, height) => {
    return {
        width: width,
        height: height,
    }    
}

export const _shadow = (color) => {
    return {
        shadowColor: color,
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,        
        elevation: 8,
    }    
}


export const _center = {
    alignItems: 'center',
    justifyContent: 'center',
}

export const _centerV = {
    alignItems: 'center',
}

export const _centerH = {
    justifyContent: 'center',
}

export const _centerT = {
    textAlign: 'center',
}

export const _flex = {
    display: 'flex',
}

export const _flexRow = {
    display: 'flex',
    flexDirection: 'row',
}

export const _flexCol = {
    display: 'flex',
    flexDirection: 'column',
}