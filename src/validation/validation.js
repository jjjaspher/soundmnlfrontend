export const oValidate = (value, oRules, oForm) => {

        if (!oRules) return { isValid : true, message : ''};
                
        if (oRules.required) {
            const oResult = requiredHandler(value);
            if (oResult.isValid !== true) return oResult;
        }
        
        if (oRules.minLength) {
            const oResult = minLengthHandler(value.length, oRules.minLength);
            if (oResult.isValid !== true) return oResult;
        }

        if (oRules.maxLength) {
            const oResult = maxLengthHandler(value.length, oRules.maxLength);
            if (oResult.isValid !== true) return oResult;
        }

        if (oRules.isEmail) {
            const oResult = emailHandler(value);
            if (oResult.isValid !== true) return oResult;
        }

        if (oRules.isNumeric) {
            const oResult = isNumericHandler(value);
            if (oResult.isValid !== true) return oResult;
        }
        
        if(oRules.confirmation) {
            const oResult = confirmationHandler(value, oRules.confirmation, oForm);
            if (oResult.isValid !== true) return oResult;
        }

        return { isValid : true, message : ''};
}

const requiredHandler = (value) => {
    const isValid = value.trim() !== '';
    if (isValid === true) {
        return { isValid : true, message : ''};
    }
    return { isValid : false, message : '*This field is required'};
}

const minLengthHandler = (valueLength, rulesLength) => {
    const isValid = valueLength >= rulesLength;
    if (isValid === true) {
        return { isValid : true, message : ''};
    }
    return { isValid : false, message : `*Must be at least ${rulesLength} characters`};
}

const maxLengthHandler = (valueLength, rulesLength) => {
    const isValid = valueLength <= rulesLength;
    if (isValid === true) {
        return { isValid : true, message : ''};
    }
    return { isValid : false, message : `*Maximum length is ${rulesLength} characters`};
}

const emailHandler = (email) => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const isValid = pattern.test(email);
    if (isValid === true) {
        return { isValid : true, message : ''};
    }
    return { isValid : false, message : '*Invalid email'};
}

const isNumericHandler = (value) => {
    const pattern = /^\d+$/;
    const isValid = pattern.test(value);
    if (isValid === true) {
        return { isValid : true, message : ''};
    }
    return { isValid : false, message : '*Must be a number'};
}

const confirmationHandler = (value, ref, oForm) => {
    const isValid = value === oForm[ref].value;
    if (isValid === true) {
        return { isValid : true, message : ''};
    }
    return { isValid : false, message : `*Must be equal to ${ref}`};
}

export default oValidate;