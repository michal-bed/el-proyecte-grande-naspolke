package com.company.naspolke.service;

import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.company.naspolke.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class FinancialStatementServiceImplementation implements FinancialStatementService {

    private CompanyRepository companyRepository;

    @Autowired
    public FinancialStatementServiceImplementation(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public FinancialStatementProtocol saveFinancialStatement(FinancialStatementProtocol financialStatementsProtocol, UUID companyId) throws IOException {
        Optional<Company> company = companyRepository.findById(companyId);
        if (company.isPresent()) {
            company.get().addFinancialStatement(financialStatementsProtocol);
            companyRepository.save(company.get());
            return financialStatementsProtocol;
        }
        return null;
    }

//    public FinancialStatementProtocol getNewestFinancialStatementInfo(UUID companyId){
//        Optional<Company> company = companyRepository.findById(companyId);
//        if (company.isPresent()){
//            Set<FinancialStatementProtocol> protocols = company.get().getFinancialStatementProtocols();
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