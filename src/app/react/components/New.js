import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/actions';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const New = (props) => {

  const dispatch = useDispatch();

  const [item, setItem] = useState({
        id: (Math.random().toString(36)+'00000000000000000').slice(2, 13),
        name: '',
        surname: '',
        gender: null,
        birthday: new Date(),
        isStudent: null,
        created: new Date(),
        lastEdit: new Date(),
    });

    const [birthday, setBirthday] = useState(null);


    // Handles
    const handleOnItemChange = (event) => {
        const key = event.target.name;
        let value = event.target.value;

        if (key === "isStudent")
            value = (value === "true") ? (true) : (false);
    
        setItem(prevState => ({...prevState, [key]: value }));
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (item.gender && (item.isStudent !== null) && birthday) {
            const rightNow = new Date();
            const new_item = {...item, ...{
                birthday: birthday
                            .toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
                            .replace(/(\d+)\/(\d+)\/(\d+)/, '$2.$1.$3'),
                lastEdit: rightNow
                            .toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
                            .replace(/(\d+)\/(\d+)\/(\d+)/, '$2.$1.$3'),
                created: rightNow
                            .toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
                            .replace(/(\d+)\/(\d+)\/(\d+)/, '$2.$1.$3'),
            } };

            dispatch(addItem(new_item));
            props.history.push('/');

        }
    }
 
  return (
    <form className="view-page" onSubmit={handleOnSubmit}>
        <div className="nav"><button onClick={() => props.history.push('/')}>Back</button></div>
        <div className="view-page-inner"> 

         <span className="view-label">Name</span>  
         <input required name="name" type="text" value={item.name} onChange={handleOnItemChange} autoFocus />

         <span className="view-label">Surname</span>   
         <input required name="surname" type="text" value={item.surname} onChange={handleOnItemChange} />

         <span className="view-label">Gender</span>   
         <select defaultValue="null" name="gender" onChange={handleOnItemChange}>
             <option value="null" hidden >Please select...</option>
             <option value="Male">Male</option>
             <option value="Female">Female</option>
         </select>

         <span className="view-label">Birth date</span>   
         <DatePicker
            placeholderText="Please select..."
            selected={birthday}
            dateFormat="dd.MM.yyyy"
            onChange={date => setBirthday(date)}
         />

         <span className="view-label">Student</span>   
         <select defaultValue={null} name="isStudent" onChange={handleOnItemChange}>
             <option value={null} hidden >Please select...</option>
             <option value={true}>Yes</option>
             <option value={false}>No</option>
         </select>

         <button className="save">Add</button>


         </div>
    </form>
  );

}

export default New;