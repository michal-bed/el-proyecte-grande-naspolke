package com.company.naspolke.service;

import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.company.naspolke.model.documentDrafts.FinancialStatementProtocolGenerator;
import com.company.naspolke.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
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
    public String saveFinancialStatement(FinancialStatementProtocol financialStatementsProtocol, UUID companyId){
        Optional<Company> companyOptional = Optional.ofNullable(companyRepository.findByCompanyId(companyId));
        String filePath = "";
        if (companyOptional.isPresent()) {
            Company company = companyOptional.get();
            try {
                filePath = getFinancialStatementProtocolPath(company,financialStatementsProtocol);
                filePath = financialStatementProtocolGenerator.generatePdfDocument(company, financialStatementsProtocol, filePath);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            financialStatementsProtocol.setFilePath(filePath);
            company.addFinancialStatement(financialStatementsProtocol);
            Company company1 = companyRepository.saveAndFlush(company);

        }
        return filePath;
    }

    private String getFinancialStatementProtocolPath(Company company, FinancialStatementProtocol financialStatementsProtocol) {
        String companyName = company.getCompanyName().substring(0,5);
        String protocolNumber = String.valueOf(financialStatementsProtocol.getProtocolNumber());
        String date = LocalDate.now().toString();
        return "src/main/webapp/na-spolke-client/src/protocols/ZZW".concat(companyName).concat(protocolNumber).concat(date).concat(".pdf");
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