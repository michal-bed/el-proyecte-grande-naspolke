package com.company.naspolke.model.company;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@Entity(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long addressId;
    private String streetName;
    private String streetNumber;
    private String localNumber;
    private String city;
    private String zipCode;
    private String postOffice;

    @Builder
    public Address(String streetName, String streetNumber, String localNumber, String city, String zipCode, String postOffice) {
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.localNumber = localNumber;
        this.city = city;
        this.zipCode = zipCode;
        this.postOffice = postOffice;
    }
}
