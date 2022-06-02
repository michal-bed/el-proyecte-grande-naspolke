package com.company.naspolke.config.security;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.Role;
import com.company.naspolke.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service("userDetailsService")
@Transactional
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail)
            throws UsernameNotFoundException {

        AppUser user = userRepository.findByLogin(usernameOrEmail);
        String login = null;
        if (user == null) {
            user = userRepository.findByEmail(usernameOrEmail);
            if (user == null)
                throw new UsernameNotFoundException(usernameOrEmail);
        }
        else {
             login = user.getLogin();
        }

        return new org.springframework.security.core.userdetails.User(
                login != null ? login : user.getEmail(), user.getPassword(), user.isEnabled(), true, true,
                true, getAuthorities(user.getRoles()));
    }

    public static Collection<? extends GrantedAuthority> getAuthorities(
            Collection<Role> roles) {

        return getGrantedAuthorities(getPrivileges(roles));
    }

    public static List<String> getPrivileges(Collection<Role> roles) {

        List<String> privileges = new ArrayList<>();
//        List<Privilege> collection = new ArrayList<>();
        for (Role role : roles) {
            privileges.add(role.getName());
//            collection.addAll(role.getPrivileges());
        }
//        for (Privilege item : collection) {
//            privileges.add(item.getName());
//        }
        return privileges;
    }

    private static List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String privilege : privileges) {
            authorities.add(new SimpleGrantedAuthority(privilege));
        }
        return authorities;
    }
}
