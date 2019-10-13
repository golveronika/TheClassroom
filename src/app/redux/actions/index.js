export const loggedUser = (isLogged, userName) => {
    return {
        type: 'SIGN_IN',
        isLogged,
        userName
    }
}

export const editItem = (id, edited_item) => {
    return {
        type: 'EDIT',
        id,
        edited_item
    }
}

export const deleteItem = (id) => {
    return {
        type: 'DELETE',
        id
    }
}

export const addItem = (item) => {
    return {
        type: 'ADD',
        item
    }
}

export const setFilterItems = (filters, dataItems) => {
    return {
        type: 'SET_FILTER',
        filters,
        dataItems,
    }
}