package com.company.naspolke.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;

@Getter
@Setter
@ToString
//@RequiredArgsConstructor
@NoArgsConstructor
@Entity
public class Privilege {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    public Privilege(String name) {
        this.name = name;
    }

    @ManyToMany(mappedBy = "privileges")
    private Collection<Role> roles;
}