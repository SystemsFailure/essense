import { User } from "types/User.types"
export default async function useFriends(searchField: string) {
    let searchReference = ref('');
    function updateSearchField(value: string) {
        console.log(value);
        searchReference.value = value;
    }



    return {
        updateSearchField,
    }
}