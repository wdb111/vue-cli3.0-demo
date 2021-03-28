/**
 * @description 滚动到指定位置
 * @param element {element} 参照元素
 * @param to {number} 滚动条位置
 * @param duration {number} 滚动时间
 */
export function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    const difference = to - element.scrollTop;
    const perTick = difference / duration * 10;
    setTimeout(() => {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

/**
 * @description 防抖
 * @param func {Function} 回调方法
 * @param wait {number} 等待时间
 * @param immediate {boolean} 是否初始化
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function (...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

/**
 * @description 深复制
 * @param source {Object} 复制对象
 * @returns {Object}
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone');
    }
    const targetObj = source.constructor === Array ? [] : {};
    for (const keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}

/**
 * @description 过滤对象中值为空的树形
 * @param source {Object} 过滤对象
 * @returns {Object}
 */
export function filterObj(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone');
    }
    const targetObj = source.constructor === Array ? [] : {};
    for (const keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = filterObj(source[keys]);
            } else {
                if (source[keys] || source[keys] === false || source[keys] === 0) targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}

/**
 * @description 合并对象
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
    if (typeof target !== 'object') {
        target = {};
    }
    if (Array.isArray(source)) {
        return source.slice();
    }
    Object.keys(source).forEach(property => {
        const sourceProperty = source[property];
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty);
        } else {
            target[property] = sourceProperty;
        }
    });
    return target;
}

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param pageTitle {Object} 标题名称
 */
export function setTitle(pageTitle) {
    window.document.title = pageTitle ? pageTitle : '默认标题';
}

/**
 * @description 生成32位随机字符串
 * @returns {string}
 */
export function createUniqueString() {
    const timestamp = +new Date() + '';
    const randomNum = parseInt((1 + Math.random()) * 65536) + '';
    return (+(randomNum + timestamp)).toString(32);
}

/**
 * @description 生成随机字符串
 * @param length {number} 字符串长度
 * @param chars {string} 生成选项
 * @returns {string}
 */
export function randomString(length = 6, chars = '_abcdefghijklmnopqrstuvwxyz') {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

/**
 * @description 替换邮箱字符
 * @param email {string} 邮箱
 * @returns {string}
 */
export function regEmail(email) {
    if (String(email).indexOf('@') > 0) {
        const str = email.split('@');
        let _s = '';
        if (str[0].length > 3) {
            for (var i = 0; i < str[0].length - 3; i++) {
                _s += '*';
            }
        }
        let new_email = str[0].substr(0, 3) + _s + '@' + str[1];
    }
    return new_email;
}

/**
 * @description 替换手机字符
 * @param mobile {string}手机号
 */
export function regMobile(mobile) {
    if (mobile.length > 7) {
        let new_mobile = mobile.substr(0, 3) + '****' + mobile.substr(7);
    }
    return new_mobile;
}

/**
 * @description 下载文件
 * @param obj {file} 文件流
 * @param name {string} 文件名称
 * @param suffix {string} 后缀
 */
export function downloadFile(obj, name, suffix) {
    const url = window.URL.createObjectURL(new Blob([obj]));
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    const fileName = parseTime(new Date()) + '-' + name + '.' + suffix;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();

/**
 * @description 生成uuid
 */
 export function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            let r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
}
