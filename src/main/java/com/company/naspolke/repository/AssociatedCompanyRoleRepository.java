package com.company.naspolke.repository;

import com.company.naspolke.model.AssociatedCompanyRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AssociatedCompanyRoleRepository  extends JpaRepository<AssociatedCompanyRole, UUID>
{

}
