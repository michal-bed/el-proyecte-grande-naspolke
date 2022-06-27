package com.company.naspolke.model.aggregate;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.Company;
import com.company.naspolke.model.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class CompanyUserRoleId implements Serializable {

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private Company company;
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private AppUser appUser;
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private Role role;

}
