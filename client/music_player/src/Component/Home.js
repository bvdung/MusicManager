
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Link} from 'react-router-dom';
import {deleteSongs, getAllSong, pagination, paginationWithInputSearch} from '../service/song_service';
import { useEffect, useState } from 'react';
import "../css/home.css";

const HomePage = () => {
   

    const [songs, setSong] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [checkedState, setCheckedState] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [selectedItem, setSelectedItem] = useState(0);
    const [valueSearch, setValueSearch] = useState("");
    var isDeleting = true;

    const getSong = () => {
        getAllSong()
        .then((response) =>{
            setSong(response.data);
            
        }).catch((error) => {
            console.log("not get all song, error: " + error);
        })
    }
    
    useEffect(() => {
        if(valueSearch === ''){
            executePagination(pageSize, currentPage);
        }else{
            executePaginationInputSearch(pageSize, currentPage, valueSearch);
        }
    },[pageSize, currentPage])

    useEffect(() => {
        
        let countCheckedItem = 0;
        checkedState.map(item => {
            if(item === true){
                countCheckedItem++;
            }
                
        })

        setSelectedItem(countCheckedItem);
        
    }, [checkedState])

    useEffect(() =>{

        setCheckedState(new Array(songs.length).fill(false)); 
        setTotalItem(songs.length);
    }, [songs])

    const executePagination = (pageSize, currentPage) => {
        pagination(pageSize, currentPage).then(response => {
            setSong(response.data);
        }).catch(error => {
            console.log("error of current page: " + error);
        });
    }

    const selectHandler = (e) => {
        console.log(e.target.value);
        setPageSize(e.target.value);
    }


    const inputNumberHandler = (e) => {
        console.log(e.target.value);
        setCurrentPage(e.target.value);
    }


    const deleteSong = () => {
        const listIdChecked = [];
        checkedState.map((item, index) => {
            if(item === true){
                listIdChecked.push(index);
            }
        });

        if(listIdChecked > 0 && isDeleting === false){
            alert("System is deleting, please wait a few seconds");
        }else if(listIdChecked.length > 0 && isDeleting === true){
            isDeleting = false;
            const listIdSong = [];
            for(let i = 0; i < listIdChecked.length; i++){
                    listIdSong.push(songs[listIdChecked[i]].id);
            }
            console.log(listIdSong);
            deleteSongs(listIdSong).then((response) => {
                alert("delete success");
                isDeleting = true;
                executePagination(pageSize, currentPage);
            }).catch(error => {
                alert("delete fail");
            })
        }else{
            alert("bạn chưa chọn bài hát để xóa");
        }
        
    }

    const addListCheck = (e, position) => {
        const updatedCheckedState = checkedState.map((item, index) => 
            index === position ? !item : item );

        setCheckedState(updatedCheckedState);

        if(e.target.checked === false){
            setCheckAll(false);
        }

    }

    const checkdOfAll = (e) => {
        let check = e.target.checked;
        if(check === true){
            setCheckAll(true);
            setCheckedState(new Array(songs.length).fill(true)); 
            
        }else{
            setCheckAll(false);
            setCheckedState(new Array(songs.length).fill(false)); 
        }
        
    }

    const executePaginationInputSearch = (pageSize, currentPage, valueSearch) => {
        paginationWithInputSearch(pageSize,currentPage, valueSearch).then(response => {
            setSong(response.data);
            console.log("value search: " + valueSearch);
            console.log(response.data);
        }).catch(error => {
            console.log("error pagination with input search: " + error);
        })
        
    }

    const handlerSearch = (e) => {
        setValueSearch(e.target.value);
    }

    const handlerClickSearch = (e) => {
        if(valueSearch !== ''){
            executePaginationInputSearch(pageSize, currentPage, valueSearch);
        }
    }

    return(
        <div>
            <h1 className="text-center">MUSIC MANAGER</h1>
            <div className="container_add_delete_search">
                <div className="add_delete col-6">
                    <Link to = "AddSong" className='btn btn-primary me-3 mb-3 mt-2'>Add Song</Link>
                    <button onClick={deleteSong} className='btn btn-danger mb-3 mt-2'>Delete Song</button>
                </div>
                <div className="form_search col-6">
                    <div className="container_btn-search_input-search">
                        <label htmlFor={'search'} className="lb_ip_search"></label>
                        <input type={'search'} id={'search'} name={'search'}
                        value={valueSearch} onChange={handlerSearch}
                        className="w-75" placeholder="Search Song"></input>
                        <button className="btn btn-warning btn-search btn-sm" onClick={e => handlerClickSearch(e)}>Search</button>
                    </div>
                </div>
    
            </div>
            <div>
                <table className="table table-light table-hover table-bordered mb-4">
                    <thead>
                        <tr>
                            <th className="text-center">
                                <input type={'checkbox'} value={'all'} checked={checkAll}
                                 onChange={checkdOfAll} className="form-check-input"></input>
                            </th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Category</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            songs.map((song, index) => {

                                return(
                                    <tr key={song.id}>
                                        <td className="text-center align-middle"> 
                                            <input type={'checkbox'} value={song.id}
                                            id={song.id} onChange={(e) => addListCheck(e,index)}
                                            checked={checkedState[index]} className="form-check-input ">

                                            </input>
                                         </td>
                                        <td className="align-middle">{song.name.replace(".mp3","")}</td>
                                        <td className="align-middle">{song.category}</td>
                                        <td className="mx-auto container-play-edit-btn">
                                            <Link to={`PlayMusic/${song.fileName}/${song.id}/${song.category}/${song.dateUpdate}/${song.dateCreate}/${song.name}`}
                                            className="btn btn-success me-3 btn-play-home">play</Link>
                                            <Link to={`EditMusic/${song.fileName}/${song.id}/${song.category}/${song.dateUpdate}/${song.dateCreate}/${song.name}`}
                                            className="btn btn-secondary btn-edit-home">edit</Link>
                                        </td>

                                    </tr>
                                )
                                
                            })
                        }
                     </tbody>
                </table>
            </div>
            <div className="pageSize_currentPage">
                <div className="total_selectedItem col-4">
                    <span className="me-5 fw-bold fs-5">total items: {totalItem}</span>
                    <span className="fw-bold fs-5">selected item: {selectedItem}</span>
                </div>
                <div className="col-4 pageSize float-end">
                    <form>
                        <label className="me-1 fw-bold">Page size:</label>
                        <select name='pageSize' id='pageSize' 
                        onChange={selectHandler} value={pageSize}
                        className="form-select form-select-sm mb-3 w-50">
                            <option value={5} defaultValue>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                    </form>
                </div>
                <div className="col-4 currentPage float-end">
                    <form>
                        <label className="me-1 fw-bold">Current Page:</label>
                        <input type='number' id='currentPage' 
                        name='currentPage' min={0} value={currentPage}
                        onChange={inputNumberHandler} className="w-50"></input>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default HomePage;