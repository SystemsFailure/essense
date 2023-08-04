import { User } from 'types/User.types';
import {useCookies} from 'vue3-cookies';

export default async function getCurrentUser(UniqueUser: any){
    // getting the current user if it exists in the localStorage
    const stringJSONUser = JSON.parse(localStorage?.getItem('user-data') || '');
    const userId = useCookies().cookies.get('user-id');
    
    if(!userId) useCookies().cookies.set('user-id', stringJSONUser.id_)
    
    // Getting the user from the database
    const {data} = await useFetch(`/api/${userId}`);

    console.log(data.value?.response, 'success')
    
    UniqueUser.value = data.value?.response;
}