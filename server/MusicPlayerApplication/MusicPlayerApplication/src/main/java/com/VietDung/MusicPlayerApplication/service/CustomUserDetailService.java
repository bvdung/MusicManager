package com.VietDung.MusicPlayerApplication.service;

/*
import com.VietDung.MusicPlayerApplication.entity.CustomUserDetail;
import com.VietDung.MusicPlayerApplication.entity.User;
import com.VietDung.MusicPlayerApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);

        if(user == null) throw new UsernameNotFoundException("not found user name");

        UserDetails UserDetail = new CustomUserDetail(user);
        return UserDetail;
    }
}
*/