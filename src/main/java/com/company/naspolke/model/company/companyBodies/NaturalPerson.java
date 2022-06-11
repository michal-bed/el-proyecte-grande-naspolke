package com.company.naspolke.model.company.companyBodies;


import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.SharePackage;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class NaturalPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String secondName;
    private String lastNameI;
    private String lastNameII;
    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;
    @OneToOne
    private SharePackage shares;

    @Builder
    public NaturalPerson(String firstName, String secondName, String lastNameI, String lastNameII, Address address, SharePackage shares) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.lastNameI = lastNameI;
        this.lastNameII = lastNameII;
        this.address = address;
        this.shares = shares;
    }
}
