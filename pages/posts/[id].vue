<script setup lang="ts">
import { useCookies } from 'vue3-cookies';
const {cookies} = useCookies();

let show_listComments: Ref<boolean> = ref(false);
let post: Ref<any> = ref({});



async function getPost() {
    const postId = useRoute().params.id;
    console.log(postId);
    
    if(postId) {
        const {data} = await useFetch('/posts/getPostById', {
            method: 'post',
            body: {postId: postId}
        })
        console.log(data.value?.post, 'post');
        
        post.value = data.value?.post;
    }
};
await getPost();



function openCommentsWindow() {
    show_listComments.value = true;
    setCurrentPostId();
};

onMounted(async () => {
    console.log(cookies.get('post_id'), 'post_id');
})


function setCurrentPostId() {
    const str_post_id: string = useRoute().params.id;
    cookies.set('post_id', str_post_id);
};

</script>

<template>
    <listComments v-if="show_listComments" @close-this="show_listComments = false"></listComments>
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

                <div class="posts__comment-container" @click="openCommentsWindow">
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

        width: 100%;
        height: 100vh;
        background-color: #131313;
        padding: 350px 400px;
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

        margin-top: 250px;

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