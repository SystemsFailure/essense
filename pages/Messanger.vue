<script setup lang="ts">
import settingsChat from '../components/BigComponents/settingsChat.vue';
import { Ref, ref } from 'vue';
import { Chat } from '../types/Chat.types';
import { Message } from '../types/Message.types';

let currentContactId: any = ref('');
let showSettingsChat: Ref<boolean> = ref(false);
let messageField: Ref<string> = ref('');

let contacts: Ref<Chat[]> = ref([
   {
    id: '01fx', url_image: 'http://', name: 'Elena Leonhard', dateLastMessage: '06:32 PM', countNotReadMessage: 10,
   },
   {
    id: '02fx', url_image: 'http://', name: 'Ervin Smith', dateLastMessage: '03:32 PM', countNotReadMessage: 0,
   }, 
   {
    id: '03fx', url_image: 'http://', name: 'Jhon Snow', dateLastMessage: '01:32 AM', countNotReadMessage: 3,
   }, 
]);

let messages: Ref<Message[]> = ref([
    {
        id: 0,
        body: 'Heloo',
        atCreated: '01:32 AM',
        atUpdated: '01:32 AM',
        atView: 'Jhon Snow',
        view: true,
        to: '01x',
        from: '02x',
    },
    {
        id: 0,
        body: 'Welcome to the world',
        atCreated: '01:32 AM',
        atUpdated: '01:32 AM',
        atView: 'Jhon Snow',
        view: true,
        to: '01x',
        from: '02x',
    },
    {
        id: 0,
        body: 'hope for the future',
        atCreated: '01:32 AM',
        atUpdated: '01:32 AM',
        atView: 'Jhon Snow',
        view: true,
        to: '01x',
        from: '02x',
    },
]);

async function selectContact(id: any) {
    currentContactId.value = id;
    const response = await $fetch('http://localhost:8080/', { method: 'GET'});
    console.log(response);
    
};

function send() {
    console.log('send', { body: messageField.value.trim() });
};


</script>

<template>
    <settingsChat
        v-if="showSettingsChat"
        @closeThis="() => showSettingsChat = false"
    ></settingsChat>
    
    <div class="Messanger">
        
        <div class="contacts">
            <div class="contacts__list">
                
                <div 
                    class="contacts__item" 
                    v-for="contact in contacts"
                    :id="contact.id + '-idContact'" 
                    :key="contact.id" 
                    :style="currentContactId === contact.id? {'backgroundColor':'purple'} : {'backgroundColor': '#111'}"
                    @click="selectContact(contact.id)"
                >
                    
                    <div class="contacts__icon">
                        <img src="../public/01.jpg" alt="">
                        <div class="contacts__online"></div>
                    </div>
                    <div class="contacts__name"><span>{{ contact.name }}</span></div>
                    <div class="contacts__count_last_message"><span>{{ contact.countNotReadMessage }}</span></div>
                    <div class="contacts__data-last-message"><span>{{ contact.dateLastMessage }}</span></div>
                    
                </div>
                
            </div>
        </div>
        
        <div class="chat">
            <img 
                class="settings" 
                width="20" 
                height="20" 
                src="https://img.icons8.com/ios-filled/50/999999/settings.png" 
                alt="settings"
                @click="() => showSettingsChat = true"
            />


            <div class="chat__list">

                <div class="chat__message-body" v-for="message in messages" :key="message.id">

                    <div class="chat__message-content">
                        <span>{{ message.body }}</span>
                    </div>

                    <div class="chat__message-date">
                        <span>{{ message.atCreated }}</span>
                    </div>

                    <div class="chat__message-no-view" v-if="true"></div>
                    <div class="chat__message-view" v-else></div>

                </div>

            </div>

            <div class="chat__type-field">
                <input 
                    type="text" 
                    placeholder="type message..."
                    v-model="messageField"
                    @keydown.enter="send"
                >
                <img 
                    width="22" 
                    height="22" 
                    src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/888888/external-send-ecommerce-user-interface-inkubators-glyph-inkubators.png" 
                    alt="external-send-ecommerce-user-interface-inkubators-glyph-inkubators"
                    @click="send"
                />
            </div>

        </div>

    </div>
