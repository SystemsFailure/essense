<template>
    <div class="skilleton_">

        <div class="skilleton__post">

            <div class="skilleton__title"></div>

            <div class="skilleton__suptitle"></div>

            <div class="skilleton__image"><img width="100" height="100" src="https://img.icons8.com/ios/50/292929/image--v1.png" alt="image--v1"/></div>
            
            <div class="skilleton__body"></div>

        </div>

    </div>
</template>
<script lang="ts" setup>



</script>
<style lang="scss" scoped>
$base-color: #1e1e1e;
$shine-color: #ffffff;
$animation-duration: 1.6s;
$avatar-offset: 82;
@mixin background-gradient {
    background-image: linear-gradient(90deg, $base-color 0px, $shine-color 90px, $base-color 150px);
    background-size: 650px;
}

    .skilleton_ {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .skilleton__post {
        width: 500px;
        height: 600px;
        background-color: #0b0b0b;
        border-radius: 10px;
        padding: 30px;
        display: flex;
        flex-direction: column;
    }
    .skilleton__title {

        width: 100%;
        height: 50px;
        background-color: #1e1e1e;
        border-radius: 10px;
        @include background-gradient;
        animation: shine-title $animation-duration infinite;
    }

    @keyframes shine-title {
            0% {
                background-position: -300px + $avatar-offset
            }
    
            40%, 100% {
                background-position: 380px + $avatar-offset
            }
    }

    .skilleton__suptitle {
        width: 50%;
        height: 20px;
        background-color: #1e1e1e;
        border-radius: 10px;
        margin-top: 20px;
        @include background-gradient;
        animation: shine-subtitle $animation-duration infinite;
    }

    @keyframes shine-subtitle {
            0% {
                background-position: -300px + $avatar-offset
            }
    
            40%, 100% {
                background-position: 380px + $avatar-offset
            }
    }

    .skilleton__image {

        width: 100%;
        height: 50%;
        background-color: #1e1e1e;
        border-radius: 10px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        @include background-gradient;
        animation: shine-image $animation-duration infinite;

    }

    @keyframes shine-image {
            0% {
                background-position: -300px + $avatar-offset
            }
    
            40%, 100% {
                background-position: 380px + $avatar-offset
            }
    }

    .skilleton__body {

        width: 100%;
        height: 100px;
        background-color: #1e1e1e;
        border-radius: 10px;
        margin-top: 40px;
        @include background-gradient;
        animation: shine-body $animation-duration infinite;
    }

    @keyframes shine-body {
            0% {
                background-position: -300px + $avatar-offset
            }
    
            40%, 100% {
                background-position: 380px + $avatar-offset
            }
    }
</style>