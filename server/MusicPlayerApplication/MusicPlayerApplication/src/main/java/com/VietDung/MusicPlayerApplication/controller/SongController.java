package com.VietDung.MusicPlayerApplication.controller;

import com.VietDung.MusicPlayerApplication.entity.Song;
import com.VietDung.MusicPlayerApplication.repository.SongRepository;
import com.VietDung.MusicPlayerApplication.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/song")
@CrossOrigin("*")
public class SongController {

    @Autowired
   private SongService songService;

    @PostMapping("/add")
    public Song addOneSong(@RequestBody Song song){

        return songService.addOneSong(song);
    }

    @GetMapping("/getAllSong")
    public List<Song> getAllSong(){
        return songService.getAllSong();
    }

    @DeleteMapping("/deleteSongs/{id}")
    public ResponseEntity<HttpStatus> deleteSongs(@PathVariable long[] id){

        return songService.deleteSongs(id);
    }

    @GetMapping("/pagination/{pageSize}/{currentPage}")
    public List<Song> pagination(@PathVariable int pageSize,@PathVariable int currentPage){
        return songService.pagination(pageSize, currentPage);
    }

    @GetMapping("/getAudio/{id}")
    public String getAudioSongById (@PathVariable long id){
        return songService.getAudioSongById(id);
    }

    @GetMapping("/getIdFileSongOfSong/{id}")
    public long getIdFileSongOfSong(@PathVariable long id){
        return songService.getIdFileSongOfSong(id);
    }
    @GetMapping("/findByNameContaining/{name}")
    public List<Song> findByNameContainingLetter(@PathVariable String name){
        return songService.findByNameContaining(name);
    }

    @GetMapping("/paginateWithInputSearch/{pageSize}/{currentPage}/{inputSearch}")
    public List<Song> paginationWithSearch(@PathVariable int pageSize,
                                           @PathVariable int currentPage,
                                           @PathVariable String inputSearch){
        return songService.paginationWithSearch(pageSize, currentPage, inputSearch);
    }


    @PutMapping("/updateSingleSong")
    public int updateSingleSong(@RequestBody Song song){
        return songService.updateSingleSong(song);
    }

}
