<script setup lang="ts">
import {Ref, ref} from 'vue';
import {Post} from '../types/Post.types'
let posts: Ref<Post[]> = ref([
    {
        id: 0,
        title: 'Title of post',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        atCreated: '02/12/2029 0:00:00 PM',
        views: 10,
        likes: 324,
        comments: 92,
        urls_images: ['http://', 'http://', 'http://', 'http://', 'https://',],
        username: 'Elena Leonhard',
        userAvatarUrl: 'http://',
    },
    {
        id: 1,
        title: 'Title of post',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        atCreated: '02/12/2029 0:00:00 PM',
        views: 10,
        likes: 324,
        comments: 92,
        urls_images: ['http://', 'http://', 'http://', 'http://', 'https://',],
        username: 'Elena Leonhard',
        userAvatarUrl: 'http://',
    },
]);

</script>

<template>
    <div class="Posts">
        
        <div class="Posts__search_params">

            <select name="atCreated" id="date-created">
                <option value="new">New</option>
                <option value="old">Old</option>
            </select>


            <button class="search__byParams">Search</button>
        </div>

        <span class="title__page">Лента постов</span>
        <div class="Posts__container">

            <div class="Posts__list_posts">

                <div class="Posts__post" v-for="post in posts" :key="post.id">


                    <div class="posts__navigation-bar">
                        <div class="posts__like-container">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/00bfff/like--v1.png" alt="like--v1"/>
                            <span class="posts__likes-count">{{ post.likes }}</span>
                        </div>

                        <div class="posts__views-container">
                            <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/20/00bfff/visible--v1.png" alt="visible--v1"/>
                            <span class="posts__views-count">{{ post.views }}</span>

                        </div>

                        <div class="posts__comment-container">
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
                            <div class="post__img_container">
                                <img src="../../public/images/kali.jpg" alt="">
                            </div>
                            <div class="posts__body-content">
                                {{ post.body }}
                            </div>

                    </div>

                </div>

            </div>

        </div>
    </div>
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
        overflow: auto;
    }

    .Posts__search_params {
        width: 300px;
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
    }

    .post__title .post__title-dateCreated {
        margin-left: auto;
        font-size: 15px;
    }

    .post__img_container {
        width: 100%;
        height: fit-content;
        margin-top: 20px;
        border-radius: 10px;
    }

    .post__img_container img {
        width: 100%;
        height: 400px;
        border-radius: 10px;
        object-fit: contain;

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