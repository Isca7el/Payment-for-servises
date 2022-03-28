import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const AppServise = () => {
    const { serviseID } = useParams();
    const [loading, setLoading] = useState(false);
    const [servise, setServise] = useState([]);
console.log(serviseID);
    const urlServise = `https://api.yii2-stage.test.wooppay.com/v1/service?service_name=${serviseID}`;

    useEffect(() => {
        getResource(urlServise, setServise);
    }, []);

    const getResource = (url, dataSet) => {
        fetch(url)
        .then((response) => {
            setLoading(true);
            if (!response.ok) {
                setLoading(false);
              throw new Error(
                `This is an HTTP error: The status is ${response.status}`
              );
            }
            return response.json();
        })
        .then((data) => dataSet(data[0]))
        .catch((err) => {
            setLoading(false);
            console.log(err);
          });
    };
    console.log(servise);
    const View = () => {
        if(loading == true){
            return (
                <div className="servise">
                    <h3 className="servise__title">{servise.title}</h3>
                    <img className="servise__image" src={servise.picture_url} alt={servise.title}/>
                </div>
            )
        } else {
            return(
                <h3>Данный сервис не доступен</h3>
            )
        }
    }

    return (
        <div className="servise">
            <h3>Servise</h3>
            <View/>
        </div>
    );
};

export default AppServise;