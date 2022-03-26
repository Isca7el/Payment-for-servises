import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const AppServises = () => {
    const { categoryID } = useParams();
    const [servisesList, setServisesList] = useState([]);

    useEffect(() => {
        getResource(url, setServisesList);
    }, []);

    const url = `"https://api.yii2-stage.test.wooppay.com/v1/service/all?category_id=${categoryID}"`;

    const getResource = (url, dataSet) => {
      console.log(url);
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

    console.log(servisesList);
    return(
        <h3>servises {categoryID}</h3>
    );
}

export default AppServises;
