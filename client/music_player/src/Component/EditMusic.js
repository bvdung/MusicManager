import React, { useEffect, useState } from 'react';
import {Howl, Howler} from 'howler';
import {useNavigate, useParams} from 'react-router-dom';
import ReactDOM from "react-dom/client";
import {getIdFileSongBySong,getAudioById, deleteSongs, editNameGenreSong } from '../service/song_service';
import "../css/editMusic.css"

function EditMusic() {

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
    "<audio controls>" +
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

  const getCurrentDateMySql = () => {
    let d = new Date()
    let mySqlTimestamp = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        (d.getMinutes()),
        d.getSeconds(),
        d.getMilliseconds()
        ).toISOString().slice(0, 19);
    
    return mySqlTimestamp;
}

  const handlerClickSaveSong = (e) => {
       let inputName =  document.getElementById('inputName');
       let inputGenre = document.getElementById('inputGenre');
       let newName = inputName.value;
       let newGenre = inputGenre.value;
       let dateUpdate = getCurrentDateMySql();
       if(newName !== '' && newGenre !== ''){
            editNameGenreSong(id, newName, newGenre, dateUpdate).then(response => {
                if(response.data === 1){
                    alert("edit thanh cong");
                    navigate(`/`);
                }
            }).catch(error => {
                console.log("error: " + error);
            })
       }
  }

   return (
     <div>
        <h1 className="text-center mb-4">MUSIC MANAGER</h1>
        <div id = "slider"> 
        </div>
        <div id = "audioFile">
         
        </div>
        <div className='border border-dark px-3 py-3'>
          <div >
            <h2>Song detail</h2>
            <hr />
            <div>
              <label forhtml={'inputName'} className='fw-bold me-3'>Name:</label>
              <input type={'text'} id="inputName" className='mb-4'></input>
            </div>
            <div>
              <label forhtml={'inputGenre'} className='fw-bold me-3'>Genre:</label>
              <input type={'text'} id="inputGenre" className='w-50 mb-4'></input>
            </div>
            <p className='fw-bold'>Last update: {dateUpdate === 'null' ? "no update":`${dateUpdate}`}</p>
          </div>
          <div className='text-end'>
            <button onClick={e => handlerClickSaveSong(e)}
             className='btn btn-primary btn-save-edit-song me-4'>Save</button>
            <button onClick={e => handlerClickDelSong(e)}
             className='btn btn-danger btn-delete-edit-song me-5'>Delete</button>
          </div>
        </div>
     </div>

     
   )

   
}
  
export default EditMusic;

/*

 <audio controls id="audio">
                <source src={audio} type='audio/mp3' id="srcAudioDataBase"></source>
            </audio>

*/


