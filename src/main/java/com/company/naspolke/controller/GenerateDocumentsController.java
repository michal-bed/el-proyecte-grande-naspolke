package com.company.naspolke.controller;

import com.alibaba.fastjson.JSON;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.company.naspolke.service.FinancialStatementService;
import com.company.naspolke.service.FinancialStatementServiceImplementation;
import com.fasterxml.jackson.core.io.JsonStringEncoder;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class GenerateDocumentsController {

    private FinancialStatementServiceImplementation financialStatementService;

    @Autowired
    public GenerateDocumentsController(FinancialStatementServiceImplementation financialStatementService) {
        this.financialStatementService = financialStatementService;
    }

    @ResponseStatus
    @PostMapping("/save/financial/{companyId}")
    public ResponseEntity<String> saveFinancialStatement(@PathVariable("companyId") String companyId, @RequestBody FinancialStatementProtocol protocol ) {
        String path = financialStatementService.saveFinancialStatement(protocol, UUID.fromString(companyId));
        if(!Objects.equals(path, "")){
            return new ResponseEntity<String>(path,new HttpHeaders(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
