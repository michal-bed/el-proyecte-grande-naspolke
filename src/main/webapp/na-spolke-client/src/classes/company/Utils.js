import {BoardMember} from "../persons/BoardMember";
import {BoardOfDirector} from "../persons/BoardOfDirector";
import {IndividualPartner, PartnerCompany} from "../persons/Partners";


export function populateList (members, type) {
    const result = [];
    members.forEach(member => {
        switch (type) {
            case "individuals":
                result.push(new IndividualPartner(member));
                break
            case "companies":
                result.push(new PartnerCompany(member));
                break
            case "boardMembers":
                result.push(new BoardMember(member));
                break
            case "boardOfDirectors":
                result.push(new BoardOfDirector(member));
                break
        }
    })
    return result;
}