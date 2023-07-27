import { defineStore } from 'pinia';

const myStore = defineStore('myStore', {
    state: () => {
        return { count: 10 }
    },
    getters: {
        doubleCount: (state) => state.count * 2,
    },
})

export default myStore;