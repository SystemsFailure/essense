<template>
  <div class="regis">
        <div class="regis__content">
            <h1 class="regis__form-title">
                Registration Page
            </h1>
            <form class="regis__form" id="regis__form" @submit.prevent>
                <!-- EMAIL -->
                <InputComp class="form__input" id="email" v-model="email" type="email" :placeholder="'email'"></InputComp>
                <p class="form__input--error" v-show="isErrorEmail">uncorrectly email</p>
                <!-- USERNAME -->
                <inputComp class="form__input" id="username" v-model="username" :placeholder="'username'"></inputComp>
                <p class="form__input--error" v-show="isErrorUsername">username less than 4</p>
                <!-- PASSWORD -->
                <inputComp type="password" class="form__input" id="password" v-model="password" :placeholder="'password'"></inputComp>
                <p class="form__input--error" v-show="isErrorPassword">password less than 4</p>

                <ButtonComp class="form__button" @click="submit">Log in</ButtonComp>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import {Ref} from 'vue';
import useSubmitForm from '../composables/RegistrationComp/useSubmitForm';

const email: Ref<string> = ref<string>('');
const isErrorEmail = ref<boolean>(false);
const username: Ref<string> = ref<string>('');
const isErrorUsername = ref<boolean>(false);
const password: Ref<string> = ref<string>('');
const isErrorPassword = ref<boolean>(false);

async function submit() {
    await useSubmitForm(email, username, password)
}
</script>
<style lang="css" scoped>
.regis {
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

.regis__content {
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}


.regis__form {
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