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
import java.time.LocalDate;
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
    private Set<NaturalPerson> listPresentIndividualPartners;
    @OneToMany
    private Set<JuridicalPerson> listPresentsCompanyPartners;
    @ManyToOne
    @JoinColumn
    private ElectionResolution chairperson;
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
    public FinancialStatementProtocol(LocalDate dateOfTheShareholdersMeeting, boolean meetingPlaceInHeadquarters, String meetingPlace,
                                      Address address, int protocolNumber, boolean formalConvening,
                                      Set<NaturalPerson> listPresentIndividualPartners, Set<JuridicalPerson> listPresentsCompanyPartners,
                                      ElectionResolution chairperson, ElectionResolution recorder, AgendaResolution agendaResolution,
                                      ProfitOrLoss profitOrLoss, FinancialStatementResolution financialStatementResolution,
                                      Set<ResolutionApprovalBodyMember> boardMembersApproval, Set<ResolutionApprovalBodyMember> directorsMembersApproval,
                                      Company company) {
        this.dateOfTheShareholdersMeeting = dateOfTheShareholdersMeeting;
        this.meetingPlaceInHeadquarters = meetingPlaceInHeadquarters;
        this.meetingPlace = meetingPlace;
        this.address = address;
        this.protocolNumber = protocolNumber;
        this.formalConvening = formalConvening;
        this.listPresentIndividualPartners = listPresentIndividualPartners;
        this.listPresentsCompanyPartners = listPresentsCompanyPartners;
        this.chairperson = chairperson;
        this.recorder = recorder;
        this.agendaResolution = agendaResolution;
        this.profitOrLoss = profitOrLoss;
        this.financialStatementResolution = financialStatementResolution;
        this.boardMembersApproval = boardMembersApproval;
        this.directorsMembersApproval = directorsMembersApproval;
        this.company = company;
    }
}
