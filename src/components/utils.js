import Vue from 'vue'

// Vue.filter()




export const formatDate = (date,fmt="YYYY-MM-DD")=>{
    let result = '';
    let _d = new Date(date)
    const map = {
        'Y+':_d.getFullYear(),
        'M+':_d.getMonth()+1,
        'D+':_d.getDay(),
        'HH':_d.getHours(),
        'mm':_d.getMinutes(),
        'ss':_d.getMinutes()
    }
    fmt = fmt.replace(/(Y+)/g,map['Y+']);
    fmt = fmt.replace(/M+/g,map['M+']);
    fmt = fmt.replace(/D+/g,map['D+']);
    fmt = fmt.replace(/HH/,map.HH)
    fmt = fmt.replace(/mm/,map.mm)
    fmt = fmt.replace(/ss/,map.ss)
    return fmt;
}

