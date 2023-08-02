function validTitle(title:string):boolean {
    let result: boolean = false;
    if(title.length > 0 && title.length < 100 && title != '') {
        result = true;
    } else {
        result = false;
    }
    return result;
}

function validBody(body:string):boolean {
    let result: boolean = false;

    if(body.length > 0 && body.length < 10000 && body != '') {
        result = true;
    } else {
        result = false;
    }
    return result;
}

export {
    validTitle,
    validBody,
    
}