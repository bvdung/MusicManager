package com.VietDung.MusicPlayerApplication.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/home")
public class HomePageController {

    @GetMapping("/mainPage")
    public String getHomePage(){
        return "this is home page";

    }



}
