import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import {Link} from 'react-router-dom';

import AppPaginationServises from "../appPaginationServises/appPaginationServises";

import "./appServises.css";

const AppServises = () => {
    const { categoryID } = useParams();
    const [servisesList, setServisesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(30);
    const [term, setTerm] = useState("");

    useEffect(() => {
        getResource(url, setServisesList);
    }, []);

    const url = `https://api.yii2-stage.test.wooppay.com/v1/service/all?category_id=${categoryID}`;
    const urlPicture = "https://static.test.wooppay.com/service/";
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
        .then((data) => dataSet(data.data))
        .catch((err) => {
            console.log(err);
          });
    };

    const indexOfLastPage = currentPage * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPosts = servisesList.slice(indexOfFirstPage, indexOfLastPage);
    
    
    const items = currentPosts.map(item => {
      return( 
        <li key={uuidv4()} id={uuidv4()} className="servise__list--item">
           <Link to={`/servises/${categoryID}/${item.service_name}`}>
               <h3 className="servise__list--item__title">{item.title}</h3>
               <img className="servise__list--item__image" src={`${urlPicture}${item.picture}`} alt={item.title} />
           </Link>
        </li>
      )
    });

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const filterServises = () => {
      return servisesList.filter((servise) => servise.service_name.toLowerCase().startsWith(term));
    }

    const filters = filterServises();
    const currentServises = filters.slice(indexOfFirstPage, indexOfLastPage);

    const list = currentServises.map(item => {
      return(
        <li key={uuidv4()} id={uuidv4()} className="servise__list--item">
          <Link to={`/servises/${categoryID}/${item.service_name}`}>
            <h3 className="servise__list--item__title">{item.title}</h3>
            <img className="servise__list--item__image" src={`${urlPicture}${item.picture}`} alt={item.title} />
          </Link>
      </li>
      );
    });
    
    const visibleItems = term.length > 0 ? list : items;
    const servisesLength = term.length > 0 ? filters.length : servisesList.length;

     return(
      <div className="servise">
        <input className="servise__input" type="text" placeholder="Поиск сервиса" onChange={e => setTerm(e.target.value)}></input>
        <ul className="servise__list">
          {visibleItems}
        </ul>
        <AppPaginationServises
          postPerPage={postPerPage} 
          totalServises={servisesLength}
          paginate={paginate} />
      </div>
    );
}

export default AppServises;
