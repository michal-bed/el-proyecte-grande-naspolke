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
    @OneToMany(cascade = CascadeType.ALL)
    private Set<NaturalPerson> individualPartners = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL)
    private Set<JuridicalPerson> partnerCompanies = new HashSet<>();

    @Builder
    public Partners(Set<NaturalPerson> individualPartners, Set<JuridicalPerson> partnerCompanies) {
        this.individualPartners = individualPartners;
        this.partnerCompanies = partnerCompanies;
    }

    public BigDecimal getAllSharesValue() {
        BigDecimal sumSharesValue = BigDecimal.ZERO;
        Set<SharePossesing> sharesPossesing = new HashSet<>();
        sharesPossesing.addAll(individualPartners);
        sharesPossesing.addAll(partnerCompanies);
        for (SharePossesing partner : sharesPossesing) {
            sumSharesValue = sumSharesValue.add(partner.getSharesValue());
        }
        return sumSharesValue;
    }
}
