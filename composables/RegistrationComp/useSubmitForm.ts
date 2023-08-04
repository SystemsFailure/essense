import { validname, validEmail, validpassword } from "../../validations/registration.valid";
import { UserAttributes } from "types/User.types";
import { useCookies } from "vue3-cookies";
import { Ref } from "vue";

export default async function useSubmitForm(
        email: Ref<string>,
        username: Ref<string>, 
        password: Ref<string>

    ) : Promise<void> {

    if(validEmail(email.value.trim()) && validname(username.value.trim()) && validpassword(password.value.trim())) {
        const Userdata: UserAttributes = {
            username: username.value.trim(), 
            password: password.value.trim(),
            email: email.value.trim(),
            friends: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };
        const {data} = await useFetch('/regis/createUser', {method: 'post', body: {data: Userdata}});
        if(data.value?.result === true) {
            
            localStorage.setItem('user-data', JSON.stringify(data?.value?.user));
            useCookies().cookies.set('user-id', data?.value?.user?.id);
            useRouter().push('/profile');
        }
        console.log('register is successful', data);
    }

}