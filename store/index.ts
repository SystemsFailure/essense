import { defineStore } from 'pinia';
const myStore = defineStore('myStore', {
    state: () => {
        return { 
            count: 10,

            auth: false,
            user: {  } || undefined,
            currentPost: 0,

            showListComments: false,
        }
    },
    getters: {
        doubleCount: (state) => state.count * 2,

    },
})

export default myStore;