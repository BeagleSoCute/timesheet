import { notification as antNotification } from 'antd';
import { randomString } from "helpers/common.helper";
import * as NotificationHelper from 'helpers/notification.helper';

interface NotificationProps {
    type: "success"| "info" | "warning"| "error",
    message?: string, 
    description?:string, 
    options?:any
}

interface isDuplicateNotificationProps extends NotificationProps {
    detail?:string
}

let notiList: Array<any> = [];
export const notification = ({ type, message, description, options }:NotificationProps) => {
    if (NotificationHelper.isDuplicate(notiList, { type, message, description, options })) {
        return;
    }
    const notiObj = { key: randomString(), type, message, description };
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

export const close = ({ key }:any) => {
    notiList = notiList.filter(item => item.key !== key);
};

export const isDuplicate = (list:Array<any>, notiObj:isDuplicateNotificationProps) => {
    if (list.length === 0) {
        return false;
    }
    return list.find(item => {
        return item.type === notiObj.type && item.message === notiObj.message && item.detail === notiObj.detail;
    }) !== undefined;
};