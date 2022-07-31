package com.company.naspolke.service;

import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

public interface FinancialStatementService {
    FinancialStatementProtocol saveFinancialStatement(Map<String, Object> financialStatement, UUID companyId) throws IOException;
    
}
