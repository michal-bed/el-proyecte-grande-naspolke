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
public class JuridicalPerson implements Shareholder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private BigDecimal sharesValue;
    private Integer sharesCount;
    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Builder
    public JuridicalPerson(String name, BigDecimal sharesValue, Integer sharesCount, Address address) {
        this.name = name;
        this.sharesValue = sharesValue;
        this.sharesCount = sharesCount;
        this.address = address;
    }
}
