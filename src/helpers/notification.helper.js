import { notification as antNotification } from 'antd';
import { randomString } from "helpers/common.helper";
import * as NotificationHelper from 'helpers/notification.helper';

let notiList = [];
export const notification = ({ type, message, description, options }) => {
    if (NotificationHelper.isDuplicate(notiList, { type, message, description, options })) {
        return;
    }
    const notiObj = { key: randomString(10), type, message, description };
    notiList.push(notiObj);
    antNotification[type]({
        ...options,
        message,
        description,
        onClose: () => NotificationHelper.close(notiObj)
    });
};

export const destroy = () => {
    antNotification.destroy();
    notiList = [];
};

export const close = ({ key }) => {
    notiList = notiList.filter(item => item.key !== key);
};

export const isDuplicate = (list, notiObj) => {
    if (list.length === 0) {
        return false;
    }
    return list.find(item => {
        return item.type === notiObj.type && item.message === notiObj.message && item.detail === notiObj.detail;
    }) !== undefined;
};