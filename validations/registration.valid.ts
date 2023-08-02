function validname(name: string): boolean {
    let result = false;

    if(name.length > 0 && name.length < 40) {
        result = true;
    } else {
        result = false;
    }

    return result;
}

function validEmail(email: string): boolean {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let result = false;
    if(email.length > 0 && email.length < 50) {
        if(email.match(mailformat)) {
            result = true;
        }
    } else {
        result = false;
    }
    return result;
}


function validpassword(password: string): boolean {
    let result = false;
    if(password.length > 0 && password.length < 48) {
        result = true;
    } else {
        result = false;
    }

    return result;
}


export {
    validEmail,
    validname,
    validpassword
}