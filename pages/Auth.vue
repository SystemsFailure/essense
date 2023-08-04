<template>
    <div class="auth">
        <div class="auth__content">
            <h1 class="auth__form-title">
                Auth Page
            </h1>
            <form class="auth__form" id="auth__form" @submit.prevent>
                <!-- EMAIL -->
                <InputComp class="form__input" id="email" v-model="email" type="email" :placeholder="'email'"></InputComp>
                <p class="form__input--error" v-show="isErrorEmail">uncorrectly email</p>
                <!-- USERNAME -->
                <inputComp class="form__input" id="username" v-model="username" :placeholder="'username'"></inputComp>
                <p class="form__input--error" v-show="isErrorUsername">username less than 4</p>
                <!-- PASSWORD -->
                <inputComp type="password" class="form__input" id="password" v-model="password" :placeholder="'password'"></inputComp>
                <p class="form__input--error" v-show="isErrorPassword">password less than 4</p>

                <ButtonComp class="form__button" @click="submit">submit</ButtonComp>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import useWatching from '../composables/AuthComp/useWatching';
import useAuth from '../composables/AuthComp/useAuth';

const email = ref<string>('');
const isErrorEmail = ref<boolean>(false);
const username = ref<string>('');
const isErrorUsername = ref<boolean>(false);
const password = ref<string>('');
const isErrorPassword = ref<boolean>(false);

useWatching(email, isErrorEmail, username, isErrorUsername, password, isErrorPassword);

async function submit() {
    const user = await useAuth({
        data: {
            email: email.value.trim(),
            username: username.value.trim(),
            password: password.value.trim(),
        }
    });
    user ? useRouter().push('Profile') : false;
}

</script>
<style scoped lang="css">
.auth {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(14, 14, 14);
    color: aliceblue;
}

.auth__content {
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.auth__content .auth__form-title {
    text-align: center;
    color: #999;
    margin-bottom: 10px;
    text-transform: uppercase;
    word-spacing: 5px;
    font-weight: 700;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: x-large;
}

.auth__form {
    display: flex;
    flex-direction: column;
}

.form__input {
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px 15px;
    background-color: transparent;
    border: 1px solid #333;
    color: aliceblue;
}

.form__input--error {
    color: hsl(0, 45%, 50%);
    text-shadow: 0px 0px 10px rgb(248, 42, 42);
    font-weight: bolder;
    margin: 2px;
}

.form__button {
    margin-top: 15px;
    align-self: flex-end;
    background: transparent;
    color: aliceblue;
    border: 1px solid #333;
    border-radius: 10px;
    padding: 10px 15px;    
}

.form__button:hover {
    cursor: pointer;
    opacity: .5;
    transition: .5s;
}
</style>
