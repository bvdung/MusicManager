package com.VietDung.MusicPlayerApplication.repository;

import com.VietDung.MusicPlayerApplication.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    public List<Song> findByNameContaining(String name);

    @Modifying
    @Transactional
    @Query(
            value = "update songs set name = ?1, category = ?2, date_update = ?3 where id = ?4",
            nativeQuery = true
    )
    public int updateNameAndGenreSong(String name, String category, Date dateUpdate , long id);
}
