import myStore from "store"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    builder: 'vite',
    hooks: {
        'close': () => {

        }
    },

    css: [
        '@/src/scss/main.scss'
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/src/scss/variables.scss" as *;',
                }
            }
        }
    },
    
    devtools: { enabled: true },
    typescript: {
        shim: false,
        typeCheck: true,
    },
    ssr: true,

    app: {
        head: {
            link: [
                { rel: 'stylesheet', href: '' },
                { rel: 'stylesheet', href:'https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'},
                
            ],
            meta: [
                
            ],
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        },
    },



    // plugins: [
    //     '~/plugins/configuration.client.ts',
    // ],

    // nitroConfifs added in 07/19/23 - 18:32 AM - Leonhard
    nitro: {
        plugins: [
            '~/server/mongoose_database/connect.ts',
            '~/server/database/index.ts',

            // '~/server/database/connect.ts',
        ],
        serverAssets: [
            {
                baseName: '',
                dir: 'assets',
            }
        ]
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/supabase',
        // 'cookie-universal-nuxt',
    ],
    pinia: {
        autoImports: [
            // automatically imports `defineStore`
            'defineStore', // import { defineStore } from 'pinia'
            ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
    },
    supabase: {
        url: process.env.SUPABASE_URL || 'https://bkftpiqzmwoaawdgzqat.supabase.co',
        key: process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrZnRwaXF6bXdvYWF3ZGd6cWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2MTc2ODksImV4cCI6MjAwNjE5MzY4OX0.XzJF6LaKRzqn70SnRExmlk8Ke2VKarhOU_kjK7ybxrw',
    },

    runtimeConfig: {
        MONGO_API: {
            secret: {
                URL: 'mongodb://127.0.0.1:27017/nuxt-client' || process.env.MONGODB_URL,
            }
        },
        SUPABASE_API: {
            secret: {
                SUPABASE_URL: process.env.SUPABASE_URL || 'https://bkftpiqzmwoaawdgzqat.supabase.co',
                SUPABASE_KEY: process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrZnRwaXF6bXdvYWF3ZGd6cWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2MTc2ODksImV4cCI6MjAwNjE5MzY4OX0.XzJF6LaKRzqn70SnRExmlk8Ke2VKarhOU_kjK7ybxrw',

            }
        }
    },
})
