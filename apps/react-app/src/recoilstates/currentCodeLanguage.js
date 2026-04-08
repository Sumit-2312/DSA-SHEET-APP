import {atom} from 'recoil';
const currentCodeLanguageState = atom({
    key: "currentCodeLanguageState",
    default: "javascript"
})

export default currentCodeLanguageState;