<template>
    <div class="friend__ID">
        
        <div class="friend__container">

            <div class="container">

                <div class="img__container">
                    <div class="online">

                    </div>
                    <img src="../../public/01.jpg" alt="">
                </div>

                <div class="user__data">

                    <div class="user__name">Eric Leonhard</div>
                    

                </div>

                <div class="navigation__profile">

                    <button v-if="false" disabled style="pointer-events: none;">Added</button>
                    <button v-else>Add to friends</button>
                    <button>Chat</button>

                </div>

            </div>

            <div class="messenger">

                <div class="type__field-message">
                    <input type="text" placeholder="type message...">
                </div>

                <div class="messenger__list">

                    <div 
                        class="messenger__message" 
                        v-for="message in messages" 
                        :key="message.id"
                        :style="message.from === 'x01'? {'marginLeft' : 'auto'} : {'marginRight' : '0'}"
                    >

                        <div class="messenger__message-body">

                            <div class="messenger__message-no-view" v-if="true"></div>
                            
                            <div class="messenger__message-view" v-else></div>

                            <div class="messenger__message-content">
                                {{ message.body }}
                            </div>

                            <div class="messenger__message-atCreated">
                                {{ message.atCreated.split(' ')[1] }}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div class="posts__container">

                <div class="posts__list">

                    <div class="posts__post" v-for="post in posts" :key="post.id">

                        <div class="posts__post-body">

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


                        </div>

                    </div>

                </div>

            </div>
            

        </div>

    </div>
</template>
<script lang="ts" setup>
import {Ref, ref} from 'vue';

interface Message {
    id: number;
    body: string;
    atCreated: string;
    atUpdated: string;
    atView: string;
    view: boolean;
    to: string;
    from: string;
};

interface Post {
    id: number;
    title: string;
    body: string;
    atCreated: string;
    views: number;
    likes: number;
    comments: number;
    urls_images: Array<string>,
};

let messages: Ref<Message[]> = ref([
    {
        id: 1, body: 'hello', atCreated: '02/12/2024 08:32 PM', atUpdated: '', atView: '', view: true, to: 'x01', from: 'x02'
    },
    {
        id: 2, body: 'hello', atCreated: '02/12/2024 08:32 PM', atUpdated: '', atView: '', view: true, to: 'x01', from: 'x02'
    },
    {
        id: 3, body: 'hello', atCreated: '02/12/2024 08:32 PM', atUpdated: '', atView: '', view: true, to: 'x02', from: 'x01'
    },
    {
        id: 4, body: 'hello', atCreated: '02/12/2024 08:32 PM', atUpdated: '', atView: '', view: true, to: 'x01', from: 'x02'
    },
]);

let posts: Ref<Post[]> = ref([
    {
        id: 0, title: 'Title of post here', body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur iusto doloribus, totam consectetur, eligendi voluptatum quos nobis odio adipisci quasi beatae dolore quae veniam ea culpa.',
        atCreated: '02/12/2024 08:32 PM', views: 45, likes: 254, comments: 53, urls_images: ['url1', 'url2', 'url3'],
    },
    {
        id: 0, title: 'Title of post here', body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur iusto doloribus, totam consectetur, eligendi voluptatum quos nobis odio adipisci quasi beatae dolore quae veniam ea culpa.',
        atCreated: '02/12/2024 08:32 PM', views: 45, likes: 254, comments: 53, urls_images: ['url1', 'url2', 'url3'],
    },
]);


