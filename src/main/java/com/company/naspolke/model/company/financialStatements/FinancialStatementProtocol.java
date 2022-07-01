package com.company.naspolke.model.company.financialStatements;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Data
@Component
@NoArgsConstructor
@Entity
public class FinancialStatementProtocol {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long FinancialStatementsProtocolId;
//    private LocalDate startOfTheFinancialYear;
//    private LocalDate endOfTheFinancialYear;
    private LocalDate dateOfTheShareholdersMeeting;
    private int protocolNumber;

    @Builder
    public FinancialStatementProtocol(LocalDate dateOfTheShareholdersMeeting, int protocolNumber) {
        this.dateOfTheShareholdersMeeting = dateOfTheShareholdersMeeting;
        this.protocolNumber = protocolNumber;
    }
}
