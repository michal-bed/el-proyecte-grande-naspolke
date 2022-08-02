package com.company.naspolke.service;

import com.company.naspolke.helpers.adapters.JsonFinancialStatementProtocolToJavaClass;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.company.naspolke.model.documentDrafts.FinancialStatementProtocolGenerator;
import com.company.naspolke.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class FinancialStatementServiceImplementation implements FinancialStatementService {

    private CompanyRepository companyRepository;
    private FinancialStatementProtocolGenerator financialStatementProtocolGenerator;

    @Autowired
    public FinancialStatementServiceImplementation(CompanyRepository companyRepository, FinancialStatementProtocolGenerator financialStatementProtocolGenerator) {
        this.companyRepository = companyRepository;
        this.financialStatementProtocolGenerator = financialStatementProtocolGenerator;
    }


    @Override
    public FinancialStatementProtocol saveFinancialStatement(Map<String, Object> financialStatementsProtocolData, UUID companyId){
        Optional<Company> companyOptional = companyRepository.findById(companyId);
        if (companyOptional.isPresent()) {
//            company.get().addFinancialStatement(financialStatementsProtocol);
//            companyRepository.save(company.get());
            Company company = companyOptional.get();
            try {
                FinancialStatementProtocol financialStatementsProtocol = JsonFinancialStatementProtocolToJavaClass.getProtocolFromFormData(financialStatementsProtocolData, company);
                financialStatementProtocolGenerator.generatePdfDocument(company, financialStatementsProtocol);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return null;
        }
        return null;
    }

//    public FinancialStatementProtocolGenerator getNewestFinancialStatementInfo(UUID companyId){
//        Optional<Company> company = companyRepository.findById(companyId);
//        if (company.isPresent()){
//            Set<FinancialStatementProtocolGenerator> protocols = company.get().getFinancialStatementProtocols();
//            LocalDate newestProtocolDate =  protocols.stream()
//                    .map(u->u.getDateOfTheShareholdersMeeting())
//                    .max(LocalDate::compareTo).get();
//            return protocols.stream()
//                    .findFirst()
//                    .filter((protocol -> protocol.getDateOfTheShareholdersMeeting()==newestProtocolDate)).get();
//        }
//        return null;
//    }
}