package com.company.naspolke.model.company;


import com.company.naspolke.model.company.companyBodies.*;
import com.company.naspolke.model.company.companyBodies.Partners.JuridicalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.NaturalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.Partners;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Data
@NoArgsConstructor
@Entity
public class Company {

    @Id
    @NotNull
    @Type(type = "uuid-char")
    private UUID companyUuid = UUID.randomUUID();
    private String name;
    private Long krsNumber;
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "address_id")
    private Address address;
    private String nip;
    private String regon;
    private BigDecimal shareCapital;
    private BigDecimal shareValue;
    private Integer shareCount;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<BoardMember> boardMembers = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL)
    private Set<BoardOfDirector> boardOfDirectors = new HashSet<>();
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "partners_id")
    private Partners partners;
    private boolean partnersRevealed;
    private boolean manySharesAllowed;


    @Builder
    public Company(String name, Long krsNumber, Address address, String nip, String regon, BigDecimal shareCapital, Set<BoardMember> boardMembers, Set<BoardOfDirector> boardOfDirectors, Partners partners, boolean manySharesAllowed) {
        this.name = name;
        this.krsNumber = krsNumber;
        this.address = address;
        this.nip = nip;
        this.regon = regon;
        this.shareCapital = shareCapital;
        this.boardMembers = boardMembers;
        this.boardOfDirectors = boardOfDirectors;
        this.partners = partners;
        this.partnersRevealed = checkIfAllPartnersAreRevealed();
        this.manySharesAllowed = manySharesAllowed;
        this.shareValue = checkForShareValue();
        this.shareCount = checkForShareCount();
    }

    private Integer checkForShareCount() {
        if(manySharesAllowed){
            BigDecimal shareCountBD = shareCapital.divide(shareValue);
            return shareCountBD.intValue();
        }
        return null;
    }


    public boolean checkIfAllPartnersAreRevealed() {
        return partners.getAllSharesValue().equals(shareCapital);
    }

    public BigDecimal checkForShareValue(){
        BigDecimal shareValue = null;
        if (manySharesAllowed) {
            if (partners.getIndividualPartners().size()>0){
                NaturalPerson person = partners.getIndividualPartners().iterator().next();
                BigDecimal sharesValues = person.getSharesValue();
                BigDecimal sharesCount = BigDecimal.valueOf(person.getSharesCount());
                shareValue = sharesValues.divide(sharesCount);
            } else {
                JuridicalPerson juridicalPerson = partners.getPartnerCompanies().iterator().next();
                BigDecimal sharesValues = juridicalPerson.getSharesValue();
                BigDecimal sharesCount = BigDecimal.valueOf(juridicalPerson.getSharesCount());
                sharesValues = sharesValues.divide(sharesCount);
            }
        }
        assert shareValue != null;
        shareValue = shareValue.setScale(2, RoundingMode.CEILING);
        return shareValue;
    }
}
