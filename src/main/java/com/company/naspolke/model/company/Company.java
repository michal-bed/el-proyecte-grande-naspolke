package com.company.naspolke.model.company;


import com.company.naspolke.model.company.bodyOrgans.BoardMember;
import com.company.naspolke.model.company.bodyOrgans.BoardOfDirector;
import com.company.naspolke.model.company.bodyOrgans.Partner;
import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
public class Company {

    @Id
    @Type(type = "uuid-char")
    private UUID uuid = UUID.randomUUID();
    private String Name;
    private Integer KRSNumber;
    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address adress;
    private Integer NIP;
    private Integer REGON;
    private Integer ShareCapital;
    @OneToMany
    private Set<BoardMember> BoardMembers = new HashSet<>();
    @OneToMany
    private Set<BoardOfDirector> BoardOfDirectors = new HashSet<>();
    @OneToMany
    private Set<Partner> Partners = new HashSet<>();


}
