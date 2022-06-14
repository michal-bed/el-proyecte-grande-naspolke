package com.company.naspolke.model.company.companyBodies.Partners;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class Partners {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToMany
    private Set<NaturalPerson> individualPartners = new HashSet<>();
    @OneToMany
    private Set<JuridicalPerson> partnerCompanies = new HashSet<>();

    @Builder
    public Partners(Set<NaturalPerson> individualPartners, Set<JuridicalPerson> partnerCompanies) {
        this.individualPartners = individualPartners;
        this.partnerCompanies = partnerCompanies;
    }
//TODO zastanowić się nad setem ShareHoldersów

    public BigDecimal getAllSharesValue() {
        BigDecimal sumSharesValue = BigDecimal.ZERO;
        sumSharesValue = individualSharesValue(sumSharesValue);
        sumSharesValue = companySharesValue(sumSharesValue);
        return sumSharesValue;
    }

    private BigDecimal companySharesValue(BigDecimal sumSharesValue) {
        if (partnerCompanies!=null) {
            for (JuridicalPerson juridicalPerson : partnerCompanies) {
                sumSharesValue = sumSharesValue.add(juridicalPerson.getSharesValue());
            }
        }
        return sumSharesValue;
    }

    private BigDecimal individualSharesValue(BigDecimal sumSharesValue) {
        if (individualPartners!=null) {
            for (NaturalPerson person : individualPartners) {
                sumSharesValue = sumSharesValue.add(person.getSharesValue());
            }
        }
        return sumSharesValue;
    }


}
