<script lang="ts" setup>
import {Post} from '../../types/Post.types';
let post: Ref<Post> = ref({
    id: 0,
    title: 'hello world',
    body: 'hello world lorem ipsum dolor sit ame hello world lorem ipsum dolor sit amet in id dolor sit am e justo in id dolor sit am e justo in id dolor sit hello world lorem ipsum dolor sit amet in id dolor sit am e justo in id dolor sit am e justo in id dolor sit t hello world lorem ipsum dolor sit amet in id dolor sit am e justo in id dolor sit am e justo in id dolor sit in id dolor sit am e justo in id dolor sit am e justo in id dolor sit am e justo in id dolor sit am e just o in id dolor sit am e justo in id dolor sit am e justo in id dolor sit am e justo in id dolor sit am e justo in id dolor sit am e justo in id justo in id dolor sit am e just o in id dolor sit am e justo in id dolor sit am e justo in id dolor sit am e justo in id dolor sit am e justo in id dolor sit am e justo in id',
    atCreated: '12/02/23 01:00:00 PM',
    views: 9,
    likes: 12,
    comments: 6,
    username: 'Eric Leonard',
    userAvatarUrl: 'http://',
    urls_images: ['http://', 'http://', 'http://', 'http://'],
});  
</script>

<template>
    <div class="postview">
        <div class="postview__post">

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
                    <img src="../../public/01.jpg" alt="">
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

                    <!-- Use this now... 27/07/23 11:00 PM -->

                    <div class="post__img_container">

                        <img src="../../public/images/kali.jpg" alt="">
                        
                    </div>

                    <!-- Use this now... 27/07/23 11:00 PM -->


                    <div class="posts__body-content">
                        {{ post.body }}
                    </div>

            </div>

        </div>
    </div>
</template>
<style lang="css" scoped>
    .postview {

        backdrop-filter: blur(100px);


        font-size: 16px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: #f6f6f6;

        display: flex;
        align-items: center;
        justify-content: center;

        width: fit-content;
        height: 100%;
        background-color: #131313;
        padding: 50px 400px;
        overflow: auto;
        overflow-x: hidden;
    }
    .postview__post {

        width: 100%;
        height: fit-content;

        background-color: #0f0f0f;
        border-radius: 10px;
        position: relative;
        padding: 10px;

        margin-top: 30px;

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