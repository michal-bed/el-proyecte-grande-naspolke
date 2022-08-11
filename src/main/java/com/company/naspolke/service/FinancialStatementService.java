package com.company.naspolke.service;

import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;

import java.io.IOException;
import java.util.UUID;

public interface FinancialStatementService {
    String saveFinancialStatement(FinancialStatementProtocol financialStatement, UUID companyId) throws IOException;
    
}
