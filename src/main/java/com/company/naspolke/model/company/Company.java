package com.company.naspolke.model.company;


import com.company.naspolke.model.company.companyBodies.*;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.math.BigDecimal;
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
    private UUID uuid = UUID.randomUUID();
    private String name;
    private Integer KRSNumber;
    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;
    private String NIP;
    private String REGON;
    private BigDecimal shareCapital;
    private BigDecimal shareValue;
    private Integer shareCount;
    @OneToMany
    private Set<BoardMember> boardMembers = new HashSet<>();
    @OneToMany
    private Set<BoardOfDirector> boardOfDirectors = new HashSet<>();
    @ManyToOne
    @JoinColumn(name = "partners_id")
    private Partners partners;


    @Builder
    public Company(String name, Integer KRSNumber, Address address, String NIP, String REGON, BigDecimal shareCapital, BigDecimal shareValue, Integer shareCount, Set<BoardMember> boardMembers, Set<BoardOfDirector> boardOfDirectors, Partners partners) {
        this.name = name;
        this.KRSNumber = KRSNumber;
        this.address = address;
        this.NIP = NIP;
        this.REGON = REGON;
        this.shareCapital = shareCapital;
        this.shareValue = shareValue;
        this.shareCount = shareCount;
        this.boardMembers = boardMembers;
        this.boardOfDirectors = boardOfDirectors;
        this.partners = partners;
    }
}
