import {IconButton, TableCell} from "@mui/material";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import {useEffect, useState} from "react";
import Input from "@material-ui/core/Input";
import {getCompanyById} from "../../handlers/CompanyDataHandler";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const CompanyEditor = ({row, keys, selectedData}) => {

    const axiosPrivate = useAxiosPrivate();
    const boardMemberId = row.boardMemberId;
    const boardOfDirectorId = row.boardOfDirectorId;
    const companyPartnerId = row.id;
    const [isEditMode, setIsEditMode] = useState(false);
    const [fieldToChange, setFieldToChange] = useState("");
    const [address, setAddress] = useState("");

    const onToggleEditMode = (event, edit) => {
        setFieldToChange(event.target.value);
        setIsEditMode(edit);
    }

    const onRevert = () => {
        setIsEditMode(false);
    }

    const onDoneEditMode = () => {
        console.log(row);
        console.log(keys);
        console.log(selectedData);
        setIsEditMode(false);
        row[keys] = fieldToChange;
        switch (selectedData) {
            case "boardMembers" : return boardMemberOrDirectorEditor(boardMemberId);
            case "boardOfDirectors" : return boardMemberOrDirectorEditor(boardOfDirectorId);
            case "partnerCompanies" : return partnerOrIndividualPartnersEditor(companyPartnerId);
            case "individualPartners" : return partnerOrIndividualPartnersEditor(companyPartnerId);
        }
    }

    const boardMemberOrDirectorEditor = (memberId) => {
        axiosPrivate.put(`/edit-member/${memberId}/${selectedData}/${keys}/${fieldToChange}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log("sukces");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const partnerOrIndividualPartnersEditor = (companyPartnerId) => {
        let data = {address};
        axiosPrivate.post(`/edit-partner/${companyPartnerId}/${selectedData}/${keys}/${fieldToChange}`, data)
            .then((response) => {
                if (response.status === 200) {
                    console.log("sukces");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            {isEditMode ? (
                <div>
                    <IconButton
                        aria-label="done"
                        onClick={(event) => onDoneEditMode(event, false)}
                    >
                        <DoneIcon/>
                    </IconButton>
                    <IconButton
                        aria-label="revert"
                        onClick={(event) => onRevert(event, false)}
                    >
                        <RevertIcon/>
                    </IconButton>
                    <Input
                        placeholder={row[keys]}
                        type="text"
                        className="variable"
                        onChange={e => setFieldToChange(e.target.value)}
                    >
                        row[keys]
                    </Input>
                </div>
            ) : (
                <div>
                    <IconButton
                        aria-label="edit"
                        onClick={(event) => onToggleEditMode(event, true)}
                    >
                        <EditIcon/>
                    </IconButton>
                    {row[keys]}
                </div>
            )}
        </div>
    )
}

export default CompanyEditor
