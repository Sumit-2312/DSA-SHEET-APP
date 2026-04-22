import {atom} from 'recoil';

const inputOrOutput = atom({
    key: "inputOrOutput",
    default: "input"
})

export default inputOrOutput