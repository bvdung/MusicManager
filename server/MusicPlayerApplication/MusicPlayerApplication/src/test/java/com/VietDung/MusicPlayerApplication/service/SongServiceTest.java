package com.VietDung.MusicPlayerApplication.service;

import com.VietDung.MusicPlayerApplication.entity.Song;
import com.VietDung.MusicPlayerApplication.repository.SongRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class SongServiceTest {

    @Autowired
    private SongRepository songRepository;

    @Test
    public void getSongById (){
        byte[] data = songRepository.findById(49L).get().getFileSong().getData();
        System.out.println(data);
    }

    @Test
    public void getSongHaveDataById(){
        System.out.println(songRepository.findById(99L).get().getFileSong().getId());
    }
}