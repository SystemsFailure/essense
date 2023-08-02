<script setup lang="ts">
import {ref, Ref} from 'vue';
import {Image} from '../types/Image.types';
import { PostWithoutId } from 'types/Post.types';
import {validTitle, validBody} from '../validations/new-post.valid';
import { useCookies } from 'vue3-cookies';
import * as tus from 'tus-js-client';

const storage = useSupabaseClient().storage;

let user = {id: '01x'};
let userId = useCookies().cookies.get('user-id');

let loading:Ref<boolean> = ref(false);

let title: Ref<string> = ref('');
let body: Ref<string> = ref('');
let images: Ref<Image[]> = ref([]);

// Work only with CORS access / when app is deployed and heppened to production
function uploadByProtocolTUS(bucketname:string, filename:string, file: any, ) {
    return new Promise((resolve, reject) => {
        const upload = new tus.Upload(file, {
            endpoint: 'https://supabase.com/dashboard/project/bkftpiqzmwoaawdgzqat/storage/buckets/images',
            retryDelays: [0, 3000, 5000, 10000, 20000],
            headers: {
                authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrZnRwaXF6bXdvYWF3ZGd6cWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2MTc2ODksImV4cCI6MjAwNjE5MzY4OX0.XzJF6LaKRzqn70SnRExmlk8Ke2VKarhOU_kjK7ybxrw'}`,
                'x-upsert': 'true', // optionally set upsert to true to overwrite existing files
            },
            uploadDataDuringCreation: true,
            chunkSize: 6 * 1024 * 1024,
            onError: function (error) {
                console.log('Failed because: ' + error);
                reject(error);
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                console.log(bytesUploaded, bytesTotal, percentage + '%');
            },
            onSuccess: function () {
                console.log('Download %s from %s', upload?.file, upload.url);
                resolve(0);
            },
        })

        return upload.findPreviousUploads().then(function (previousUploads) {
            if (previousUploads.length) {
                upload.resumeFromPreviousUpload(previousUploads[0])
            }
            upload.start()
        })

    })
};

async function uploadImage(file: any) {
    loading.value = true;

    // Data which will be return
    let returnedData = undefined;

    // supabase method of upload
    const {data, error} = await storage
        .from('images')
        .upload(`public/posts/package__${new Date().toLocaleString() + '-' + user.id}/${file.name}`, file)
    // if error is exists or is null
    if (error) {console.error(error); return; };

    // if data is not null and path of data also is not null, so create a new object and return it
    if(data && data?.path) {
        returnedData = {
            url: await getImageUrl(data?.path),
            path: data?.path,
        }
    } else {
        console.error(error);
        // close completing it function through - return; 
        return;
    }
    loading.value = false;
    // return data
    return returnedData;
};
    
// function for getting the image url from the storage, if image already exists and was uploaded
async function getImageUrl(filepath: string) {
    const {data} = await storage.from('images').getPublicUrl(filepath);
    console.log(data, 'get image url');
    return data.publicUrl;
};

// function for @input event, then user try uploading the image
async function fileMutation(event: any) {
    // getting file from the target
    let file = event?.target?.files[0];

    // result from fucntion by upload

    const result = await uploadImage(file);
    if(result?.url === undefined && result?.path === undefined) {
        console.error('upload image failed');
        return;
    } else {
        const image = {
            id: '0', 
            url:result.url,
            post_id: '', 
            path: result.path, 
            name: file?.name, 
            size: file?.size, 
            type: file?.type
        }
        images.value.push(image);
    }
};

async function downloadImage() {
    console.log('downloading image');
    
};

async function createPost() {
    
    // Validate the parameters and create post
    if(
        validTitle(title.value)
        &&
        validBody(body.value)
    ) 
    {
        let data_: PostWithoutId = {
            title: title.value,
            body: body.value,
            atCreated: new Date().toJSON(),
            views: 0,
            likes: 0,
            comments: 0,
            username: "admin",
            userAvatarUrl: 'http://localhost',
            images: images.value,
            userId: userId,
        }
        const {data} = await useFetch('/posts/createPost', { method: 'post', body: {data: data_} })

        console.log(data?.value?.result);
    } else {
        // here needs to create more details validation for the post - example log('validation error cuz length filed - title < 0')
        console.log('validation failed');
    }
};


function openImage(image: Image) {
    console.log(image, 'open image');
} 


