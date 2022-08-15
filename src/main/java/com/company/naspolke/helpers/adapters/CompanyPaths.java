package com.company.naspolke.helpers.adapters;


import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@PropertySource("classpath:paths.properties")
@Configuration
@ConfigurationProperties("company-path")
@Getter
@Setter
class CompanyPaths {
    private String nip;
    private String regon;
    private String krsNumber;
    private String companyName;
    private String multipleSharesAllowed;
    private String legalForm;
    private String directors;
    private String boardMembers;
    private String partners;
    private String shareCapital;
    private String address;

    @Override
    public String toString() {
        return "CompanyPaths{" +
                "nip='" + nip + '\'' +
                ", regon='" + regon + '\'' +
                ", krsNumber='" + krsNumber + '\'' +
                ", companyName='" + companyName + '\'' +
                ", multipleSharesAllowed='" + multipleSharesAllowed + '\'' +
                ", legalForm='" + legalForm + '\'' +
                ", directors='" + directors + '\'' +
                ", boardMembers='" + boardMembers + '\'' +
                ", partners='" + partners + '\'' +
                ", shareCapital='" + shareCapital + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
