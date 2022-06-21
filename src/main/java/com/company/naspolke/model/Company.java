package com.company.naspolke.model;

import com.company.naspolke.model.aggregate.CompanyUserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Company_Table")
public class Company {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "company_id")
    private UUID companyId;
    @Column(name = "company_name")
    private String companyName;
    @Column(name = "krs_number")
    private Long krsNumber;
    @JsonIgnore
    @OneToMany(mappedBy = "primaryKey.company", cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @Column(name = "company_user_role")
    private Set<CompanyUserRole> companyUserRole = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Company company = (Company) o;
        return companyId != null && Objects.equals(companyId, company.companyId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public void addCompanyUserRole(CompanyUserRole companyUserRole) {
        this.companyUserRole.add(companyUserRole);
    }
}
