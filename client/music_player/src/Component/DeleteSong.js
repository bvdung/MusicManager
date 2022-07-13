import { deleteSongs } from "../service/song_service"


const deleteSongsById = (id) => {
    deleteSongs(id);
}