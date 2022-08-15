package com.company.naspolke.model.company;

import com.company.naspolke.model.Event;
import com.company.naspolke.model.aggregate.CompanyUserRole;
import com.company.naspolke.model.company.companyBodies.BoardMember;
import com.company.naspolke.model.company.companyBodies.BoardOfDirector;
import com.company.naspolke.model.company.companyBodies.Partners.JuridicalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.NaturalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.Partners;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.base.Objects;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.lang.reflect.Array;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

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
    private Integer boardMembersTerm = 0;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<BoardOfDirector> boardOfDirectors = new HashSet<>();
    private Integer boardOfDirectorsTerm = 0;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "partners_id")
    private Partners partners;
    private boolean partnersRevealed;
    private boolean manySharesAllowed;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Event> eventsList;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @Column(name = "company_user_role")
    private Set<CompanyUserRole> companyUserRole = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL)
    private Set<FinancialStatementProtocol> financialStatementProtocols;

    @Builder
    public Company(String companyName,
                   String krsNumber,
                   Address address,
                   String nip,
                   String regon,
                   BigDecimal shareCapital,
                   Set<BoardMember> boardMembers,
                   Set<BoardOfDirector> boardOfDirectors,
                   Partners partners,
                   boolean manySharesAllowed,
                   int boardMembersTerm,
                   int boardOfDirectorsTerm) {
        this.companyName = companyName;
        this.krsNumber = krsNumber;
        this.address = address;
        this.nip = nip;
        this.regon = regon;
        this.shareCapital = shareCapital;
        this.boardMembers = boardMembers;
        this.boardMembersTerm = boardMembersTerm;
        this.boardOfDirectors = boardOfDirectors;
        this.boardOfDirectorsTerm = boardOfDirectorsTerm;
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
//        assert shareValue != null;
        if (shareValue!=null) {
            shareValue = shareValue.setScale(2, RoundingMode.CEILING);
        }
        return shareValue;
    }

    public void addFinancialStatement(FinancialStatementProtocol financialStatement){
        this.financialStatementProtocols.add(financialStatement);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Company)) return false;
        Company company = (Company) o;
        return isPartnersRevealed() == company.isPartnersRevealed() && isManySharesAllowed() == company.isManySharesAllowed()
                && Objects.equal(getCompanyId(), company.getCompanyId())
                && Objects.equal(getCompanyName(), company.getCompanyName())
                && Objects.equal(getKrsNumber(), company.getKrsNumber())
                && Objects.equal(getAddress(), company.getAddress())
                && Objects.equal(getNip(), company.getNip())
                && Objects.equal(getRegon(), company.getRegon())
                && Objects.equal(getShareCapital(), company.getShareCapital())
                && Objects.equal(getShareValue(), company.getShareValue())
                && Objects.equal(getSharesCount(), company.getSharesCount())
                && Objects.equal(getBoardMembers(), company.getBoardMembers())
                && Objects.equal(getBoardMembersTerm(), company.getBoardMembersTerm())
                && Objects.equal(getBoardOfDirectors(), company.getBoardOfDirectors())
                && Objects.equal(getBoardOfDirectorsTerm(), company.getBoardOfDirectorsTerm())
                && Objects.equal(getPartners(), company.getPartners())
                && Objects.equal(getEventsList(), company.getEventsList())
                && Objects.equal(getCompanyUserRole(), company.getCompanyUserRole())
                && Objects.equal(getFinancialStatementProtocols(), company.getFinancialStatementProtocols());
    }

    @Override
    public int hashCode() {
        return com.google.common.base.Objects.hashCode(getCompanyId(), getKrsNumber());
    }


    public void addCompanyUserRole(CompanyUserRole companyUserRole) {
        this.companyUserRole.add(companyUserRole);
    }

    @Override
    public String toString() {
        return "Company{" +
                "companyId=" + companyId +
                ", companyName='" + companyName + '\'' +
                ", krsNumber='" + krsNumber + '\'' +
                ", address=" + address +
                ", nip='" + nip + '\'' +
                ", regon='" + regon + '\'' +
                ", shareCapital=" + shareCapital +
                ", shareValue=" + shareValue +
                ", sharesCount=" + sharesCount +
                ", boardMembers=" + boardMembers +
                ", boardOfDirectors=" + boardOfDirectors +
                ", partners=" + partners +
                ", partnersRevealed=" + partnersRevealed +
                ", manySharesAllowed=" + manySharesAllowed +
                ", companyUserRole=" + companyUserRole +
                ", financialStatementProtocols=" + financialStatementProtocols +
                '}';
    }

    /**
     * @return
     * @throws CloneNotSupportedException
     */
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public void addNewEvent(Event event) {
        this.eventsList.add(event);
    }
}
