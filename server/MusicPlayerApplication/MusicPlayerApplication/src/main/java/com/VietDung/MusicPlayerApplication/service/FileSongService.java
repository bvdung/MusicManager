package com.VietDung.MusicPlayerApplication.service;

import com.VietDung.MusicPlayerApplication.entity.FileSong;
import com.VietDung.MusicPlayerApplication.repository.FileSongRepository;
import com.VietDung.MusicPlayerApplication.repository.SongRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class FileSongService {

    @Autowired
    private FileSongRepository fileSongRepository;

    public FileSong storeFile(MultipartFile file){
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try{
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")){
                throw new Exception("file name not valid: " + fileName);
            }

            FileSong fileSong = FileSong.builder()
                    .fileType(file.getContentType())
                    .fileName(fileName)
                    .data(file.getBytes())
                    .build();

            return fileSongRepository.save(fileSong);
        }catch (Exception ex){
            System.out.println("could save file: " + fileName);
 //          throw new FileStorage("could not store file " + fileName);
        }
        return null;
    }

    public FileSong getFile(long fileId) {
        return fileSongRepository.findById(fileId).get();
    }

    public byte[] getFileSongById(long id){
        Optional<FileSong> fileSong = fileSongRepository.findById(1L);
        byte[] dataBase64 = Base64.encodeBase64(fileSong.get().getData());
        String fileType = fileSong.get().getFileType();
        System.out.println(dataBase64);
        System.out.println(fileType);

        return dataBase64;
    }
}
