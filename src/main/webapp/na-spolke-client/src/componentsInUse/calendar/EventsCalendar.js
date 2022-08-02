import React, {useEffect, useState} from "react";
import {Paper} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {Calendar, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MuiThemeProvider} from "@material-ui/core/styles";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import EventPicker from "./EventPicker";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    CardHeader,
    CircularProgress,
    DialogContentText,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import {useParams} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ModalTop from "../modal/ModalTop";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventDetails from "./EventDetails";

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
        case "Jan" : formattedMonth = "January"; break;
        case "Feb" : formattedMonth = "February"; break;
        case "Mar" : formattedMonth = "March"; break;
        case "Apr" : formattedMonth = "April"; break;
        case "May" : formattedMonth = "May"; break;
        case "Jun" : formattedMonth = "June"; break;
        case "Jul" : formattedMonth = "July"; break;
        case "Aug" : formattedMonth = "August"; break;
        case "Sep" : formattedMonth = "September"; break;
        case "Oct" : formattedMonth = "October"; break;
        case "Nov" : formattedMonth = "November"; break;
        case "Dec" : formattedMonth = "December"; break;
    }
    return formattedMonth;
}

function EventsCalendar() {

    const successfullyEventSaveMessage = {
        title: "Dodano wydarzenie",
        text: "Twoje wydarzenie zostało pomyślnie dodane do kalendarza."
    }

    const unsuccessfullyEventSaveMessage = {
        title: "Wystąpił błąd",
        text: "Nie udało się zapisać Twojego wydarzenia. Spróbuj ponownie."
    }

    let {companyId} = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState("");
    const [eventType, setEventType] = useState("");
    const [events, setEvents] = useState([]);
    const [savedEvents, setSaveEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openFailedModal, setOpenFailedModal] = useState(false);
    const backToPreviousState = () => {
        setOpenSuccessModal(false);
        setOpenFailedModal(false);
    }

    const theme = useTheme();

    useEffect(() => {
        getCompanyEvents();
        handleClose();
        highlightEventOnCalendar();
    }, [])

    const handleClose = () => {
        setSaveEvents(([]) => []);
        setOpen(false);
    };

    const highlightEventOnCalendar = () => {
        let monthAndYearClassElement = document.getElementsByClassName('MuiPickersCalendarHeader-transitionContainer');
        let monthAndYear = monthAndYearClassElement[0].firstElementChild.innerHTML;
        let daysInMonthClassElement = document.getElementsByClassName('MuiPickersDay-day');

        for (let x = 0; x < events.length; x++) {
            let splitDateArray = String(events[x].eventDate).split(" ");
            for (let y = 0; y < daysInMonthClassElement.length; y++) {
                let daysInMonth = daysInMonthClassElement[y].firstElementChild.firstElementChild.innerHTML;
                let formattedDay;
                daysInMonth.length !== 2 ? formattedDay = "0" + daysInMonth : formattedDay = daysInMonth;
                if (monthAndYear === (splitDateArray[0] + " " + splitDateArray[1]) &&
                    formattedDay === splitDateArray[2]) {
                    daysInMonthClassElement[y].style.backgroundColor = "#3f51b5";
                }
            }
        }
    }

    const getCompanyEvents = () => {
        axiosPrivate.get(`/get-company-events/${companyId}`)
            .then((response) => {
                if (response.status === 200) {
                    setEvents(response.data);
                    highlightEventOnCalendar();
                    console.log(response.data);
                }
            }).catch((error) => {
            console.log(error);
        })
    }

    const handleSaveEvent = () => {
        setIsLoading(true);
        const data = {companyId, formattedDate, eventType};
        axiosPrivate.post("/add-new-event", data)
            .then((response) => {
                if (response.status === 200) {
                    setEvents(response.data);
                    setOpenSuccessModal(true);
                    setOpen(false);
                    setIsLoading(false);
                    setTimeout(backToPreviousState, 4000);
                    highlightEventOnCalendar();
                }
            }).catch((error) => {
                console.log(error);
                setOpenFailedModal(true);
                setOpen(false);
                setIsLoading(false);
                setTimeout(backToPreviousState, 4000);
        })

    };

    const handleDateChange = (date) => {
        let month = monthFormatter(String(date).substring(4, 7));
        let day = String(date).substring(8, 10);
        let year = String(date).substring(11, 15);
        let actualDate = month + " " + year + " " + day;
        setOpen(true);
        setSelectedDate(date);
        setFormattedDate(actualDate);
        loadEventsOnCalendar();
    };

    const loadEventsOnCalendar = () => {
        for (let i = 0; i < events.length; i++) {
            if (formattedDate === events[i].eventDate) {
                setSaveEvents([...savedEvents, events[i]]);
                console.log(savedEvents);
            }
        }
        console.log(savedEvents);
    }

    return (
        <>
            <Accordion onClick={getCompanyEvents}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        <CardHeader
                        title="Kalendarz"
                        titleTypographyProps={{align:'center'}}/>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>

            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Paper style={{ overflow: "hidden" }}>
                        <Calendar date={selectedDate} onChange={handleDateChange}/>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            style={{ minWidth: 900 }}
                        >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                Dodaj wydarzenie
                            </BootstrapDialogTitle><br/>
                            <EventPicker formattedDate={formattedDate}/><br/>
                            <Box style={{ marginLeft: 20, marginRight: 20 }}>
                                <EventDetails savedEvents={savedEvents}/><br/>
                            </Box>
                            <DialogContentText id="alert-dialog-slide-description" style={{ marginLeft: 20, marginRight: 20 }}>
                                Wpisz nazwę wydarzenia, które chcesz dodać do kalendarza:
                            </DialogContentText><br/>
                            <TextField
                                id="outlined-helperText"
                                label="Nazwa wydarzenia"
                                onChange={(e) => setEventType(e.target.value)}
                            /><br/>
                            <DialogActions>
                                {isLoading ? <CircularProgress style={{ position: 'absolute', top: '45%', left: '45%'}} color="black"/> :
                                <Button autoFocus onClick={handleSaveEvent}>
                                    Zapisz wydarzenie
                                </Button>}
                            </DialogActions>
                        </BootstrapDialog>
                    </Paper>
                </MuiPickersUtilsProvider>
                <div>
                    {openSuccessModal && <ModalTop info={successfullyEventSaveMessage}/>}
                    {openFailedModal && <ModalTop info={unsuccessfullyEventSaveMessage}/>}
                </div>
            </MuiThemeProvider>

                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default EventsCalendar
