import myStore from "../store/index";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:start', () => {
        console.log('start')
    })
  })