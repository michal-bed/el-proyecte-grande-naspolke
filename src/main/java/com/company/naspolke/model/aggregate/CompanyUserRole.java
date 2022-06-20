package com.company.naspolke.model.aggregate;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.Company;
import com.company.naspolke.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "company_user_role")
@AssociationOverrides({
        @AssociationOverride(name = "primaryKey.company",
                joinColumns = @JoinColumn(name = "company_id")),
        @AssociationOverride(name = "primaryKey.appUser",
                joinColumns = @JoinColumn(name = "user_id")),
        @AssociationOverride(name = "primaryKey.role",
                joinColumns = @JoinColumn(name = "role_id")) })
public class CompanyUserRole {

    @EmbeddedId
    private CompanyUserRoleId primaryKey = new CompanyUserRoleId();
    @Column(name = "registered_date")
    private LocalDateTime registeredDate;

    public CompanyUserRoleId getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(CompanyUserRoleId primaryKey) {
        this.primaryKey = primaryKey;
    }

    @Transient
    public Company getCompany() {
        return getPrimaryKey().getCompany();
    }

    public void setCompany(Company company) {
        getPrimaryKey().setCompany(company);
    }

    @Transient
    public AppUser getUser() {
        return getPrimaryKey().getAppUser();
    }

    public void setUser(AppUser appUser) {
        getPrimaryKey().setAppUser(appUser);
    }

    @Transient
    public Role getRole() {
        return getPrimaryKey().getRole();
    }

    public void setRole(Role role) {
        getPrimaryKey().setRole(role);
    }

    public LocalDateTime getRegisteredDate() {
        return registeredDate;
    }

    @Temporal(TemporalType.DATE)
    public void setRegisteredDate(LocalDateTime registeredDate) {
        this.registeredDate = registeredDate;
    }

}
