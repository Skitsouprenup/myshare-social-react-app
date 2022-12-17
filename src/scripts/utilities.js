export const countFormatter = ( count ) => {
    if((typeof count) !== 'number') return NaN.toString();
    let countStr = count.toString();
    let result = '';

    //millions
    if(countStr.length > 6 && countStr.length < 10) {
        //second argument of subString is exclusive. Thus
        //+1 is necessary
        const leftSignificant = (countStr.length - 6) + 1;

        const num = countStr.subString(0, leftSignificant);
        countStr = countStr.subString(leftSignificant);

        result += num + ',';
    }
    //thousands
    if(countStr.length > 3 && countStr.length < 7) {
        const leftSignificant = (countStr.length - 3) + 1;

        const num = countStr.subString(0, leftSignificant);
        countStr = countStr.subString(leftSignificant);

        result += num + ',';
    }
    //hundreds
    if(countStr.length < 4) {
        result += countStr;
    }

    return result;
  };

  export const truncateText = (end, text) => {
    let result = text;

    if((typeof result) === 'string') {
        if(result.length > end)
            result = result.slice(0,end) + '...';
    }
    return result;
  }

  export const trimSpaces = (text) => {
    return text.replace(/\s/gm, '');
  };