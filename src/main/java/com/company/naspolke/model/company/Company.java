package com.company.naspolke.model.company;

import com.company.naspolke.model.aggregate.CompanyUserRole;
import com.company.naspolke.model.company.companyBodies.BoardMember;
import com.company.naspolke.model.company.companyBodies.BoardOfDirector;
import com.company.naspolke.model.company.companyBodies.Partners.JuridicalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.NaturalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.Partners;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;


@Data
@NoArgsConstructor
@Entity
public class Company {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "company_id")
    private UUID companyId;
    private String companyName;
    private String krsNumber;
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "address_id")
    private Address address;
    private String nip;
    private String regon;
    private BigDecimal shareCapital;
    private BigDecimal shareValue;
    private Integer sharesCount;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<BoardMember> boardMembers = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL)
    private Set<BoardOfDirector> boardOfDirectors = new HashSet<>();
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "partners_id")
    private Partners partners;
    private boolean partnersRevealed;
    private boolean manySharesAllowed;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @Column(name = "company_user_role")
    private Set<CompanyUserRole> companyUserRole = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL)
    private Set<FinancialStatementProtocol> financialStatementProtocols;


    @Builder
    public Company(String companyName, String krsNumber, Address address, String nip, String regon, BigDecimal shareCapital, Set<BoardMember> boardMembers, Set<BoardOfDirector> boardOfDirectors, Partners partners, boolean manySharesAllowed) {
        this.companyName = companyName;
        this.krsNumber = krsNumber;
        this.address = address;
        this.nip = nip;
        this.regon = regon;
        this.shareCapital = shareCapital;
        this.boardMembers = boardMembers;
        this.boardOfDirectors = boardOfDirectors;
        this.partners = partners;
        this.manySharesAllowed = manySharesAllowed;
        if(partners!= null) {
            this.partnersRevealed = checkIfAllPartnersAreRevealed();
            this.shareValue = checkForShareValue();
            this.sharesCount = checkForShareCount();
        }
    }

    private Integer checkForShareCount() {
        if (manySharesAllowed) {
            BigDecimal shareCountBD = shareCapital.divide(shareValue);
            return shareCountBD.intValue();
        }
        return null;
    }

    public boolean checkIfAllPartnersAreRevealed() {
        return partners.getAllSharesValue().equals(shareCapital);
    }

    public BigDecimal checkForShareValue() {
        BigDecimal shareValue = null;
        if (manySharesAllowed) {
            if (partners.getIndividualPartners().size() > 0) {
                NaturalPerson person = partners.getIndividualPartners().iterator().next();
                BigDecimal sharesValues = person.getSharesValue();
                BigDecimal sharesCount = BigDecimal.valueOf(person.getSharesCount());
                shareValue = sharesValues.divide(sharesCount);
            } else {
                JuridicalPerson juridicalPerson = partners.getPartnerCompanies().iterator().next();
                BigDecimal sharesValues = juridicalPerson.getSharesValue();
                BigDecimal sharesCount = BigDecimal.valueOf(juridicalPerson.getSharesCount());
                shareValue = sharesValues.divide(sharesCount);
            }
        }
        assert shareValue != null;
        shareValue = shareValue.setScale(2, RoundingMode.CEILING);
        return shareValue;
    }

    public void addFinancialStatement(FinancialStatementProtocol financialStatement){
        this.financialStatementProtocols.add(financialStatement);
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Company company = (Company) o;
        return companyId != null && Objects.equals(companyId, company.companyId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public void addCompanyUserRole(CompanyUserRole companyUserRole) {
        this.companyUserRole.add(companyUserRole);
    }
}
