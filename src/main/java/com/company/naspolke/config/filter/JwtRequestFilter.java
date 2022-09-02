package com.company.naspolke.config.filter;

import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.repository.CompanyUserRoleRepository;
import com.company.naspolke.service.MyUserDetailsServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;

//@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    List<String> EXCLUDED_PATHS = Arrays.asList("/", "/login", "/auth", "/logout", "/refresh");
    List<String> ADDITIONAL_CHECK_PATHS = Arrays.asList(
            "/companies/search/updateCompanyName", "/companies/search/updateShareCapital",
            "/companies/search/updateBoardOfDirectorsTerm", "/companies/search/updateBoardMembersTerm",
            "/companies/search/updateShareValue");
//    "/update-company-address",

    private MyUserDetailsServiceImplementation userDetailsService;
    private JwtUtil jwtUtil;
    private CompanyUserRoleRepository companyUserRoleRepository;

    @Autowired
    public JwtRequestFilter(MyUserDetailsServiceImplementation userDetailsService, JwtUtil jwtUtil,
                            CompanyUserRoleRepository companyUserRoleRepository) {
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.companyUserRoleRepository = companyUserRoleRepository;
    }

    public JwtRequestFilter() {
        replicateObject(new JwtRequestFilterCreator().createJwtRequestFilter());
    }

    private void replicateObject(JwtRequestFilter patternObject) {
        this.userDetailsService = patternObject.userDetailsService;
        this.jwtUtil = patternObject.jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {

        if (EXCLUDED_PATHS.contains(request.getServletPath())) {
            chain.doFilter(request, response);
            return;
        }
        final String authorizationHeader = jwtUtil.getAuthorizationHeader(request);

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = jwtUtil.getJwt(authorizationHeader);
            username = jwtUtil.extractUsername(jwt); // uuid
        }

        if (username != null && (SecurityContextHolder.getContext().getAuthentication()
                instanceof AnonymousAuthenticationToken ||
                SecurityContextHolder.getContext().getAuthentication() == null)) {

            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(jwt, userDetails)) {

                if (ADDITIONAL_CHECK_PATHS.contains(request.getServletPath()))
                {
                    Map<String, String[]> requestParameterMap = request.getParameterMap();
                    var companyId = UUID.fromString(requestParameterMap.get("companyId")[0]);
                    var userId = jwtUtil.getUserId(request);
                    var companyRole = companyUserRoleRepository
                            .findByCompanyIdAndUserId(companyId, userId)
                            .getRole().getRoleType().getRoleType();

                    if (!(companyRole.equals("OWNER") || companyRole.equals("EDITOR")))
                    {
                        chain.doFilter(request, response);
                        return;
                    }

                }

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails.getUsername(), null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                System.out.println(SecurityContextHolder.getContext().getAuthentication());
            }
        } else {
            System.out.println("Not validated JWT");
        }
        chain.doFilter(request, response);
    }

}
