import React, { useEffect, useState } from 'react';
import {Howl, Howler} from 'howler';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ReactDOM from "react-dom/client";
import {getIdFileSongBySong,getAudioById, deleteSongs } from '../service/song_service';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../css/playMusic.css";

function PlayMusic() {

  const{fileName, id, genre, dateUpdate, dateCreate, name} = useParams();
  const [path, setPath] = useState("");
  const [audio, setAudio] = useState("");
  const [idOfFileSong, setIdOfFileSong] = useState(null);
  let navigate = useNavigate();
  
  import(`../fileZingMp3/${fileName}`).then((val) => {
    let media = val['default'];
    setPath(media);
  })
  
  

  useEffect(() => {
    /*
    document.getElementById('slider').innerHTML = 
    "<audio controls>" +
       "<source src={\"\"} type=\"audio/mp3\" id=\"srcAudio\"/>" +  
    "</audio>";
     document.getElementById('srcAudio').src = path;
      */
      getIdFileSongBySong(id).then(response => {
        setIdOfFileSong(response.data);
      }).catch(error => {
      console.log("error: " + error);
     })
    
  },[path])


  useEffect(() => {
    loadComponentAudio();
  }, [idOfFileSong])


  const loadComponentAudio = () => {
    getAudioById(idOfFileSong).then(response => {
      const blobUrl = window.URL.createObjectURL(new Blob([response.data], {
        type: 'audio/wav',
    }));
    setAudio(blobUrl);
    
   }).catch(error => {
    console.log("error: " + error);
   })
  }


  useEffect(() => {
    console.log('aduio: ' + audio);

    document.getElementById('audioFile').innerHTML = 
    "<audio className=\"w-75\" controls autoplay>" +
       "<source src={\"\"} type=\"audio/mp3\" id=\"srcAudioDataBase\"/>" +  
    "</audio>";

    document.getElementById('srcAudioDataBase').src = audio;


  },[audio])

  const handlerClickDelSong = (e) => {
      e.preventDefault();
      deleteSongs(id).then(response => {
        alert("delete success: " + response.data);
        navigate("/");
      }).catch(error => {
        console.log("error: " + error);
      })
  }

   return (
     <div>
        <h1 className="text-center mb-4">MUSIC MANAGER</h1>
        <div id = "slider"> 
        </div>
        <div id = "audioFile">
         
        </div>
        <div className='border border-dark pb-4'>
          <div className='pb-2'>
            <h2 className='ms-3'>Song detail</h2>
            <hr />
            <p id="name" className='fw-bolder ms-5'>Name: {name.replace(".mp3","")}</p>
            <p id="genre" className='fw-bolder ms-5'>Genre: {genre}</p>
            <p className='fw-bolder ms-5'>Last update: {dateUpdate === 'null' ? "no update":`${dateUpdate}`}</p>
          </div>
          <div className='btn-edit-delete-playMusic pe-5'>
            
            <Link to={`/EditMusic/${fileName}/${id}/${genre}/${dateUpdate}/${dateCreate}/${name}`}
            className='btn btn-primary btn-edit-playMusic'>Edit</Link>
            <button onClick={e => handlerClickDelSong(e)}
             className='btn btn-danger btn-delete-playMusic ms-4'>delete</button>
          </div>
        </div>
     </div>

     
   )

   
}
  
export default PlayMusic;

/*

 <audio controls id="audio">
                <source src={audio} type='audio/mp3' id="srcAudioDataBase"></source>
            </audio>

*/


