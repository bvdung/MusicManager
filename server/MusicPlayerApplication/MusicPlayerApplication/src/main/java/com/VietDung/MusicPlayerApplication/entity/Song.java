package com.VietDung.MusicPlayerApplication.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "songs")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String category;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "date_create")
    private Date dateCreate;

    @Column(name = "date_update")
    private Date dateUpdate;

    @OneToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "file_song",
            referencedColumnName = "id"
    )
    private FileSong fileSong;
}










