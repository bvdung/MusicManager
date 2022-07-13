package com.VietDung.MusicPlayerApplication.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class LoginController {

    @GetMapping("/login/{username}/{password}")
    public String Login(@PathVariable String username,@PathVariable String password){
        return "Login";
    }
}