</template>
<style lang="css" scoped>
    .Messanger {

        padding: 100px 150px;
        width: 100%;
        height: 100vh;
        background-color: black;
        display: flex;
        /* color: #099999; */

        color: #999;
        font-size: 14px;

    }

    .Messanger .settings {
        position: absolute;
        right: 10px;
        top: 10px;
        opacity: .8;
    }
    .Messanger .settings:hover {
        cursor: pointer;
        opacity: .3;
        transition: .5s;
    }

    .contacts {

        width: 30%;
        height: 100%;
        padding: 20px;
        background-color: #0f0f0f;
        border-radius: 10px;

    }
    .contacts__list {

        width: 100%;
        height: 100%;
        overflow: auto;

    }
    .contacts__item {

        width: 100%;
        height: 70px;
        padding: 10px;
        border: 1px solid #222;
        border-radius: 10px;
        display: flex;
        align-items: center;
        margin-top: 10px;
        position: relative;

    }

    .contacts__item:hover {
        cursor: pointer;
        opacity: .5;
        transition: .5s;
    }

    .contacts__icon {

        width: 50px;
        height: 50px;
        border-radius: 10em;
        position: relative;
    }

    .contacts__icon img {
        width: 50px;
        height: 50px;
        border-radius: 10em;
        object-fit: cover;
    }

    .contacts__name {

        margin-left: 20px;

    }
    .contacts__count_last_message {

        margin-left: 10px;
        /* background-color: #099; */
        color: #099;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        width: 22px;
        font-size: 10px;
        height: 22px;
        border-radius: 50%;
        border-left: 1px solid #333;
        border-bottom: 1px solid #333;

    }
    .contacts__online {

        width: 8px;
        height: 8px;
        position: absolute;
        border-radius: 10em;
        background-color: #099;       
        bottom: 14.64%;
        right: 14.64%;
        transform: translate(50%,50%);
        z-index: 1;

    }
    .contacts__data-last-message {

        margin-left: auto;
        font-size: 11px;

    }
    .chat {
        border-radius: 10px;
        padding: 20px;
        width: 69%;
        margin-left: auto;
        right: 0;
        height: 100%;
        background-color: #0f0f0f;
        position: relative;
    }

    .chat .chat__type-field {
        width: 100%;
        height: 50px;
        position: absolute;
        left: 0;
        bottom: 0;
        border-end-start-radius: 10px;
        border-end-end-radius: 10px;
    }

    .chat .chat__type-field input {
        width: 90%;
        height: 100%;
        border-end-end-radius: 10px;
        border-end-start-radius: 10px;
        background-color: transparent;
        padding: 10px 20px;
        border: none;
        outline: none;
        color: #fff;
    }

    .chat .chat__type-field img {
        position: absolute;
        right: 20px;
        bottom: 12px;
    }

    .chat .chat__type-field img:hover {
        cursor: pointer;
        opacity: .5;
        transition: .5s;
    }

    .chat__list {

        width: 100%;
        height: 100%;
        padding: 10px;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }
    .chat__message-body {

        width: fit-content;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        background-color: #141414;
        border-radius: 10px;
        margin-top: 10px;
        position: relative;

    }
    .chat__message-content {


    }
    .chat__message-date {
        font-size: 10px;
        margin-left: 20px;
        margin-top: 15px;
    }

    .chat__message-view {
        width: 5px;
        height: 5px;
        border-radius: 10em;
        background-color: #099;
        position: absolute;
        top: 8px;
        right: 8px;
    }

    .chat__message-no-view {
        width: 5px;
        height: 5px;
        border-radius: 10em;
        background-color: #099;
        position: absolute;
        top: 8px;
        right: 8px;
        opacity: .3;
    }

</style>