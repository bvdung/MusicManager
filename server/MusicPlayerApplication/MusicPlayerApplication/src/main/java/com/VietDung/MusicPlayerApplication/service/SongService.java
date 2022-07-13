package com.VietDung.MusicPlayerApplication.service;

import com.VietDung.MusicPlayerApplication.entity.FileSong;
import com.VietDung.MusicPlayerApplication.entity.Song;
import com.VietDung.MusicPlayerApplication.repository.SongRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepository;

    public Song addOneSong(Song song){

        FileSong fileSong = FileSong.builder()
                .fileName(song.getFileName())
                .fileType(song.getFileSong().getFileType())
                .data(song.getFileSong().getData())
                .build();

        Song newSong = Song.builder()
                .fileName(song.getFileName())
                .name(song.getName())
                .category(song.getCategory())
                .dateCreate(song.getDateCreate())
                .fileSong(fileSong)
                .build();
        return  songRepository.save(song);
    }

    public List<Song> getAllSong(){
        return songRepository.findAll();
    }

    public ResponseEntity<HttpStatus> deleteSongs(long[] id){
        for(int i = 0; i<id.length; i++) {
            songRepository.deleteById(id[i]);
        }
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }

    public List<Song> pagination(int pageSize, int currentPage){
//        Pageable page = PageRequest.of(currentPage,pageSize);
//        return songRepository.findAll(page).toList();
        Pageable page = PageRequest.of(currentPage,pageSize);
        List<Song> result = songRepository.findAll(page).toList();
        List<Song> songList = new ArrayList<>(result.size());
        for(Song eSong : result){
            Song newSong = Song.builder()
                    .id(eSong.getId())
                    .name(eSong.getName())
                    .category(eSong.getCategory())
                    .fileName(eSong.getFileName())
                    .dateCreate(eSong.getDateCreate())
                    .dateUpdate(eSong.getDateUpdate())
                    .build();
            songList.add(newSong);
        }
        return songList;
    }

    public String getAudioSongById (long id){
        byte[] data = songRepository.findById(id).get().getFileSong().getData();
        String text = Base64.encodeBase64URLSafeString(data);
       return text;
    }


    public long getIdFileSongOfSong(@PathVariable long id){
        long idOfSong = songRepository.findById(id).get().getFileSong().getId();
        return idOfSong;
    }


    public List<Song> findByNameContaining(String name){
        List<Song> result = songRepository.findByNameContaining(name);
        List<Song> songList = new ArrayList<>(result.size());

        for(Song eSong : result){
            Song song = Song.builder()
                    .id(eSong.getId())
                    .name(eSong.getName())
                    .category(eSong.getCategory())
                    .fileName(eSong.getFileName())
                    .dateCreate(eSong.getDateCreate())
                    .dateUpdate(eSong.getDateUpdate())
                    .build();

            songList.add(song);
        }
        return songList;
    }

    public List<Song> paginationWithSearch(int pageSize, int currentPage, String inputSearch){
        List<Song> songListForPagination = findByNameContaining(inputSearch);
        int startItem = currentPage * pageSize;
        List<Song> songList;

        if(songListForPagination.size() <= startItem){
            songList = Collections.emptyList();
        }else{
            int toIndex = Math.min(startItem + pageSize, songListForPagination.size());
            songList = songListForPagination.subList(startItem, toIndex);
        }
        return  songList;
    }

    public void getSongHaveDataById(long id){
        System.out.println(songRepository.findById(id).get());
    }
    public int updateSingleSong(Song song){
        return songRepository.updateNameAndGenreSong(song.getName(), song.getCategory(), song.getDateUpdate() ,song.getId());
    }
}
