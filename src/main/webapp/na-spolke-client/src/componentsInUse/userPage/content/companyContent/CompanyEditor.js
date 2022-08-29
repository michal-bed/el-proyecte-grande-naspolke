import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TableCell,
    TextField
} from "@mui/material";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import {useEffect, useState} from "react";
import Input from "@material-ui/core/Input";
import {getCompanyById} from "../../handlers/CompanyDataHandler";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Button from "@mui/material/Button";
import {isObject} from "formik";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const CompanyEditor = ({row, keys, selectedData}) => {

    const axiosPrivate = useAxiosPrivate();
    const boardMemberId = row.boardMemberId;
    const boardOfDirectorId = row.boardOfDirectorId;
    const companyPartnerId = row.id;
    const [isEditMode, setIsEditMode] = useState(false);
    const [fieldToChange, setFieldToChange] = useState("");
    const [openAddressDialog, setOpenAddressDialog] = useState(false);
    const [streetName, setStreetName] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [localNumber, setLocalNumber] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [postOffice, setPostOffice] = useState("");

    const onToggleEditMode = (event, edit) => {
        if (keys !== "address") {
            setFieldToChange(event.target.value);
            setIsEditMode(edit);
        } else {
            setOpenAddressDialog(true);
        }
    }

    const onRevert = () => {
        setIsEditMode(false);
        setOpenAddressDialog(false);
    }

    const onDoneEditMode = () => {
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
        let url;
        let data = {streetName, streetNumber, localNumber, city, zipCode, postOffice};
        console.log(data);
        setOpenAddressDialog(false);
        if (fieldToChange === "") {
            url = `/edit-partner/${companyPartnerId}/${selectedData}/${keys}`;
        } else {
            url = `/edit-partner/${companyPartnerId}/${selectedData}/${keys}/${fieldToChange}`
        }
        axiosPrivate.post(url, data)
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
                        {isObject(row[keys]) ? <FormatListBulletedIcon/> : row[keys]}
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
                    {isObject(row[keys]) ? <FormatListBulletedIcon/> : row[keys]}
                </div>
            )}
            {openAddressDialog &&
                <div>
                    <Dialog open={openAddressDialog} onClose={onRevert}>
                        <DialogTitle>Adres</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus margin="dense" id="streetName" label="Ulica"
                                type="streetName" fullWidth variant="standard"
                                onChange={(e) => setStreetName(e.target.value)}
                            />
                            <TextField
                                autoFocus margin="dense" id="streetNumber" label="Numer ulicy"
                                type="streetNumber" fullWidth variant="standard"
                                onChange={(e) => setStreetNumber(e.target.value)}
                            />
                            <TextField
                                autoFocus margin="dense" id="localNumber" label="Numer lokalu"
                                type="localNumber" fullWidth variant="standard"
                                onChange={(e) => setLocalNumber(e.target.value)}
                            />
                            <TextField
                                autoFocus margin="dense" id="city" label="Miasto"
                                type="city" fullWidth variant="standard"
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <TextField
                                autoFocus margin="dense" id="zipCode" label="Kod pocztowy"
                                type="zipCode" fullWidth variant="standard"
                                onChange={(e) => setZipCode(e.target.value)}
                            />
                            <TextField
                                autoFocus margin="dense" id="postOffice" label="Poczta"
                                type="postOffice" fullWidth variant="standard"
                                onChange={(e) => setPostOffice(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onDoneEditMode}>Zapisz</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
        </div>
    )
}

export default CompanyEditor