</script>
<template>
    <div class="Post-studio">

        <div class="progress__downloading" v-if="loading"></div>

        <div class="PostStudio__container">

            <div class="_title-field">
                <input type="text" placeholder="title post..." v-model="title">
            </div>

            <div class="_image-field">
                <span class="text__center" v-if="images.length === 0">Фотографии здесь...</span>


                <div class="_group__images" v-if="images.length > 0">

                    <div class="_group__firstImage" v-if="images.length >= 1">
                        <img :src = 'images[0].url' alt="">
                    </div>
                    <!-- Если поставить значение 100%, и если картинок будет например 4, то они раздялят пространство по 25% -->
                    <div class="_group__images__bottom-container" v-if="images.length > 1">
                        <div class="_group__image" v-for="image in images.slice(1)" :key="0" @click="openImage(image)">
                            <img :src="image.url" alt="">
                        </div>
                    </div>


                </div>

                <div class="_only__image" v-if="images.length < 1 && images.length != 0">
                    <img :src="'../public/images-group/' + images[0].name" alt="">
                </div>

                
                <input type="file" id="choiceFile" name="choiceFile" alt="" @input="fileMutation">
                <label for="choiceFile">Выберите файл(ы)</label>
            </div>

            <div class="_body-field">
                <textarea name="body_post" id="body_post-id" placeholder="Текст..." v-model="body"></textarea>
            </div>


            <button class="create__btn" @click="createPost()">create</button>

        </div>

    </div>
</template>
<style lang="css" scoped>

    .Post-studio {
        width: 100%;
        height: fit-content;
        padding: 100px 300px;
        overflow: auto;
        overflow-x: hidden;
        background-color: black;
        color: #999;
        font-size: 15px;
        position: relative;
    }

    .progress__downloading{ 
        position: fixed;
        width: 0%;
        height: 1px;
        background-color: aquamarine;
        top: 0;
        left: 0;
        animation: anim-progress 2s infinite;
    }

    @keyframes anim-progress {
        0% {
            width: 0%;
        }
        100% {
            width: 100%;
        }
    }

    .Post-studio .PostStudio__container{
        width: 100%;
        height: 100%;
        padding: 30px 40px;
        background-color: #101010;
        border-radius: 10px;
    }

    .create__btn {
        margin-top: 20px;
        padding: 8px 20px;
        text-transform: uppercase;
        font-weight: bold;
        border: 1px solid #333;
        color: #999;
        background-color: transparent;
        border-radius: 10px;
    }

    .create__btn:hover {
        cursor: pointer;
        opacity: .5;
        transition: .5s;
    }


    ._title-field {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ._title-field input {
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        outline: none;
        color: aliceblue;
        font-size: 20px;
    }

    ._image-field {
        margin-top: 10px;
        width: 100%;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #333;
        position: relative;
        border-radius: 10px;
    }



    ._image-field ._group__images {
        width: 100%;
        height: 100%;
        padding: 20px;
    }



    ._group__images ._group__images__bottom-container {
        width: 100%;
        height: 50%;
        padding: 10px 40px;
        display: flex;
        align-items: center;
    }

    ._group__images__bottom-container ._group__image {
        width: 100%;
        height: 100%;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 10px;
    }

    ._group__image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }

    ._group__images__bottom-container ._group__image:hover {
        cursor: pointer;
        opacity: .5;
        transition: .5s;
    }



    ._group__images ._group__firstImage {
        width: 100%;
        height: 50%;
        padding: 0 50px;
    }

    ._group__images ._group__firstImage img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
    }

    ._group__images ._group__firstImage img:hover {
        cursor: pointer;
        opacity: .5;
        transition: .5s;
    }




    ._image-field .text__center {
        z-index: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
    }

    ._image-field ._only__image {
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    ._image-field ._only__image img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
    }

    ._image-field #choiceFile {
        display: none;
  
    }

    ._image-field label {
        padding: 15px;
        opacity: .8;
        border: 1px solid #444;
        backdrop-filter: blur(100px);
        z-index: 1;
        background-color: black;
        border-radius: 10px;      
        position: absolute;
        right: 0px;
        top: 0px;
        transform: translateX(220px);
        /* margin: 0;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%); */
    }

    ._body-field {
        width: 100%;
        height: 150px;
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #333;
        border-radius: 10px;
    }

    ._body-field #body_post-id {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        
        min-width: 100%;
        min-height: 100%;
        background: transparent;
        font-size: 16px;
        padding: 10px;
        outline: none;
        color: aliceblue;
        border: none;
        font-weight: 500;
    }

</style>