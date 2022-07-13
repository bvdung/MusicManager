package com.VietDung.MusicPlayerApplication.controller;

import com.VietDung.MusicPlayerApplication.entity.FileSong;
import com.VietDung.MusicPlayerApplication.payload.UploadFileResponse;
import com.VietDung.MusicPlayerApplication.service.FileSongService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/fileSong")
@CrossOrigin("*")
public class FileSongController {
    private static final Logger logger = LoggerFactory.getLogger(FileSongController.class);

    @Autowired
    private FileSongService fileSongService;


    @PostMapping("/uploadFile")
    public FileSong uploadFile(@RequestParam("file") MultipartFile file) {
        FileSong fileSong = fileSongService.storeFile(file);

        return fileSong;

//        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
//                .path("/downloadFile/")
//                .path(fileSong.getId())
//                .toUriString();
//
//        return new UploadFileResponse(fileSong.getFileName(), fileDownloadUri,
//                file.getContentType(), file.getSize());
    }

    @GetMapping("/getAudio/{id}")
    public byte[] getFileSongById(@PathVariable long id){
        return fileSongService.getFileSongById(id);
    }

    @GetMapping("/downloadFile/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable long fileId) {
        // Load file from database
        FileSong dbFile = fileSongService.getFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
                .body(new ByteArrayResource(dbFile.getData()));
    }

//    @RequestMapping(value = "/recfile/{id}", method = RequestMethod.GET
//           )
//    public HttpEntity<byte[]> downloadRecipientFile(@PathVariable("id") long id,
//                                                    ModelMap model, HttpServletResponse response) throws IOException,
//            ServletException {
//
//        byte[] fileSong = fileSongService.getFileSongById(id);
//
//        HttpHeaders header = new HttpHeaders();
//
//       // header.setContentType(new MediaType("audio", "mp3"));
//        header.setContentType(new MediaType("audio", "vnd.wave"));
//        header.setContentLength(fileSong.length);
//        return new HttpEntity<byte[]>(fileSong, header);
//    }
}
