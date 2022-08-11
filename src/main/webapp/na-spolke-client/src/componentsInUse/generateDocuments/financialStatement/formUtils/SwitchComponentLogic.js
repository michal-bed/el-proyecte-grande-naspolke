

export function SwitchComponentLogic(values, company, event) {
    if(event.target.name === "formalConvening" && event.target.value === "true" && company!==undefined){
        if(company.partners.individualPartners!==undefined) {
            for (let i in company.partners.individualPartners) {
                console.log(company.partners.individualPartners[i].id)
                values[`individual${company.partners.individualPartners[i].id}IsPresent`] = true;
            }
        }
        if(company.partners.partnerCompanies!==undefined){
            for (let i in company.partners.partnerCompanies) {
                values[`company${company.partners.partnerCompanies[i].id}IsPresent`] = true;
            }
        }
    }
    if(event.target.name.includes("IsPresent") && event.target.value === "true"){
        console.log("formal1 " + values.formalConvening);
        values.formalConvening = true;
        console.log("formal2 " + values.formalConvening);
    }

}