package com.example.productapp;

import com.example.productapp.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;

public class AuthorityUtils {

    public static List<GrantedAuthority> mapRoleToGrantedAuthority(User.Role role) {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
}
