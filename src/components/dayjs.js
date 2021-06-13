import Vue from 'vue'

// Vue.filter()


export const getFullYear = (date = '') => {
    let _d = new Date(date);
    return _d.getFullYear()
}

export const getMonth = (date = '') => {
    let _d = new Date(date);
    return _d.getMonth() + 1
}

export const getDay = (date = '') => {
    let _d = new Date(date);
    return _d.getDate()
}

export const getCurMonthTotalDays = (date = '') => {
    let _d = new Date(date);
    _d.setFullYear(getFullYear(date));
    _d.setMonth(getMonth(date - 1));
    _d.setDate(0)
    return _d.getDate()
}


export const getStartWeek = (date = '') => {
    let _d = new Date(date);
    _d.setFullYear(getFullYear(date));
    _d.setMonth(getMonth(date - 1));
    _d.setDate(1)
    return _d.getDay()
}



export const formatDate = (date, fmt = "YYYY-MM-DD") => {
    let result = '';
    let _d = new Date(date)
    const map = {
        'Y+': _d.getFullYear(),
        'M+': _d.getMonth() + 1,
        'D+': _d.getDay(),
        'HH': _d.getHours(),
        'mm': _d.getMinutes(),
        'ss': _d.getMinutes()
    }
    fmt = fmt.replace(/(Y+)/g, map['Y+']);
    fmt = fmt.replace(/M+/g, map['M+']);
    fmt = fmt.replace(/D+/g, map['D+']);
    fmt = fmt.replace(/HH/, map.HH)
    fmt = fmt.replace(/mm/, map.mm)
    fmt = fmt.replace(/ss/, map.ss)
    return fmt;
}

