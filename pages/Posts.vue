<script setup lang="ts">
import {Ref, ref} from 'vue';
import myStore from '../store/index';
import {useCookies} from 'vue3-cookies';
import { PostWithoutId} from '../types/Post.types'
import { Image } from 'types/Image.types';
import {onMounted} from 'vue';
let posts: Ref<PostWithoutId[] | undefined> = ref([]);


let listRefsItems: any = [];
let scrollArea: any = undefined;
const setItemRef = (el: any) => {
    if (el) {
        listRefsItems.push(el);
    }
}


const store = myStore();

await getAllPosts();

onMounted( () => {
    trackingObserver();
})


async function getAllPosts() {
    const {data} = await useFetch('/posts/getAllPosts', {
        method: 'post'
    });
    posts.value = data.value?.response;

};

function openWindowComments(post: PostWithoutId) {
    useCookies().cookies.set('post_id', post._id);
    console.log(useCookies().cookies.get('post_id'));
    store.showListComments = true;
}


function test(post: PostWithoutId) {
    console.log(post);
    
}

function openImage(image: Image) {
    console.log(image);  
};

function markAsViewed(entries: any, observer: any) {
    entries.forEach((el: any) => {
        if(el.isIntersecting){
            console.log('markAsViewed');
        }
    });
};

function trackingObserver(): void {

    let options: {} = {
        root: scrollArea,
        rootMargin: '200px',
        threshold: 1.0,
    }
    let observer = new IntersectionObserver(markAsViewed, options);
    let tragets: any = listRefsItems;

    for (let index: number = 0; index < tragets.length; index++) {
        const element = tragets[index];
        observer.observe(element);
    }

    
}


</script>

<template>
<!-- <ClientOnly placeholder="loading..."> -->

    <ListComments v-if="store.showListComments"></ListComments>
    <div class="Posts" :ref="scrollArea">
        
        <div class="Posts__search_params">

            <select name="atCreated" id="date-created">
                <option value="new">New</option>
                <option value="old">Old</option>
            </select>


            <button class="search__byParams">Search</button>
        </div>

        <span class="title__page">Лента постов</span>
        <div class="Posts__container">


                
            <div class="Posts__list_posts"  id="scrollArea_">

                <div class="Posts__post" v-for="post in posts" :key="post._id" @click="test(post)" :ref="setItemRef">


                    <div class="posts__navigation-bar">
                        <div class="posts__like-container">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/00bfff/like--v1.png" alt="like--v1"/>
                            <span class="posts__likes-count">{{ post.likes }}</span>
                        </div>

                        <div class="posts__views-container">
                            <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/20/00bfff/visible--v1.png" alt="visible--v1"/>
                            <span class="posts__views-count">{{ post.views }}</span>

                        </div>

                        <div class="posts__comment-container" @click="openWindowComments(post)">
                            <img width="20" height="20" src="https://img.icons8.com/ios/20/00bfff/comments--v1.png" alt="comments--v1"/>

                            <span class="posts__comments-count">{{ post.comments }}</span>
                        </div>
                    </div>


                    <div class="Posts__post-body">

                        <div class="post__user">
                            <img src="../public/01.jpg" alt="">
                            <span>
                                {{ post.username }}
                            </span>
                        </div>

                        <div class="post__title">
                                {{post.title}}
                                
                                <div class="post__title-dateCreated">
                                    {{ post.atCreated }}
                                </div>
                            </div>


                            <div class="_group__images" v-if="post.images.length > 0">

                                <div class="_group__firstImage" v-if="post.images.length >= 1">
                                    <img :src = 'post.images[0].url' alt="">
                                </div>
                                <!-- Если поставить значение 100%, и если картинок будет например 4, то они раздялят пространство по 25% -->
                                <div class="_group__images__bottom-container" v-if="post.images.length > 1">
                                    <div class="_group__image" v-for="image in post.images.slice(1)" :key="0" @click="openImage(image)">
                                        <img :src="image.url" alt="">
                                    </div>
                                </div>


                            </div>


                            <div class="posts__body-content">
                                {{ post.body }}
                            </div>

                    </div>

                </div>

            </div>

        </div>
    </div>

<!-- </ClientOnly> -->

</template>
<style lang="css" scoped>
    .title__page {
        text-align: center;
        width: 100%;
        position: absolute;
        font-size: 30px;
        font-weight: bold;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        word-spacing: 5px;
        /* overflow: auto; */
    }

    .Posts__search_params {
        width: 20%;
        height: 300px;
        position: absolute;
        left: 30px;
        top:70px;
        background-color: transparent;
        padding: 10px;
    }

    .Posts__search_params .search__byParams {
        margin-top: 10px;
        padding: 8px 20px;
        border-radius: 5px;
        background: transparent;
        border: 1px solid #333;
        color: aliceblue;
    }

    .Posts__search_params .search__byParams:hover {
        cursor: pointer;
        opacity: .5;
        transition: .5s;
    }

    .Posts__search_params #date-created {
        width: 100%;
        padding: 10px 15px;
        background-color: #131313;
        color: aliceblue;
        outline: none;
        border-radius: 5px;
    }



    .Posts {
        position: relative;
        width: 100%;
        height: fit-content;
        padding: 20px;
        background-color: black;
        overflow: auto;
        overflow-x: hidden;
        color: #999;
        display: flex;
        flex-direction: column;
    }

    .Posts__container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 50px 100px;
        width: 100%;
        height: 100%;
    }

    .Posts__list_posts {
        width: 800px;
        height: 100%;
        background-color: #131313;
        border-radius: 10px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .Posts__post {
        width: 100%;
        height: fit-content;

        background-color: #0f0f0f;
        border-radius: 10px;
        position: relative;
        padding: 10px;

        margin-top: 30px;

    }

    .Posts__post:first-child {
        margin-top: 10px;
    }

    .Posts__post-body {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 10px;
        color: #999;
        font-size: 18px;

    }

    .post__user {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .post__user:hover {
        cursor: pointer;
        opacity: .5;
        transition: .5s;
    }

    .post__user span {
        margin-left: 20px;
    }

    .post__user img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 10em;
        
    }

    .posts__body-content {
        margin-top: 20px;
        font-size: 17px;
        word-spacing: 1px;
        line-height: 25px;
        word-wrap: break-word;
        font-weight: bold;
    }

    .post__title {
        display: flex;
        margin-top: 30px;
        margin-left: 10px;
        height: 40px;
    }

    .post__title .post__title-dateCreated {
        margin-left: auto;
        font-size: 15px;
    }


    ._group__images {
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

    .posts__navigation-bar {
        position: absolute;
        right: 0;
        width: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 10px;
        height: fit-content;
        border-radius: 20px;
        background-color: #0f0f0f;
        top: 0;
        transform: translateX(80px) translateY(-0px);
    }

    .posts__like-container {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }
    .posts__like-container:hover {
        cursor: pointer;
        opacity: .5;
        transition: .5s;
    }
    .posts__views-container {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        justify-content: center;
    }
    .posts__views-container:hover {
        cursor: pointer;
        opacity: .5;
        transition: .5s;
    }
    .posts__comment-container {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        justify-content: center;
    }
    .posts__comment-container:hover {
        cursor: pointer;
        opacity: .5;
        transition: .5s;
    }
</style>