import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { getCompanyById } from "../../handlers/CompanyDataHandler";

function CompanyInfo () {

    let {companyId} = useParams();

    let company = getCompanyById(companyId);

    return (
        <Typography>
            name: {company['companyName']}<br />
            id: {company['companyId']}
        </Typography>
    )
}

export default CompanyInfo;