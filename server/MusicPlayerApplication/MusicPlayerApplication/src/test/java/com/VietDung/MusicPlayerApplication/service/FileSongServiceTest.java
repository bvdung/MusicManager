package com.VietDung.MusicPlayerApplication.service;

import com.VietDung.MusicPlayerApplication.entity.FileSong;
import com.VietDung.MusicPlayerApplication.repository.FileSongRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FileSongServiceTest {

    @Autowired
    private FileSongRepository fileSongRepository;

    @Test
    public void getFileSongByid(){
        Optional<FileSong> fileSong = fileSongRepository.findById(1L);
        byte[] dataBase64 = Base64.encodeBase64(fileSong.get().getData());
        String fileType = fileSong.get().getFileType();
        System.out.println(fileSong.get().getData());
        System.out.println(fileType);
    }

}