import React, {useState} from "react";
import {createMuiTheme, Paper} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {Calendar, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MuiThemeProvider} from "@material-ui/core/styles";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import EventPicker from "./EventPicker";
import {DialogContentText, TextField, useTheme} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const monthFormatter = (month) => {
    let formattedMonth;
    switch (month) {
        case "Jan" : formattedMonth = "01"; break;
        case "Feb" : formattedMonth = "02"; break;
        case "Mar" : formattedMonth = "03"; break;
        case "Apr" : formattedMonth = "04"; break;
        case "May" : formattedMonth = "05"; break;
        case "Jun" : formattedMonth = "06"; break;
        case "Jul" : formattedMonth = "07"; break;
        case "Aug" : formattedMonth = "08"; break;
        case "Sep" : formattedMonth = "09"; break;
        case "Oct" : formattedMonth = "10"; break;
        case "Nov" : formattedMonth = "11"; break;
        case "Dec" : formattedMonth = "12"; break;
    }
    return formattedMonth;
}

function EventsCalendar() {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState("");

    const handleDateChange = (date) => {
        let month = monthFormatter(String(date).substring(4, 7));
        let day = String(date).substring(8, 10);
        let year = String(date).substring(11, 15);
        let actualDate = year + "-" + month + "-" + day;
        console.log(actualDate);
        setOpen(true);
        setSelectedDate(date);
        setFormattedDate(actualDate);
        console.log("Date is: ", date);
    };

    return (
        <>
            <MuiThemeProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Paper style={{ overflow: "hidden" }}>
                        <Calendar date={selectedDate} onChange={handleDateChange} />
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            style={{ minWidth: 900 }}
                        >
                            <BootstrapDialogTitle id="customized-dialog-title">
                                Dodaj wydarzenie
                            </BootstrapDialogTitle><br/>
                            <EventPicker formattedDate={formattedDate}/><br/>
                            <DialogContentText id="alert-dialog-slide-description" style={{ marginLeft: 20, marginRight: 20 }}>
                                Wpisz nazwę wydarzenia, które chcesz dodać do kalendarza:
                            </DialogContentText><br/>
                            <TextField
                                id="outlined-helperText"
                                label="Nazwa wydarzenia"
                            /><br/>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose}>
                                    Zapisz wydarzenie
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </Paper>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        </>
    )
}

export default EventsCalendar
