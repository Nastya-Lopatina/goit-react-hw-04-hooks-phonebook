import {useState} from 'react';
import PropTypes from 'prop-types';
import style from '../styles/ContactForm..module.css'

export default function ContactForm ({AddContact}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
const handleChange =(e) => {
    const {name,value} = e.target;
    switch (name) {
        case 'name': setName(value);
            break;
        
        case 'number': setNumber(value);
            break;
        
        default: return;
   }
};

const handleSubmit = (e) => {
    e.preventDefault();
    
    AddContact(name,number);
    setName('');
    setNumber('');
};


    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <label className={style.label}>
                Name
                <input
                    className={style.input}
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
            </label>
            <label className={style.label}>
                Number
                <input
                    className={style.input}
                     type="tel"
                     name="number"
                     value={number}
                     onChange={handleChange}
                />
            </label>
            <button className={style.button} type="submit">
                Добавить контакт
            </button>
        </form>
    );


};

    ContactForm.propTypes = {
        AddContact: PropTypes.func.isRequired,
      };