</script>
<style lang="css" scoped>
    
    .friend__ID {

        width: 100%;
        height: fit-content;
        background-color: #090909;
        padding: 20px;

    }

    .friend__ID .friend__container {
        width: 100%;
        height: 100%;
        padding: 50px 250px;
        position: relative;
        background-color: #0f0f0f;
        display: flex;
        /* flex-wrap: wrap; */
        flex-flow: column;        
    }

    .container {

        width: 100%;
        height: 150px;
        background-color: #090909;
        position: relative;
        padding: 10px;
        padding-left: 20px;
        display: flex;
        align-items: center;
        border-radius: 10px;
    }

    .container .online {
        background-color: aqua;
        border-radius: 10em;
        position: absolute;
        bottom: 14.64%;
        right: 14.64%;
        -webkit-transform: translate(50%,50%);
        transform: translate(50%,50%);
        z-index: 1;
        width: 10px;
        height: 10px;
    }

    .container .navigation__profile {
        width: 70%;
        height: 30%;
        display: flex;
        align-items: center;
        position: relative;
    }

    .container .navigation__profile button {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 10px 25px;
        background-color: transparent;
        color: #fff;
        border: 1px solid #222;
        border-radius: 10px;
    }

    .container .navigation__profile button:hover {
        cursor: pointer;
        opacity: 0.5;
        transition: .5s;
    }

    .container .navigation__profile button:first-child {
        right: 15%;
    }

    .container .navigation__profile button:last-child {
        margin-left: 23%;
    }

    .container .img__container {
        position: relative;
    }

    .container .img__container img {
        width: 120px;
        height: 120px;
        border-radius: 10em;
        display: block;
        object-fit:cover;
    }

    .user__data {
        color: #ffffff;
        margin-left: 20px;
    }

    .user__data .user__name {
        font-size: 18px;
        font-weight: bold;
    }

    .messenger {
        position: relative;
        width: 100%;
        height: 400px;
        background-color: #090909;
        margin-top: 10px;
        border-radius: 10px;
        padding: 10px;
    }

    .type__field-message {
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .type__field-message input {
        width: 90%;
        padding: 10px 20px;
        border-radius: 20px;
        height: 100%;
        margin-right: auto;
        background-color: #0f0f0f;
        border: none;
        color: #fff;
        font-size: 15px;
        outline: none;
    }

    .messenger .messenger__list {

        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        overflow: auto;
        overflow-x: hidden;

    }

    .messenger .messenger__list .messenger__message {
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 10px 15px;
        background-color: #0f0f0f;
        border-radius: 10px;
        margin-top: 10px;
    }

    .messenger .messenger__list .messenger__message-body {
        color: #999;
        font-size: 15px;
        font-weight: 500;
        display: flex;
        position: relative;
    }

    .messenger .messenger__list .messenger__message-body .messenger__message-view {
        width: 8px;
        height: 8px;
        border-radius: 10em;
        background-color: aquamarine;
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0.5;
    }

    .messenger .messenger__list .messenger__message-body .messenger__message-no-view {
        width: 8px;
        height: 8px;
        border-radius: 10em;
        background-color: aquamarine;
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0.1;
    }

    .messenger .messenger__list .messenger__message-body .messenger__message-content {

    }

    .messenger .messenger__list .messenger__message-body .messenger__message-atCreated {
        font-size: 11px;
        margin-left: 20px;
        margin-top: 15px;
    }
    .posts__container {

        width: 100%;
        height: fit-content;
        background-color: #090909;
        margin-top: 10px;
        border-radius: 10px;

        padding: 10px;
    }

    .posts__list {
        width: 100%;
        height: 100%;
        padding: 100px;


    }
    .posts__post {

        width: 100%;
        height: fit-content;

        background-color: #0f0f0f;
        border-radius: 10px;

        padding: 10px;

        margin-top: 30px;
    }

    .posts__post:first-child {
        margin-top: -30px;
    }
    .posts__post-body {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 10px;
        color: #999;
        font-size: 18px;

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
        transform: translateX(80px) translateY(-10px);
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
    .posts__post-body .posts__body-content {
        margin-top: 20px;
        font-size: 17px;
        word-spacing: 1px;
        line-height: 25px;
        word-wrap: break-word;
        font-weight: bold;
    }

    .posts__post-body .post__title {
        display: flex;
    }

    .posts__post-body .post__title .post__title-dateCreated {
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
</style>