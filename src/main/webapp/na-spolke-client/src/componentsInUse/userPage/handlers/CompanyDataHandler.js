import {axiosPrivate} from "../../../api/axios";
import {useState} from "react";

let companies =  [
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

    // sessionStorage.setItem("companies", "[]");

    async function getCompaniesFromDb () {
        return axiosPrivate.get('/get-companies');
    }


    // function getCompanies () {
    //     return axiosPrivate.post('/get-companies')
    //         .then(res =>{
    //             if(res.data.length > JSON.parse(sessionStorage.getItem("companies")).length) {
    //                 let compTable = [];
    //                 let keys = Object.keys(res.data);
    //                 keys.forEach(key => {
    //                     console.log(res.data[key]);
    //                     compTable.push(res.data[key]);
    //                 })
    //                 console.log(JSON.stringify(compTable))
    //                 sessionStorage.setItem("companies", JSON.stringify(compTable));
    //                 console.log(JSON.parse(sessionStorage.getItem("companies")));
    //                 return sessionStorage.getItem("companies");
    //             }
    //             return sessionStorage.getItem("companies");
    //         })
    //     // return ["lol"];
    // }

    async function getCompanyById (id) {
        return axiosPrivate.get("/get-company-by-id/"+id)
    }

    async function getCompanyRole(id) {
        return axiosPrivate.post("/get-company-role", {companyId: id})
    }

    function selectCompanyInfoById (id, info) {
        for (let i in companies) {
            if (JSON.parse(sessionStorage.getItem("companies"))[i]['companyId'] === id) {
                return JSON.parse(sessionStorage.getItem("companies"))[i]['companyId'] === id[i][info];
            }
        }
        return null;
    }

export {getCompaniesFromDb, getCompanyById, getCompanyRole, selectCompanyInfoById};