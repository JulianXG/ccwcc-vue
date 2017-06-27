/**
 * Created by Kalyter on 2017-4-28 0028.
 */
import Config from './config';

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
    },
    formatDate: (date) => {
        let fmt = 'yyyy-MM-dd HH:mm:ss';
        let o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'H+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
        return fmt;
    },
    getCheckpoints: data => {
        console.log(data);
        let result = [];
        for (let i = 0; i < data.length; i++) {
            let element = data[i];
            if (element.checkpointId === 0) {
                console.log('yes');
                return Config.CHECKPOINTS.map(item => {
                    return item.name;
                });
            } else {
                result.push(Config.getCheckpointName(element.checkpointId));
            }
        }
        return result;
    }
};
