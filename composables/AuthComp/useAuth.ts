import { UserAttributes, UserForAuth, User as UserType } from "types/User.types";

export default async function useAuth(user_: UserForAuth): Promise<UserType | undefined | null> {
    const response = await useFetch('/auth/auth', {
        method: 'post',
        body: {
            email: user_?.data?.email,
            username: user_?.data?.username,
            password: user_?.data?.password,
        }
    })

    let user: UserType | undefined | null = response.data.value?.user;

    return user;
}