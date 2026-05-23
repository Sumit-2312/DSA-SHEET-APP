import {atom} from 'recoil';

const isOpenNotificationState = atom({
    key: "isOpenNotification",
    default: false
});
export default isOpenNotificationState;