import React, {useMemo, useReducer, useState} from "react";
import {createContext} from "react";

export const CompanyContext = React.createContext({
})


export const pageType = {
    BOARD_MEMBER: "board",
    DIRECTORS: "directors",
    PARTNERS: "partners",
    BASE_INFO: "baseInfo",
    ADDRESS: "address"
}

const companyDataReducer = (state, action) => {
    let newState = {...state};
    switch (action.pageType) {
        case pageType.BOARD_MEMBER: {
            newState.componentsErrors.boardMembers = action.hasErrors;
            newState.company.boardMembers = action.memberBody;
            return {...newState};
        }
        case pageType.DIRECTORS: {
            newState.company.boardOfDirectors = action.memberBody;
            newState.componentsErrors.boardOfDirectors = action.hasErrors;
            return {...newState};
        }
        case pageType.PARTNERS: {
            newState.company.partners = action.partners;
            newState.componentsErrors.partners = action.hasErrors;
            newState.company.manySharesAllowed = action.manySharesAllowed;
            newState.company.shareValue = action.shareValue;
            return {...newState};
        }
        case pageType.BASE_INFO:{
            newState.company.companyName = action.companyName;
            newState.company.nip = action.nipInput;
            newState.company.regonInput = action.regonInput;
            newState.company.shareCapital = action.shareCapitalInput;
            newState.componentsErrors.baseInfo = action.hasErrors;
            return {...newState};
        }
        case pageType.ADDRESS:{
            newState.company.address = action.address;
            newState.componentsErrors.address = action.hasErrors;
            return {...newState};
        }
    }
}

const CompanyContextProvider = (props) => {
    const [state, dispatch] = useReducer(companyDataReducer, { company: props.company,
        componentsErrors: {boardMembers:"default", boardOfDirectors:"default", partners:"default", baseInfo:"default", address:"default"}})

    const passNewData = (action) => {
        dispatch(action)
    }


    return<CompanyContext.Provider value={{state, passNewData}}>
        {props.children}
    </CompanyContext.Provider>
}

export default CompanyContextProvider