import { defineStore } from "pinia";

export const pageStyleStore = defineStore('pageStyle', {
    state: () => ({
        pageStyle: null,
        isMobile: false,
    }),
    actions: {
        setStyle(offset) {
            return { height: offset ? `calc(100svh - ${offset}px)` : '100svh' }
        },
        setIsMobile(value) {
            this.isMobile = value;
        }
    },
    getters: {
        getIsMobile: (state) => (state.isMobile)
    }
})

export const userStore = defineStore('user', {
    state: () => ({
        isLogIn: false,
        user: {},
    }),
    actions: {
        verifyUser() {
            if (!localStorage.getItem('token')) {
                return;
            }
            let url = '/api/user/verify';
            const xhr = new XMLHttpRequest();
            xhr.open('get', url);
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xhr.onload = () => {
                let response = JSON.parse(xhr.response);
                console.log(response);
                if (xhr.status === 401) {
                    this.isLogIn = false;
                    return;
                }
                this.isLogIn = true;
                this.user = response;
            }
            xhr.send();
        },
        logInUser(username, password) {
            return new Promise((resolve, reject) => {
                let data = {
                    username: username,
                    password: password
                }
                let url = "/api/user/login";

                const xhr = new XMLHttpRequest();
                xhr.open("post", url);
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.withCredentials = true;
                xhr.onload = async () => {
                    let response = JSON.parse(xhr.response);
                    console.log(response);
                    if (xhr.status == 401) {
                        reject('Credentials Invalid!');
                        return;
                    }
                    localStorage.setItem('token', response.access);
                    this.isLogIn = true;
                    this.user = response.user;
                    resolve('Login successfull!');
                    return;
                }
                xhr.send(JSON.stringify(data));
            })
        },
        logOutUser() {
            this.user = {};
            this.isLogIn = false;
            localStorage.removeItem('token');
        }
    },
    getters: {
        getUser: (state) => (state.user),
        getUserIsLogedIn: (state) => (state.isLogIn)
    }
})

export const serverStore = defineStore('server', {
    state: () => ({
        wsRoot: '',
    }),
    getters: {
        getWsRoot: (state) => (state.wsRoot)
    },
    actions: {
        setWsRoot() {
            let loc = window.location;
            console.log("protocol: ", loc.protocol);
            let protocol = loc.protocol == 'https' ? 'wss' : 'ws';
            let host = loc.host;
            this.wsRoot = `${protocol}://${host}`;
        }
    }
})
