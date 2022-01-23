import { localKeyName } from "./constants";

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}
export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
}
export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const getToken = () => {
    const { access_token = '' } = getLocalStorage(localKeyName) || {}
    return access_token || ''
}

export const resHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
}
