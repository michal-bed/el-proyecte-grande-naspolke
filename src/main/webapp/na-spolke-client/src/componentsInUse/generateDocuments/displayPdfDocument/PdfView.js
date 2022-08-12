import React, {useState} from 'react'
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import pdf from './../../../protocols/pdfTest.pdf'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import {IconButton, Stack} from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';


function PdfView() {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);


    function onDocumentLoadSuccess({numPages}){
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offSet){
        setPageNumber(prevPageNumber => prevPageNumber + offSet);
    }

    function changePageBack(){
        changePage(-1)
    }

    function changePageNext(){
        changePage(+1)
    }

    function changePageFirst(){
        setPageNumber(1)
    }

    function changePageEnd() {
        setPageNumber(numPages)
    }
    return (
        <div className="App">
            <header className="App-header">
                <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>

                <Stack direction="row" spacing={1}>
                    <IconButton disabled={pageNumber <= 1} onClick={changePageFirst} aria-label="delete" color="primary">
                        <FirstPageIcon fontSize="large" />
                    </IconButton>
                    <IconButton disabled={pageNumber <= 1} onClick={changePageBack} aria-label="delete" color="secondary">
                        <ArrowBackIosNewIcon fontSize="large" />
                    </IconButton>
                    <p> Strona {pageNumber} z {numPages}</p>
                    <IconButton disabled={pageNumber >= numPages} onClick={changePageNext} color="secondary" aria-label="add an alarm">
                        <ArrowForwardIosIcon fontSize="large" />
                    </IconButton>
                    <IconButton disabled={pageNumber >= numPages} onClick={changePageEnd} color="primary" aria-label="add to shopping cart">
                        <LastPageIcon fontSize="large" />
                    </IconButton>
                    <IconButton href = {pdf} target = "_blank" color="primary" aria-label="add to shopping cart">
                        <SaveIcon fontSize="large" />
                    </IconButton>
                </Stack>
            </header>
        </div>
    );
}

export default PdfView;