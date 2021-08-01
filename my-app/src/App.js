import {useEffect, useState}from 'react';
import ContactForm from './components/ СontactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import {v4 as uuidv4} from 'uuid';

const useLocalStorage = (key, defaultValue, serialize = JSON.stringify, deserialize = JSON.parse) => {
  const [state, setState] = useState(() => {
    return deserialize(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState]

};

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useLocalStorage('filter', '');
  
 const addContact = (name, number) => {
    if (contacts
.find((contact) => contact.name
=== name)) {
     alert(`${name} уже есть в контактах`);
   }
 
      const contact = {
        name,
        number,
        id: uuidv4(),
            };

   setContacts(contacts => [...contacts, contact]);
    
    }



const changeFilter = (filter) => {
setFilter(filter);

};

const getVisibleContacts = () => {
return contacts.filter((contacts)=> contacts.name.toLowerCase().includes(filter.toLowerCase())) 
};

const deleteContact = (contactId) =>{
  setContacts(contacts.filter(contact => contact.id !== contactId))

};


return (
  <div>
    <h1>Phonebook</h1>
    <ContactForm AddContact={addContact} />

    <h2>Contacts</h2>
    {contacts.length > 1 && (
      <Filter value={filter} onChange={changeFilter} />
    )}
    {contacts.length > 0 && (
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact} />
    )}
  </div>
);
};


