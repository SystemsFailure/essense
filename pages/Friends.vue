<script setup lang="ts">
import {Ref, ref, computed} from 'vue'; 
import { User } from "types/User.types";
import useGetAllUsers from '../composables/FriendsComp/useGetAllUsers';
let searchField: Ref<string> = ref('');

let friends: Ref<User[] | undefined> = ref([]);

await useGetAllUsers(friends);

const filteredFriends: any = computed(() => {
    return friends.value?.filter((el: any) => el.username.includes(searchField.value))
})

function goToProfileFriend(friend: any) {
    useRouter().push(`/friends/${friend.id}`)
}

</script>

<template>
    <div class="Friends">
        <div class="Friends__goBack"><button @click="useRouter().push('/profile')">Go back</button></div>

        <div class="Friends__container">

            <div class="Friends__search-friends">
                <input v-model="searchField" type="text" placeholder="search...">
            </div>

            <div class="Friends__body">

                <div class="Friends__listOfFriends">

                    <div v-for="friend in filteredFriends" :key="friend?.id" class="Friends__item">


                        <div class="Friends__icon Friends__bodyItem"><img src="01.jpg" alt=""></div>
                        <div class="Friends__userName Friends__bodyItem"><span>{{ friend.username }}</span></div>
                        <!-- <div class="Friends__userEmail Friends__bodyItem">{{ friend.email }}</div> -->
                        <div class="Friends__AtDate Friends__bodyItem">{{ friend.createdAt }}</div>

                        <button @click="goToProfileFriend(friend)">Visit</button>

                    </div>

                </div>

            </div>

        </div>

    </div>
</template>
<style lang="css" scoped>
.Friends {
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: #000000;
    padding: 100px 300px;
}
.Friends__goBack {
    position: absolute;
    left: 10px;
    top: 10px;
    color: white;
}

.Friends__goBack button {
    padding: 10px 20px;
    background-color: #1d1d21;
    color: #fff;
    border: none;
    font-size: 20px;
    border-radius: 10px;
}

.Friends__goBack button:hover {
    cursor: pointer;
    opacity: 0.5;
    transition: .4s;
}

.Friends__container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.Friends__search-friends input {
    background-color: #0f0f0f;
    border: none;
    outline: none;
    color: #fff;
    width: 100%;
    height: 50px;
    padding: 20px;
    border-radius: 10px;
}

.Friends__body {
    width: 100%;
    height: 100%;
}
.Friends__listOfFriends {
    width: 100%;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    padding: 20px;
    display: flex;
    flex-direction: column;
}
.Friends__item {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    padding: 15px;
    margin-top: 18px;
    background-color: #0f0f0f;
    color: white;
    font-size: 18px;
    border-radius: 10px;
    
}

.Friends__item button {
    padding: 10px 20px;
    border: none;
    text-align: center;
    font-size: 18px;
    margin-left: auto;
    background-color: #000;
    border: 1px solid #444;
    border-radius: 10px;
    color: #fff;
}

.Friends__bodyItem {
    margin-left: 10px;
    font-size: 20px;
}

.Friends__icon img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    object-fit: cover;
}

.Friends__userName {
    margin-left: 20px;
    font-size: 18px;
}
.Friends__userEmail {
    margin-left: 40px;
    font-size: 18px;

}
.Friends__AtDate {
    font-size: 15px;
    width: 100%;
    text-align: end;
    margin-right: 30px;
}
</style>