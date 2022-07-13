package com.VietDung.MusicPlayerApplication.repository;

import com.VietDung.MusicPlayerApplication.entity.FileSong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileSongRepository extends JpaRepository<FileSong, Long> {
}
