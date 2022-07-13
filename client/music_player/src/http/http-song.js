
import axios from "axios";

const song_axios = axios.create(
    {
        baseURL: 'http://localhost:8080/song',
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

const fileSong_axio = axios.create(
    {
        baseURL: 'http://localhost:8080/fileSong',
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'audio/mpeg'
        }
    }
);

export {song_axios, fileSong_axio};