export const defaultDataTable = {
    payload: [
        {
            id: "01",
            name: "Milosh",
            surname: "Zeman",
            gender: "Male",
            birthday: "23.09.1953",
            isStudent: false,
            created: "07.10.1990",
            lastEdit: "08.10.1991",
        },        
        {
            id: "02",
            name: "Gregor",
            surname: "Kolbasov",
            gender: "Male",
            birthday: "01.02.1990",
            isStudent: true,
            created: "04.10.2009",
            lastEdit: "04.10.2009",
        },
        {
            id: "03",
            name: "Angella",
            surname: "Merkel",
            gender: "Female",
            birthday: "18.06.1950",
            isStudent: true,
            created: "04.10.2015",
            lastEdit: "14.12.2015",
        },
        {
            id: "04",
            name: "Zdenek",
            surname: "Miller",
            gender: "Male",
            birthday: "03.03.1968",
            isStudent: true,
            created: "01.10.2016",
            lastEdit: "05.10.2017",
        },
        {
            id: "05",
            name: "Britney",
            surname: "Spears",
            gender: "Female",
            birthday: "04.03.1987",
            isStudent: false,
            created: "01.10.2019",
            lastEdit: "05.10.2019",
        }
    ]
};


export const defaultFilter = {
    name: {
        search: null,
        sort: null,
    },
    surname: {
        search: null,
        sort: null,
    },
    gender: {
        category: null,
        sort: null,
    },
    isStudent: {
        category: null,
        sort: null,
    },
    birthday: {
        from: null,
        to: null,
        sort: null,
    },
    created: {
        from: null,
        to: null,
        sort: null,
    },
    lastEdit: {
        from: null,
        to: null,
        sort: null,
    },
};

export const defaultLogged = {
    isLogged: false,
    userName: ''
};