const companies =  [
        {'name':"spółka 1", 'id':'fajeif04i1'},
        {'name':"spółka bardzo fajna", 'id':'f2390fjij2'},
        {'name':"kampania krzysiowa", 'id':'3y903k49kizjg9'},
    ]

function getCompanies () {
    return companies;
}

function getCompanyById (id) {
    for (let i in companies) {
        if (companies[i]['id'] == id) {
            return companies[i];
        }
    }
    return null;
}

export {getCompanies, getCompanyById};