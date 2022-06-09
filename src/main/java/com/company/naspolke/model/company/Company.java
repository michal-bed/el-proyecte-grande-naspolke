package com.company.naspolke.model.company;


import com.company.naspolke.model.company.companyBodies.BoardMember;
import com.company.naspolke.model.company.companyBodies.BoardOfDirector;
import com.company.naspolke.model.company.companyBodies.Partner;
import com.company.naspolke.model.company.companyBodies.PartnerCompany;
import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
public class Company {

    @Id
    @Type(type = "uuid-char")
    private UUID uuid = UUID.randomUUID();
    private String name;
    private Integer KRSNumber;
    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address adress;
    private String NIP;
    private String REGON;
    private BigDecimal shareCapital;
    private BigDecimal shareValue;
    private Integer shareCount;
    @OneToMany
    private Set<BoardMember> boardMembers = new HashSet<>();
    @OneToMany
    private Set<BoardOfDirector> boardOfDirectors = new HashSet<>();
    @OneToMany
    private Set<Partner> partners = new HashSet<>();
    @OneToMany
    private Set<PartnerCompany> partnerCompanies = new HashSet<>();

}
