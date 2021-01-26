function isLogin() {
    return document.cookie.includes("login=true");
}
function login(){
    const expiresDay = 147;
    const date = new Date();
    date.setTime(date.getTime() + expiresDay * 24 * 60 * 60 *1000);
    document.cookie = `login=true;expires=${date.toGMTString()}`;
    console.log(document.cookie);
}
function cancelLogin(){
    const date = new Date();
    date.setTime(date.getTime() - 100000000);//时间往前即可失效
    document.cookie = `login=true;expires=${date.toGMTString()}`;
}

export default {
    isLogin,
    login,
    cancelLogin,
}

