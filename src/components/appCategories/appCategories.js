import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import './appCategories.css';

const AppCategories = () => {
    const [servisesList, setServisesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    useEffect(() => {
        getResource(url, setServisesList);
    }, []);

    const url = "https://api.yii2-stage.test.wooppay.com/v1/service-category";

    const getResource = (url, dataSet) => {
        fetch(url)
        .then((response) => {
            if (!response.ok) {
              throw new Error(
                `This is an HTTP error: The status is ${response.status}`
              );
            }
            return response.json();
        })
        .then((data) => dataSet(data))
        .catch((err) => {
            console.log(err);
          });
    };

    const list = servisesList.map(item => {
        return(
            <li key={uuidv4()} id={uuidv4()} data-id={item.id} className="category__list--item">
                <Link to={`/servises/${item.id}`}>
                <h3 className="category__list--item__title">{item.title}</h3>
                <img className="category__list--item__image" src={item.picture_url} alt={item.name} />
                </Link>
            </li>
        )
    });

    return ( 
        <div className="category">
            <ul className="category__list">
                {list}
            </ul>
        </div>
    );
};

export default AppCategories;