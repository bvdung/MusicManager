package com.VietDung.MusicPlayerApplication.config;

/*
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(new BCryptPasswordEncoder(8));
        return daoAuthenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeHttpRequests((authz) -> authz
                        .antMatchers("/pagination").permitAll()
                        .antMatchers("/paginateWithInputSearch").permitAll()
                        .antMatchers("getIdFileSongOfSong").permitAll()
                        .antMatchers("/findByNameContaining").permitAll()
                        .antMatchers("/getAudio").permitAll()
                        .antMatchers("/home/mainPage").hasAuthority("ADMIN")
                        .antMatchers("/add").hasAuthority("ADMIN")
                        .antMatchers("/deleteSongs").hasAuthority("ADMIN")
                        .antMatchers("/updateSingleSong").hasAuthority("ADMIN")
                )
                .formLogin(withDefaults())
                .httpBasic();
        return httpSecurity.build();
    }
}
*/