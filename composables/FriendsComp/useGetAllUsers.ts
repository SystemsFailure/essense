import { User } from "types/User.types";

export default async function useGetAllUsers(friends:Ref< User[] | undefined | boolean >) : Promise<User[] | undefined | boolean> {

    const response = await useFetch('/users/getAllUsers', {
        method: 'post',
    });

    friends.value = response.data.value?.users;

    return response.data.value?.users ? response.data.value.users : undefined;

}