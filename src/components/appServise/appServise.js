import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import './appServise.css';

const AppServise = () => {
    const { serviseID } = useParams();
    const [servise, setServise] = useState([]);
    const [account, setAccount] = useState('');
    const [ammount, setAmmount] = useState();
    const [txn, setTxn] = useState('');
    const [accountDirty, setAccountDirty] = useState(false);
    const [ammountDirty, setAmmountDirty] = useState(false);
    const [txnDirty, setTxnDirty] = useState(false);
    const [errAccount, setErrAccount] = useState('Номер телефона не может быть пустым');
    const [errAmmount, setErrAmmount] = useState('Сумма не может быть пустым полем');
    const [errTxn, setErrTxn] = useState('Поле сообщения не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    const urlServise = `https://api.yii2-stage.test.wooppay.com/v1/service?service_name=${serviseID}`;

    useEffect(() => {
        getResource(urlServise, setServise);
    }, []);

    useEffect(() => {
        if(errAccount || errAmmount || errTxn){
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [errAccount, errAmmount, errTxn]);

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
        .then((data) => dataSet(data[0]))
        .catch((err) => {
            console.log(err);
          });
    };
    console.log(servise.length);

    const accountHandler = (e) => {
        setAccount(e.target.value);
    };

    const ammountHandler = (e) => {
        setAmmount(e.target.value);

        if (e.target.value < 0){
            setErrAmmount('Сумма должна быть больше 0 и цифрой');
        } else {
            setErrAmmount('');
        }
    };

    const txnHandler = (e) => {
        setTxn(e.target.value);

        if (e.target.value < 8){
            setErrTxn('Слишком короткое сообщение');
        } else {
            setErrTxn('');
        }
    };

    const blurHandle = (e) => {
        switch(e.target.name) {
            case 'account':
                setAccountDirty(true);
                break;
            case 'ammount':
                setAmmountDirty(true);
                break;
            case 'txn':
                setTxnDirty(true);
                break;
        }
    };

    return (
        <div className="servise">
            <form className="form">
                     <div className="servise__inner">
                           <div className="servise__discrition">
                                <h3 className="servise__title">{servise.title}</h3>
                               <img className="servise__image" src={servise.picture_url} alt={servise.title}/>
                            </div>
                            <div className="servise__input">
                                {(accountDirty && errAccount) && <div style={{color: 'red'}}>{errAccount}</div>}
                                <input onChange={e =>accountHandler(e)} value={account} name="account" type="text" onBlur={e => blurHandle(e)} className="account"></input>
                                {(ammountDirty && errAmmount) && <div style={{color: 'red'}}>{errAmmount}</div>}
                                <input onChange={e =>ammountHandler(e)} value={ammount} name="ammount" type="text" onBlur={e => blurHandle(e)} className="ammount"></input>
                                {(txnDirty && errTxn) && <div style={{color: 'red'}}>{errTxn}</div>}
                                <input onChange={e =>txnHandler(e)} value={txn} name="txn" type="text" onBlur={e => blurHandle(e)} className="txn"></input>
                            </div>
                            <button disabled={!formValid} className="btn__submit" type="submit">Потвердить</button>
                     </div>
                </form>
        </div>
    );
};

export default AppServise;