import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { fetchAsyncMovies, fetchAsyncSeries, setSearchText } from '../../features/movies/movieSlice';
import userImg from "../../images/linkedins.png";
import './Header.scss'
import toast, {Toaster} from 'react-hot-toast';

const Header = () => {
    const [term, setTerm] = useState("")
    const dispatch = useDispatch()
    const history = useHistory();
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(e.target.name)
        if (e.target.name!=="anchor"){
            console.log("search")
            dispatch(fetchAsyncMovies(term.trim()))
            dispatch(fetchAsyncSeries(term.trim()))
            dispatch(setSearchText(term.trim()))
            history.push("/home")
        }
    }

    const displayToast = (e) => {
        console.log(e.target)
        e.preventDefault();
        if (e.target.name === "anchor"){
            toast('Connect with me',
                    {
                        icon: '😄',
                        position: "top-right",
                        duration:2000,
                        style: {
                        borderRadius: '10px',
                        background: '#0f171e',
                        color: '#fff',
                        },
                    }
                );
        }

    }

    return (
        <div className="header">
            <Link to="/"><div className='logo'>Movie App</div></Link>

            <div className="search-bar">
                <form disabled onSubmit={submitHandler}>
                    <input type="text"
                            value={term}
                            placeholder="search movies or series"
                            onChange={(e)=>setTerm(e.target.value)}
                    />
                    
                        <button type="submit" name="input">
                        <i className='fa fa-search'></i>
                        </button>
                    
                </form>
            </div>

            <div>
                <Toaster
                    containerStyle={{
                        top: 72,
                        left: 20,
                        bottom: 20,
                        right: 20,
                      }}
                />
                <a 
                    name="anchor"
                    onMouseEnter = {(e) => displayToast(e)} 
                    href="https://www.linkedin.com/in/rishabh-dubey-bb6624140/" target="_blank"
                >
                <img 
                    src={userImg} 
                    className="user-image"
                    alt="user-img" 
                    style={{backgroundColor:"#1a242f"}}></img>   
                </a>
            </div>
        </div>
    );
};

export default Header;