
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {addSong } from "../service/song_service";
import "../css/addSong.css";

const AddSong = () => {
   
    const [name, setName] = useState("");

    const [category, setCategory] = useState("");

    const [fileName, setFile] = useState("");

    const [fileType, setFileType] = useState("");

    const [data, setArrayData] = useState(null);

    let navigate = useNavigate();

    var isSaving = true;

    const changeHanderChooserFile = (e) => {
        let fileName = e.target.files[0].name;
        e.preventDefault();
        setFile(fileName);
        setFileType(e.target.files[0]['type']);
        let reader = new FileReader();
        let fileByteArray = [];
        reader.readAsArrayBuffer(e.target.files[0]);

        reader.onload = (evt) => {
            if (evt.target.readyState === FileReader.DONE) {
              let arrayBuffer = evt.target.result;
              let array = new Uint8Array(arrayBuffer);
              for (let a of array) {
                fileByteArray.push(a);
              }
              setArrayData(fileByteArray);
            }
        }
    }

    const changeHanderName = (e) => {
        let word = e.target.value;
        setName(word);
    }

    const changeHanderCategory = (e) => {
        let word = e.target.value;
        setCategory(word);
    }

    useEffect(()=> {
        console.log("file in state:" + fileName)
        if(name == ""){
            setName(fileName);
        }
    }, [fileName])

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

    const saveSingleSong = () => {
        let dateCreate = getCurrentDateMySql();
        let dataUpdate = null;
        let fileSong =  {fileName, fileType, data};
        let song = {name, category, fileName, dateCreate, dataUpdate, fileSong};
        console.log(song);
        if(name.length == 0 || category.length == 0 || fileName.length == 0){
            alert("Lack some information, please fill up into the field");
        }else if(data == null){
            alert("Song is loading, please wait int few seconds");
        }else if(isSaving === false){
            alert("System is saving song, please wait");
        }else{
            isSaving = false;
            addSong(song)
            .then(response => {
                alert("add song success");
                isSaving = true;
                navigate("/");
            }).catch(error => {
                alert("fail in add song, error:" + error);
            });
        }
        
    }

    return (
        <div>
            <h1 className="text-center mb-4">MUSIC MANAGER</h1>
            <div className="border border-dark px-4 py-4">
                <h1>Add Song</h1>
                <hr />
                
                <div className="mb-4">
                    <label htmlFor="name_song" className="fw-bold">Name:</label>
                    <input type="text" name="name_song" id="name_song" 
                    value={name} onChange={changeHanderName}
                    className='ms-3 input-name_add-song'></input>
                </div>

                <div className="mb-4">
                    <label htmlFor="Category_song" className="fw-bold">Genre:</label>
                    <input type="text" name="Category_song" id="Category_song"
                    value={category} onChange={changeHanderCategory}
                    className='w-50 ms-3'></input>
                </div>
                <div>
                    <input type="file" id="fileUpload" onChange={changeHanderChooserFile}
                    className='fw-bold btn btn-danger' required/>
                </div>
                <div className="text-end">
                    <button onClick={saveSingleSong} className='btn btn-primary btnAdd me-5'>Add</button>
                </div>
            </div>
        </div>
    );

}



export default AddSong;