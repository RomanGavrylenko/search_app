export function validationNum(str){
    let res = str.match(/\D/gi);
    if(res !== null){
        return false
    }

    return true;
}

export function getValidation(str){
    if(isEmpty(str) && isProhibited(str)){
        return true;
    }

    return false
}
//проверка пустая ли строка

function isEmpty(str){
    return str.trim().length;
}

//проверка на запрещенные символы

const forbiddenChars = (/[\/<>,"';\(\)$%^&*+=#]/gi)

function isProhibited(str){
    let res = str.match(forbiddenChars);
    if(res === null){
        return true;
    }

    return false;
}

