<script lang="ts" setup>
const emit = defineEmits({
    closeThis: null,
});

</script>
<template>
    <div class="settings">
        <div class="settings__container">
            <img 
            class="close" 
            width="20" 
            height="20" 
            src="https://img.icons8.com/material-sharp/24/777777/delete-sign.png" 
            alt="delete-sign"
            @click="() => emit('closeThis')"
        />

            <button>clear history</button>
        
        </div>
    </div>
</template>
<style lang="css" scoped>
    .settings {
        width: 100%;
        height: 100vh;
        position: absolute;
        background-color: rgba(0, 0, 0, .6);
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }

    .settings .settings__container {
        width: 300px;
        height: 150px;
        background-color: rgba(0, 0, 0, 1);
        border: 1px solid #222;
        border-radius: 10px;
        padding: 10px;
        position: relative;
    }

    .settings .settings__container button {
        padding: 8px 15px;
        background-color: transparent;
        color: #999;
        border: 1px solid #222;
        border-radius: 10px;
    }

    .settings .settings__container button:hover {
        cursor: pointer;
        opacity: .8;
        transition: .5s;
        background-color: red;
        color: #fff;
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