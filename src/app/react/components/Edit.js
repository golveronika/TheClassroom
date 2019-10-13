import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editItem } from '../../redux/actions';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Edit = (props) => {

    // Redux and Route state
    const dispatch = useDispatch();
    const dataTable = useSelector(state => state.dataTable.payload);
    const idItem = props.location.state;

    // Hooks state
    const [item, setItem] = useState(dataTable.find((item) => (item.id === idItem)));

    const [birthday, setBirthday] = useState(new Date(
        item.birthday.split(".")[2],
        (+item.birthday.split(".")[1] - 1),
        item.birthday.split(".")[0]
    ));

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

        const rightNow = new Date();
        const edited_item = {...item, ...{
            birthday: birthday
                        .toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
                        .replace(/(\d+)\/(\d+)\/(\d+)/, '$2.$1.$3'),
            lastEdit: rightNow
                        .toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
                        .replace(/(\d+)\/(\d+)\/(\d+)/, '$2.$1.$3'),
        } };
  
       dispatch(editItem(idItem, edited_item));
       props.history.push('/');

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
         <select name="gender" value={item.gender} onChange={handleOnItemChange}>
             <option value="Male">Male</option>
             <option value="Female">Female</option>
         </select>

         <span className="view-label">Birth date</span>   
         <DatePicker
            selected={birthday}
            dateFormat="dd.MM.yyyy"
            onChange={date => setBirthday(date)}
         />

         <span className="view-label">Student</span>   
         <select name="isStudent" value={item.isStudent} onChange={handleOnItemChange}>
             <option value={true}>Yes</option>
             <option value={false}>No</option>
         </select>

         <button className="save">Save</button>

     </div>

    </form>
  );

}

export default Edit;