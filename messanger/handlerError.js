// Модуль обработки ошибок

// Функция обрабатывает ответ на клиент возвращаемый с операций БД
function checkResponseDB(response) {
    const errors = response?.errors;
    if (errors && errors.length) {
        const errorResponse = { status: 'Error', target: [] }
        for (const err of errors) {
            errorResponse.target.push({ validatorKey: err.validatorKey, path: err.path })
        }
        if (errors.length <= 1) {
            return { status: 'Error', target: { validatorKey: errors[0].validatorKey, path: errors[0].path } };
        }
        return errorResponse;
    } else {
        return response;
    }
}

module.exports = {
    checkResponseDB,
}
