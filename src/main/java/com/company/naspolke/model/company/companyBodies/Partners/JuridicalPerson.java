package com.company.naspolke.model.company.companyBodies.Partners;

import com.company.naspolke.model.company.Address;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@NoArgsConstructor
public class JuridicalPerson implements SharePossesing {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private BigDecimal sharesValue;
    private Integer sharesCount;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;
    private String representativeFirstname;
    private String representativeLastname;

    @Builder

    public JuridicalPerson(Long id, String name, BigDecimal sharesValue, Integer sharesCount, Address address, String representativeFirstname, String representativeLastname) {
        this.id = id;
        this.name = name;
        this.sharesValue = sharesValue;
        this.sharesCount = sharesCount;
        this.address = address;
        this.representativeFirstname = representativeFirstname;
        this.representativeLastname = representativeLastname;
    }
}
