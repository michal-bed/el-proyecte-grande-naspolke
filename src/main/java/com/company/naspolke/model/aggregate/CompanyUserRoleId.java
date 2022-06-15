package com.company.naspolke.model.aggregate;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.Company;
import com.company.naspolke.model.Role;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class CompanyUserRoleId implements Serializable {

    @ManyToOne(cascade = CascadeType.ALL)
    private Company company;
    @ManyToOne(cascade = CascadeType.ALL)
    private AppUser appUser;
    @ManyToOne(cascade = CascadeType.ALL)
    private Role role;

}
