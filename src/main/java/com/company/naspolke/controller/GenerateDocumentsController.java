package com.company.naspolke.controller;

import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.company.naspolke.service.FinancialStatementService;
import com.company.naspolke.service.FinancialStatementServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
    public void saveFinancialStatement(@PathVariable("companyId") String companyId, @RequestBody FinancialStatementProtocol protocol ) throws IOException {
        financialStatementService.saveFinancialStatement(protocol, UUID.fromString(companyId));

    }
}
