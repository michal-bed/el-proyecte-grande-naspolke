package com.company.naspolke.model.company.companyBodies;

import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.SharePackage;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class JuridicalPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @OneToOne
    private SharePackage shares;
    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Builder
    public JuridicalPerson(String name, SharePackage shares, Address address) {
        this.name = name;
        this.shares = shares;
        this.address = address;
    }
}
