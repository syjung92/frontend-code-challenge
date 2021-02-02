import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function searchItem(list, keyword){
    const newList = list.filter(item => {return item.Name.includes(keyword)});
    return newList;
}


const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const Item = ({row}) => {
    return (
        <>
            <li>
                <img src={row.img} alt="" />
                <div className="info">
                    <h1>
                        <span className="hl">{row.Name}</span></h1>
                    {row.Types.map(type => (<span className="type">{type}</span>) )}
                   
                </div>
            </li>
        </>
    )
}

const EmptyItem = () => <>
        <li>
            <img src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png" alt="" />
            <div className="info">
                <h1 className="no-results">
                    No results
                </h1>
            </div>
        </li>
    </>

const App = () => {
    let poketmonList = [];
    const [keyword, setKeyword] = useState('');
    const [list, setList] = useState(poketmonList);
    useEffect(() => {
        // ID로 사용자 요청
        axios.get(URL_PATH)
        // 응답(성공)
        .then(function (response) {
             poketmonList = response.data;
             const newList = searchItem(poketmonList, keyword);
             setList(newList);
        })
    }, [keyword]);

    
    
    return (
            <>
            <label htmlFor="maxCP" className="max-cp">
                <input type="checkbox" id="maxCP"/>
                <small>
                    Maximum Combat Points
                </small>
            </label>
            <input type="text" className="input" placeholder="Pokemon or type" value={keyword} onChange={({ target: { value } }) => setKeyword(value)}/>
            <div className="loader"></div>
            <ul className="suggestions">
                { list.map(row => (<Item key={row.Number} row={row} />) ) } 
            </ul>
        </>
    )
};

export default App;
