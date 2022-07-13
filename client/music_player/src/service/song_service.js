import {song_axios,fileSong_axio} from "../http/http-song";

const addSong = (song) => {
    return song_axios.post("/add", song);
}

const getAllSong = () => {
    return song_axios.get("/getAllSong");
}

const deleteSongs = (id) => {
    return song_axios.delete(`/deleteSongs/${id}`);
}

const pagination = (pageSize, currentPage) => {
    return song_axios.get(`/pagination/${pageSize}/${currentPage}`);
}

// const addFileDataSong = (formData) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open("POST","http://localhost:8080/fileSong/uploadFile");
//     xhr.send(formData);
// }

const getAudioById = (id) => {
   return fileSong_axio.get(`/downloadFile/${id}`);
   
}

const getIdFileSongBySong = (id) => {
    return song_axios.get(`/getIdFileSongOfSong/${id}`);
}

const paginationWithInputSearch = (pageSize, currentPage, inputSearch) => {
    return song_axios.get(`/paginateWithInputSearch/${pageSize}/${currentPage}/${inputSearch}`);
}

const editNameGenreSong = (id, name, category, dateUpdate) => {
    let song = {id, name, category, dateUpdate};
    return song_axios.put("/updateSingleSong", song);
}

export {addSong, getAllSong, deleteSongs, paginationWithInputSearch,
        pagination, getAudioById,getIdFileSongBySong, editNameGenreSong};