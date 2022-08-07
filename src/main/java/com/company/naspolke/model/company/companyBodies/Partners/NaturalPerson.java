package com.company.naspolke.model.company.companyBodies.Partners;

import com.company.naspolke.model.company.Address;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
public class NaturalPerson implements SharePossesing {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String secondName;
    private String lastNameI;
    private String lastNameII;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;
    private BigDecimal sharesValue;
    private Integer sharesCount;
    private char gender;


    @Builder
    public NaturalPerson(String firstName, String secondName, String lastNameI, String lastNameII, Address address,
                         BigDecimal sharesValue, Integer sharesCount, char gender) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.lastNameI = lastNameI;
        this.lastNameII = lastNameII;
        this.address = address;
        this.sharesValue = sharesValue;
        this.sharesCount = sharesCount;
        this.gender = gender;
    }
}
