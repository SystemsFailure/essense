<script setup lang="ts">
import { User } from 'types/User.types';

const {user, result}: {user: any, result: Boolean} = await useUser();


</script>
<template>
    <div class="profilef">
        <div class="container">
            <div class="left__block">
                <img src="" alt="" class="profile__avatar">

            </div>

            <div class="right__block" v-if="result">
                <div class="user__data">
                    <div class="username__field"><span>id user</span> : {{ user[0].id }}</div>
                    <div class="username__field"><span>name user</span> : {{ user[0].username }}</div>
                    <div class="username__field"><span>email user</span> : {{ user[0].email }}</div>
                </div>
            </div>

            <div class="bottom__block">
                
                <div class="chat">
                    <div class="chat__container">

                        <div class="chat__list-messages">

                            <div class="chat__message-body">

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style lang="css" scoped>
.profilef {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    margin: 0;
    padding: 100px 100px;
}

.container {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: row;

}

.left__block {
    width: calc(40% - 100px);
    height: 100%;
    background-color: #1d1d21;
    display: flex;
    flex-direction: column;
    padding: 10px;
    /* justify-content: center; */
    align-items: center;
}

.left__block .bottom__block {
    width: 200px;
    padding: 10px;
    height: auto;
    display: flex;
    flex-direction: column;


}

.left__block .bottom__block .btn__navigation {
    padding: 10px 30px;
    margin-top: 20px;
}


.right__block {
    width: calc(60% - 100px);
    margin-left: 20px;
    height: 100%;

}

.bottom__block {
    width: calc(60% - 100px);
    margin-left: 20px;
    height: 100%;
    background-color: #1d1d21;
    padding: 20px;
}

.chat {
    width: 100%;
    height: 100%;
}

.chat .chat__container {
    width: 100%;
    height: 100%;
}

.chat__list-messages {
    width: 100%;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
}
.chat__message-body {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: aliceblue;
}

.right__block .user__data {
    width: 100%;
    height: 200px;
    background-color: #1d1d21;
    color: white;
    padding: 20px;
    font-size: 18px;

    display: flex;
    flex-direction: column;

}



.right__block .user__data .username__field {}

.right__block .user__data .username__field span {
    opacity: .5;
}

.container .left__block .profile__avatar {
    width: 200px;
    height: 200px;
    object-fit: contain;
}
</style>