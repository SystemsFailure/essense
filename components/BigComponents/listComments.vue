<script setup lang="ts">
import { useCookies } from 'vue3-cookies';
import myStore from '../../store/index';
const store = myStore();

import {Comment} from '../../types/Comment.types';

const emit = defineEmits({
    closeThis: null,
});

let implLike:Ref<boolean> = ref(true); // No use
let comment__text:Ref<string> = ref('');

let comments: Ref<Comment[]> = ref([  ]);

const {data} = await useFetch('/comments/getall', {
    method: 'post',
    body: {
        postId: useCookies().cookies.get('post_id'),
    }
})


if(data.value?.comments) {
    comments.value = data.value?.comments;
}




async function send() {
    const data: any = {
        userId: JSON.parse(localStorage.getItem('user-data') || '').id_,
        body: comment__text.value,
        destinationId: false,
        avatarUrl: JSON.parse(localStorage.getItem('user-data') || '').email, // This is change so fast how can !!!
        postId: useCookies().cookies.get('post_id') || '',
        likes: 0,
    }

    await useFetch('/comments/create', {
        method: 'post',
        body: {data}
    })

    comments.value.push(data);
    comment__text.value = '';

};

async function implementsLike(comment: Comment) {
    const {data} = await useFetch('/comments/implementLike', {
        method: 'post',
        body: {
            data: {
                commentId: comment._id,
                countLikes: comment.likes
            }
        }
    })

    if(data.value?.response) {
        await implementsCountCommentsByPostId(comment);
    }
};

async function implementsCountCommentsByPostId(comment: Comment) {
    comments.value.map((el) => {
        if(el._id === comment._id) {
            el.likes = el.likes + 1;
        }
    })
}

</script>






<template>
    <div class="listComments">
        <div class="listComments__container">
            <img 
                class="close" 
                width="20" 
                height="20" 
                src="https://img.icons8.com/material-sharp/24/777777/delete-sign.png" 
                alt="delete-sign"
                @click="() => {emit('closeThis'); store.showListComments = false;}"
            />

            <div class="listComments__list">

                <div class="listComments__item" v-for="comment in comments" :key="comment._id">
                    
                    
                    <div class="listComments__item__container-img-avatar"> 
                        <img src="../../public/01.jpg" alt=""> 
                    </div>

                    <div class="listComments__item__container-body">
                        <span>{{ comment?.body }}</span>
                        <div class="listComments__item__container-like">
                            <img v-if="implLike" @click="implementsLike(comment)" class="listComments__like-disabled" width="15" height="15" src="https://img.icons8.com/material-sharp/24/555555/facebook-like--v1.png" alt="facebook-like--v1"/>
                            <img v-else class="listComments__like-active" width="15" height="15" src="https://img.icons8.com/material-sharp/24/ffffff/facebook-like--v1.png" alt="facebook-like--v1"/>
                            <span class="countLikes">{{ comment.likes > 1000 ? `${Math.round(comment.likes) / 1000}K` : comment.likes }}</span>
                        </div>
                    </div>

                </div>

            </div>

            <div class="input__wrapper">

                <textarea type="text" placeholder="type comment..." class="input__comment" v-model="comment__text"></textarea>
                <img 
                    width="25" 
                    height="25" 
                    src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/888888/external-send-ecommerce-user-interface-inkubators-glyph-inkubators.png" 
                    alt="external-send-ecommerce-user-interface-inkubators-glyph-inkubators"
                    @click="send"
                    style="margin-left: 15px;"
                />
            </div>

        </div>
    </div>
</template>

<style lang="css" scoped>
    .listComments {
        color: #fff;
        width: 100%;
        height: 100vh;
        position: absolute;
        background-color: rgba(0, 0, 0, .6);
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        position: fixed;
    }

    .listComments .listComments__container {
        width: 500px;
        height: 600px;
        background-color: rgba(0, 0, 0, .8);
        backdrop-filter: blur(10px);
        border: 1px solid #222;
        border-radius: 10px;
        padding: 10px;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .listComments__list {
        width: 100%;
        height: 100%;
        overflow: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .listComments__list .listComments__item {
        width: fit-content;
        padding: 10px;
        display: flex;
        align-items: center;
        height: auto;
        margin-top: 10px;
        position: relative;
    }
    
    
    .listComments__item__container-body {
        position: relative;
        width: fit-content;
        padding: 15px;
        display: flex;
        align-items: center;
        height: auto;
        border: 1px solid #222;
        border-radius: 10px;
        background-color: #111;
        margin-left: 15px;
        padding-bottom: 25px;
    }

    .listComments__item__container-like {
        position: absolute;
        display: flex;
        align-items: center;
        bottom: 5px;
        right: 10px;
        margin-left: auto;
        .countLikes {
            margin-left: 8px;
        }

        .listComments__like-disabled:hover  {
            cursor: pointer;
            opacity: .5;
            transition: .5s;
        } 

        .listComments__like-active {

        }
    }
    
    .listComments__list .listComments__item .listComments__item__container-img-avatar img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 10em;
    }

    .input__wrapper {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;

        .input__comment {
            color: #999;
            max-width: 90%;
            min-width: 90%;
            max-height: 50px;
            min-height: 50px;
            padding: 10px;
            border-radius: 10px;
            background: transparent;
            border: 1px solid #222;
            outline: none;
        }
    }

    .input__wrapper img:hover {
        cursor: pointer;
        opacity: .5;
        transition: .5s;
    }

    .close {
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(30px);
        z-index: 1;
    }

    .close:hover {
        cursor: pointer;
        opacity: .5;
        transition: .5s;
    }
</style>