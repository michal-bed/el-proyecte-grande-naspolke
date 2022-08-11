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
    private String StreetName;
    private String StreetNumber;
    private String LocalNumber;
    private String City;
    private String ZipCode;
    private String PostOffice;

    @Builder
    public Address(String streetName, String streetNumber, String localNumber, String city, String zipCode, String postOffice) {
        StreetName = streetName;
        StreetNumber = streetNumber;
        LocalNumber = localNumber;
        City = city;
        ZipCode = zipCode;
        PostOffice = postOffice;
    }
}
