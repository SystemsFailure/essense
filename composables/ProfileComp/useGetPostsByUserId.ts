import { useCookies } from "vue3-cookies";

export default async function useGetPostsUserId(listPosts: Ref< any | undefined >): Promise<void> {
    const userId: string = useCookies().cookies.get('user-id');
    
    const {data} = await useFetch('/posts/getPostByUserId', {
      method: 'post',
      body: {
        userId: userId
      }
    })

    listPosts.value = data.value?.response;

}