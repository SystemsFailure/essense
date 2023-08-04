import { PostForCreate } from "types/Post.types";

// useRoute().params.id;
async function useGetPostById(postId: string | string[], post: Ref<PostForCreate | undefined | null | boolean | any>) : Promise<globalThis.Ref<boolean>> {
    
    const {data, pending} = await useLazyFetch('/posts/getPostById', {
        method: 'post',
        body: {postId: postId}
    })
    console.log(data.value?.post, 'post');
    
    post.value = data.value?.post;

    return pending
}

export default useGetPostById;