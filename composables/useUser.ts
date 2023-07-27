import { User } from "types/User.types";
export default async function useUser() {
    const id = 1;
    let result:Boolean = false;

    // const { data } = await useFetch(`/users/query?id=1`);
    let user: Ref<User[] | object | undefined | null> = ref([
        { id: 0, username: 'Johny', email: 'user@example.com' },
    ]);
    const { data } = await useFetch('/users/get-user',{
        query: { id: id }
    })

    if(data.value?.user)  {
        user.value = [data.value?.user];
        result = true;
    } else {
        result = false;
    }
    
    return {
        user: user,
        result: result,
    }
}