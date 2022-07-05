package com.company.naspolke.model.company.financialStatements;

import com.company.naspolke.model.company.Address;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;
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
    private boolean meetingPlaceInHeadquarters;
    private String meetingPlace;
    @ManyToOne
    @JoinColumn(name = "address_address_id")
    private Address address;
    private int protocolNumber;

    @Builder
    public FinancialStatementProtocol(LocalDate dateOfTheShareholdersMeeting, boolean meetingPlaceInHeadquarters, String meetingPlace, Address address, int protocolNumber) {
        this.dateOfTheShareholdersMeeting = dateOfTheShareholdersMeeting;
        this.meetingPlaceInHeadquarters = meetingPlaceInHeadquarters;
        this.meetingPlace = meetingPlace;
        this.address = address;
        this.protocolNumber = protocolNumber;
    }
}
