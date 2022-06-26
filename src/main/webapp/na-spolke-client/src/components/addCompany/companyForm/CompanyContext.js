import React, {useMemo, useReducer, useState} from "react";
import {createContext} from "react";

export const CompanyContext = React.createContext({
})


export const pageType = {
    BOARD_MEMBER: "board",
    DIRECTORS: "directors",
    PARTNERS: "partners"
}

const companyDataReducer = (state, action) => {
    console.log(state)
    let newState = {...state};
    switch (action.pageType) {
        case pageType.BOARD_MEMBER: {
            newState.componentsErrors.boardMembers = action.hasErrors;
            newState.company.boardMembers = action.memberBody;
            return {...newState}
        }
        case pageType.DIRECTORS: {
            newState.company.boardOfDirectors = action.memberBody;
            newState.componentsErrors.boardOfDirectors = action.hasErrors;
            return {...newState}
        }
        case pageType.PARTNERS: {
            newState.company.partners = action.companyBodyList;
            newState.componentsErrors.partners = action.hasErrors;
            return {...newState}
        }
    }
}

const CompanyContextProvider = (props) => {
    const [state, dispatch] = useReducer(companyDataReducer, { company: props.company,
        componentsErrors: {boardMembers:"default", boardOfDirectors:"default", partners:"default"}})

    const passNewData = (action) => {
        dispatch(action)
    }


    return<CompanyContext.Provider value={{state, passNewData}}>
        {props.children}
    </CompanyContext.Provider>
}

export default CompanyContextProvider