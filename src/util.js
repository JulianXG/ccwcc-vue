/**
 * Created by Kalyter on 2017-4-28 0028.
 */

export default {
    setCookie: (name, value, days) => {
        let d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString();
    },
    getCookie: name => {
        let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },
    deleteCookie: name => {
        window.document.cookie = name + '=;path=/;expires=-1';
    }
};
