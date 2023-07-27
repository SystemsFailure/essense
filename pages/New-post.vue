<script setup lang="ts">
import {ref, Ref} from 'vue';
import {Image} from '../types/Image.types';

let images: Ref<Image[]> = ref([
    {
        id: '0', url: 'http://', post_id: '01', path: '01.jpg', name: '01.jpg', size: 100, type: 'image/jpeg'
    },
    {
        id: '0', url: 'http://', post_id: '01', path: '01.jpg', name: '02.png', size: 100, type: 'image/jpeg'
    },
    {
        id: '0', url: 'http://', post_id: '01', path: '01.jpg', name: '03.jpg', size: 100, type: 'image/jpeg'
    },

]);

function fileMutation(event: any) {
    let file = event?.target?.files[0];
    const image = {
        id: '0', url: 'http://', post_id: '01', path: '01.jpg', name: file?.name, size: file?.size, type: file?.type
    }
    images.value.push(image);
    console.log(file);
    
};

function createPost() {
    // code...
};


</script>
<template>
    <div class="Post-studio">

        <div class="PostStudio__container">

            <div class="_title-field">
                <input type="text" placeholder="title post...">
            </div>

            <div class="_image-field">
                <span class="text__center" v-if="images.length === 0">Фотографии здесь...</span>


                <div class="_group__images" v-if="images.length > 1">

                    <div class="_group__firstImage">
                        <img :src="'../public/images-group/' + images[0].name" alt="">
                    </div>
                    <!-- Если поставить значение 100%, и если картинок будет например 4, то они раздялят пространство по 25% -->
                    <div class="_group__images__bottom-container" v-if="images.length != 0">
                        <div class="_group__image" v-for="image in images.slice(1)" :key="0">
                            <img :src="'../public/images-group/' + image.name" alt="">
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
                <textarea name="body_post" id="body_post-id" cols="30" rows="10" placeholder="Текст..."></textarea>
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