// Email
import validateEmail from '../../validations/auth.valid';

export default function useWatching(
        email: Ref<string>,
        isErrorEmail: Ref<boolean>,
        username: Ref<string>,
        isErrorUsername: Ref<boolean>,
        password: Ref<string>,
        isErrorPassword: Ref<boolean>,
        
    ) : void {
    watch(() => email.value, (newValue) => {
        if (!validateEmail(newValue) && email.value.length) {
            isErrorEmail.value = true;
        } else isErrorEmail.value = false;
    });
    // Username
    watch(() => username.value, (newValue) => {
        if (username.value.length > 0 && username.value.length < 4) isErrorUsername.value = true;
        else isErrorUsername.value = false;
    });
    // Password
    watch(() => password.value, (newValue) => {
        if (password.value.length > 0 && password.value.length < 4) isErrorPassword.value = true;
        else isErrorPassword.value = false;
    });
}
