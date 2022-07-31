package com.company.naspolke.model.company.financialStatements;

import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.companyBodies.Partners.JuridicalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.NaturalPerson;
import com.company.naspolke.model.company.financialStatements.resolutions.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.lang.reflect.Array;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@Component
@NoArgsConstructor
@Entity
public class FinancialStatementProtocol {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable=false)
    private Long FinancialStatementsProtocolId;
    private LocalDate dateOfTheShareholdersMeeting;
    private boolean meetingPlaceInHeadquarters;
    private String meetingPlace;
    @ManyToOne
    @JoinColumn(name = "address_address_id")
    private Address address;
    private int protocolNumber;
    private boolean formalConvening;
    @OneToMany
    private Set<NaturalPerson> listIdPresentIndividualPartners;
    @OneToMany
    private Set<JuridicalPerson> listIdPresentsCompanyPartners;
    @ManyToOne
    @JoinColumn
    private ElectionResolution president;
    @ManyToOne
    @JoinColumn
    private ElectionResolution recorder;
    @ManyToOne
    @JoinColumn
    private AgendaResolution agendaResolution;
    @ManyToOne
    @JoinColumn
    private ProfitOrLoss profitOrLoss;
    @ManyToOne
    @JoinColumn
    private FinancialStatementResolution financialStatementResolution;
    @OneToMany
    private Set<ResolutionApprovalBodyMember> boardMembersApproval;
    @OneToMany
    private Set<ResolutionApprovalBodyMember> directorsMembersApproval;
    @ManyToOne
    private Company company;


    @Builder
    public FinancialStatementProtocol(LocalDate dateOfTheShareholdersMeeting, boolean meetingPlaceInHeadquarters, String meetingPlace, Address address, int protocolNumber, boolean formalConvening, Set<NaturalPerson> listIdPresentIndividualPartners, Set<JuridicalPerson> listIdPresentsCompanyPartners, ElectionResolution president, ElectionResolution recorder, AgendaResolution agendaResolution, ProfitOrLoss profitOrLoss, FinancialStatementResolution financialStatementResolution, Set<ResolutionApprovalBodyMember> boardMembersApproval, Set<ResolutionApprovalBodyMember> directorsMembersApproval, Company company) {
        this.dateOfTheShareholdersMeeting = dateOfTheShareholdersMeeting;
        this.meetingPlaceInHeadquarters = meetingPlaceInHeadquarters;
        this.meetingPlace = meetingPlace;
        this.address = address;
        this.protocolNumber = protocolNumber;
        this.formalConvening = formalConvening;
        this.listIdPresentIndividualPartners = listIdPresentIndividualPartners;
        this.listIdPresentsCompanyPartners = listIdPresentsCompanyPartners;
        this.president = president;
        this.recorder = recorder;
        this.agendaResolution = agendaResolution;
        this.profitOrLoss = profitOrLoss;
        this.financialStatementResolution = financialStatementResolution;
        this.boardMembersApproval = boardMembersApproval;
        this.directorsMembersApproval = directorsMembersApproval;
        this.company = company;
    }
}
