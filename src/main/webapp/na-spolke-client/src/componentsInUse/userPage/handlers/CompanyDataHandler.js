const companies =  [
        {'companyId':'fajeif04i1', 'companyName':"spółka 1", 'krsNumber': '0000123456',
            'address':'goleniowska 1 goleniów', 'nip':'123451245512', 'regon':'1231513',
            'shareCapital':50000, 'shareValue': 50, 'sharesCount': 1000,
            'boardMembers':[
                {'firstName':'brick', 'lastName':'clock', "address":"t2treghe", 'function':'nie wiem co to'},
                {'firstName':'fick', 'lastName':'fock', "address":"grge21", 'function':'dalej nie wiem co to'},
            ],
            'boardOfDirectors':[
                {'firstName':'jared', 'lastName':'leto', 'address':'123 asd'},
                {'firstName':'angelina', 'lastName':'jolie', 'address':'456 fgh' },
            ],
            'partners':[
                {'name':'john wit', 'address':'jakaś ulica 1 miasto 3', 'sharesValue':15000, 'sharesCount':300},
                {'name':'jehn witch', 'address':'jakaś ulica 2 miasto 3', 'sharesValue':35000, 'sharesCount':700},
            ],
            'companyUserRole': []
        },
        {'companyId':'f90kf92390ji', 'companyName':"kampania krzysiowa", 'krsNumber': '0000234567',
            'address':'turystyczna 5 goleniów', 'nip':'120490194', 'regon':'1231512',
            'shareCapital':450000, 'shareValue': 150, 'sharesCount': 3000,
            'boardMembers':[
                {'firstName':'brick2', 'lastName':'clock2', "address":"nbvery34", 'function':'nie wiem co to2'},
                {'firstName':'fick2', 'lastName':'fock2', "address":"231ghrehd", 'function':'dalej nie wiem co to2'},
            ],
            'boardOfDirectors':[
                {'firstName':'jared2', 'lastName':'leto2', 'address':'321 jkl'},
                {'firstName':'angelina2', 'lastName':'jolie2', 'address':'789 qwe'},
            ],
            'partners':[
                {'name':'john wit', 'address':'jakaś ulica 1 miasto 3', 'sharesValue':300000, 'sharesCount':2000},
                {'name':'jehn witch', 'address':'jakaś ulica 2 miasto 3', 'sharesValue':150000, 'sharesCount':1000},
            ],
            'companyUserRole': []
        },

    ]

function getCompanies () {
    return companies;
}

function getCompanyById (id) {
    for (let i in companies) {
        if (companies[i]['companyId'] == id) {
            return companies[i];
        }
    }
    return null;
}

function selectCompanyInfoById (id, info) {
    for (let i in companies) {
        if (companies[i]['companyId'] == id) {
            return companies[i][info];
        }
    }
    return null;
}

export {getCompanies, getCompanyById, selectCompanyInfoById};