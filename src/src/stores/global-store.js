import { defineStore } from "pinia";

export const pageStyleStore = defineStore('pageStyle', {
    state: () => ({
        pageStyle: null
    }),
    actions: {
        setStyle(offset) {
            return { height: offset ? `calc(100svh - ${offset}px)` : '100svh' }
        }
    }
})
