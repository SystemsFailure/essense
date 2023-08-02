<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useCookies } from 'vue3-cookies';
let UniqueUser: Ref<any> = ref();
let my_posts:Ref<any[]> = ref([  ]);
// His function start through .0 sek last rendering on the server => rewrites the current user data

setTimeout(async () => {
  await getcurrentUser();
  const posts = await getPosts();
  my_posts.value = posts;
}, 110)

async function getcurrentUser() {
  // getting the current user if it exists in the localStorage
  // const stringJSONUser = JSON.parse(localStorage?.getItem('user-data') || '');
  const userId = useCookies().cookies.get('user-id');
  console.log(userId, 'user-id');
  
  
  // Getting the user from the database
  const {data} = await useFetch(`/api/${userId}`)
  
  
  UniqueUser.value = data.value?.response;
  console.log(UniqueUser.value)
};



  
async function getPosts() {
  const userId = useCookies().cookies.get('user-id');
  const {data} = await useFetch('/posts/getPostByUserId', {
    method: 'post',
    body: {
      userId: userId
    }
  })
  console.log(data.value?.response, 'needed posts');
  return data.value?.response;
  // my_posts.value = response.data.value?.response;
};




function slice_body(str: string): string {
  
  return str.slice(0, 100) + '...';
}


</script>


<template>
        
<section id="content" class="container">
    <!-- Begin .page-heading -->
    <div class="page-heading">
        <div class="media clearfix">
          <div class="media-left pr30">
            <a href="#">
              <img class="media-object mw150" src="01.jpg" alt="...">
            </a>
          </div>                      
        </div>

        <div class="content__data-user">

            <div class="content__user-id content__user-data"><span>user-uid : </span>{{ UniqueUser?.id_ || ''}}</div>
            <div class="content__user-name content__user-data"><span>username : </span>{{ UniqueUser?.username || '' }}</div>
            <div class="content__user-email content__user-data"><span>E-mail : </span>{{ UniqueUser?.email || '' }}</div>
            <div class="content__user-no content__user-data"><span>user-HEADER : </span>{{ 'no' }}</div>

            <div class="navigation">
              <button @click="useRouter().push('/friends')">Friends</button>
              <button @click="useRouter().push('/messanger')">Messanger</button>
              <button @click="useRouter().push('/posts')">Posts</button>
              <button @click="useRouter().push('/auth')">Log out</button>
              <button class="btn-new-post" @click="useRouter().push('/new-post')">new post</button>
            </div>
        </div>

        
    </div>

    <div class="posts">

      <div class="posts__container">

        <div class="posts__list">

          <div 
              class="posts__post" 
              v-for="post in my_posts" 
              :key="post._id"
              @click="useRouter().push('/posts/' + post._id)"
            >
            <!-- <img src="../public/images/image-post-default.jpg" alt="" class="img_back_post"> -->
            <div class="posts__body-post">

              <div class="posts__special-data">

                <div class="posts__views-count">
                  <!-- For all define img or icon  -->
                </div>

                <div class="posts__like-count">

                </div>

                <div class="posts__comments-count">

                </div>

              </div>

              <div class="posts__title">{{ post.title }}</div>

              <div class="posts__body">{{ slice_body(post.body) }}</div>
            </div>
          </div>

        </div>

      </div>

    </div>

  </section>
</template>

<!-- STYLING -->

<style lang="css" scoped>

.container {
    width: 100%;
    height: 100vh;
    display: block;
    padding: 20px;
    overflow-x: hidden;
    background-color: #000000;
}

.page-heading {
  position: relative;
  padding: 30px 40px;
  margin: -25px -20px 25px;
  background-color: #000000;
  display: flex;
}


.posts {
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  padding: 20px;
}

.posts .posts__container {
  width: 100%;
  background-color:#141414;
  height: 100%;
  padding: 20px;
}

.posts__list {
  width: 100%;
  height: fit-content;
  /* display: flex; */
  /* justify-content: center; */
  /* flex-wrap: wrap; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 280px);
  padding: 10px;

}

.posts__list .posts__post {
  /* background-image: url('../public/images/image-post-default.jpg'); */
  object-fit: contain;
  position: relative;
  width: 400px;
  height: 250px;
  background-color: #0c0c0c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(194, 194, 194);
  font-size: 15px;
  margin: 0 10px;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  margin-top: 20px;
}

.posts__list .posts__post::before {
  content: "";
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: -2px;
  background: linear-gradient(35deg, rgb(0, 208, 255), rgb(162, 0, 255));
  border-radius: 10px;
  z-index: -1;
}

.posts__list .posts__post:hover {
  cursor: pointer;
  opacity: 0.5;
  transition: .4s;
}

.posts__body-post {
  padding: 20px;

  width: 100%;
  height: 100%;
  border-radius: 10px;
  word-wrap: break-word;
  z-index: 2;
  background-color: rgba(rgb(2rgb(36, 36, 36), 22), rgb(18, 18, 18), rgb(28, 28, 28), .5);
  backdrop-filter: blur(50px);
  position: relative;
}

.posts__special-data {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;  
}

.posts__list .posts__post .img_back_post {
  /* position: absolute; */
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  object-fit: cover;
  border-radius: 10px;
  
}

.posts__list .posts__post .posts__title {
  font-size: 20px;
}
.posts__list .posts__post .posts__body {
  font-size: 17px;
  margin: 10px 0;

}

.media {
  color: #141414;
  font-weight: 600;
  margin-top: 15px;
}

.media img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
}

.content__data-user {
    width: 85%;
    margin-left: 20px;
    height: 200px;
    background-color: #141414;
    color: rgb(180, 180, 180);
    padding: 20px;
    border-radius: 10px;
}

.navigation {
  width: 100%;
  height: 50%;
  display: flex;
  padding-top: 30px;
}
.navigation button {
  padding: 10px 20px;
  height: fit-content;
  margin-left: 10px;

  border-radius: 10px;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  color: #6f6f6f;
  background-color: #000000;
  border: 1px solid #3a3a3a;
}

.navigation .btn-new-post {
  background: linear-gradient(35deg, rgb(0, 208, 255), rgb(162, 0, 255)) !important;
  color: rgb(0, 217, 255);
  border: 1px solid #3cff00;
  margin-left: 20px;
}

.navigation button:hover {
  cursor: pointer;
  opacity: 0.5;
  transition: .4s;
}

.content__data-user .content__user-data {
    font-size: 20px;
}

.media:first-child {
  margin-top: 0;
}


</style>