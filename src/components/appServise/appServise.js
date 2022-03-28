import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const AppServise = () => {
    const { serviseID } = useParams();
    const [loading, setLoading] = useState(false);
    const [servise, setServise] = useState([]);
    const [account, setAccount] = useState('');
    const [ammount, setAmmount] = useState();
    const [txn, setTxn] = useState('');
    const [accountDirty, setAccountDirty] = useState(false);
    const [ammountDirty, setAmmountDirty] = useState(false);
    const [txnDirty, setTxnDirty] = useState(false);
    const [errAccount, setErrAccount] = useState('Номер телефона не может быть путым');
    const [errAmmount, setErrAmmount] = useState('Сумма не может быть путым');
    const [errTxn, setErrTxn] = useState('Поле сообщения не может быть путым');
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

    const accountHandler = (e) => {
        setAccount(e.target.value);
        const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (reg.test(!reg.test(e.target.value).toLowerCase())) {
            setErrAccount('Некорректный номер');
        } else {
            setErrAccount('');
        }
    };

    const ammountHandler = (e) => {
        setAmmount(e.target.value);
    };

    const txnHandler = (e) => {
        setTxn(e.target.value);
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

    const View = () => {
        if(loading == true){
            return (
                <form className="form">
                     <div className="servise">
                           <div className="servise__discrition">
                                <h3 className="servise__title">{servise.title}</h3>
                               <img className="servise__image" src={servise.picture_url} alt={servise.title}/>
                            </div>
                            {(accountDirty && errAccount) && <div style={{color: 'red'}}>{errAccount}</div>}
                            <input onChange={e =>accountHandler(e)} value={account} name="account" type="text" onBlur={e => blurHandle(e)} className="account"></input>
                            {(ammountDirty && errAmmount) && <div style={{color: 'red'}}>{errAmmount}</div>}
                            <input onChange={e =>ammountHandler(e)} value={ammount} name="ammount" onBlur={e => blurHandle(e)} className="ammount"></input>
                            {(txnDirty && errTxn) && <div style={{color: 'red'}}>{errTxn}</div>}
                            <input onChange={e =>txnHandler(e)} value={txn} name="txn" onBlur={e => blurHandle(e)} className="txn"></input>
                            <button disabled={!formValid} className="btn__submit" type="submit"></button>
                     </div>
                </form>
            )
        } else {
            return(
                <h3>Данный сервис не доступен</h3>
            )
        }
    }

    return (
        <div className="servise">
            <View/>
        </div>
    );
};

export default AppServise;