var apiTarget = 'https://weightscoping.herokuapp.com/';
if (__DEV__) {
    apiTarget = 'http://127.0.0.1:8000/';//'http://192.168.0.11:8000/';//'http://192.168.1.4:8000/';//
}

export { apiTarget };