import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loggedUser, deleteItem, setFilterItems } from '../../redux/actions';

import Modal from './Modal';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MainArea = (props) => {

  // Redux states
  const user = useSelector(state => state.loggedUser);
  const dataTable = useSelector(state => state.dataTable);
  const filters = useSelector(state => state.filters);
  const dataFiltred = useSelector(state => state.dataFiltred);
  const dispatch = useDispatch();

  // Hooks state
  const [visibleFilter, setVisibleFilter] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    name: false,
    surname: false,
    gender: false,
    isStudent: false,
    birthday: false,
    created: false,
    lastEdit: false,
  });
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');

  // Handles 
  const handleModalDeleteHide = () => {
    setModalDeleteShow(false);
  };

  const handleDeleteItem = () => {
    setModalDeleteShow(false);
    dispatch(deleteItem(itemToDelete));

  }

  const handleModalDeleteShow = (id) => {
    setModalDeleteShow(true);
    setItemToDelete(id);
  };
  
  const handleFiltersShow = (key) => {
    if (visibleFilter === key) setVisibleFilter(null); else setVisibleFilter(key); 
   };

  const handleOnSearch = (event) => {
    const value = (event.target.value) ? (event.target.value) : null;
    let newFilter = filters;
    newFilter[visibleFilter] = { ...newFilter[visibleFilter], search: value };
    dispatch(setFilterItems( newFilter, dataTable ));
    checkActiveFilters();
  }

  const handleOnSort = (direction) => {
    let newFilter = filters;
    for (let key in newFilter) { newFilter[key] = {...newFilter[key], sort: null} };
    newFilter[visibleFilter] = { ...newFilter[visibleFilter], sort: direction };
    dispatch(setFilterItems( newFilter, dataTable ));
    checkActiveFilters();
  }

  const handleOnCategory = (event) => {
    const key = event.target.name;
    let value = (event.target.value !== 'All' && event.target.value !== "null") ? (event.target.value) : null;
    if (key === "isStudent" && value !== null)
        value = (value === "true") ? (true) : (false);
    let newFilter = filters;
    newFilter[visibleFilter] = { ...newFilter[visibleFilter], category: value };
    dispatch(setFilterItems( newFilter, dataTable ));
    checkActiveFilters();

  }

  const handleOnDate = (date, name ) => {
    const key = name
    const value = date;
    let newFilter = filters;
    newFilter[visibleFilter] = { ...newFilter[visibleFilter], [key]: value };
    dispatch(setFilterItems( newFilter, dataTable ));
    checkActiveFilters();
  }

  const checkActiveFilters = () => {
    let new_state = {};
    let active;
    for (let column in filters) {
      active = false;
      for (let key in filters[column]) {
        if (filters[column][key] != null) {
          active = true;
          break;
        } 
      };    
      new_state = {...new_state , [column] : active} 
    }
    setActiveFilters(prevState => {
       return { ...prevState,  ...new_state}; 
    });  
  }
  
  useEffect(() => {   
    dispatch(setFilterItems( filters, dataTable ));
    checkActiveFilters(); 
  }, [dataTable])

  // Renders
  const FilterText = () => (
      <div className="modal-filter">

         <label  style={(filters[visibleFilter].search) ? {color: "#dc3e19"} : {}} >
            Filter:<input autoFocus type="text" value={(filters[visibleFilter].search !== null) ? filters[visibleFilter].search : ''} onChange={handleOnSearch}/>
         </label> 

        <div>Sort:
          <span 
            style={(filters[visibleFilter].sort === "DESC") ? {color: "#dc3e19"} : {}} 
            onClick={() => handleOnSort("DESC")}
          >▼</span>
          <span 
            style={(filters[visibleFilter].sort === "ASC") ? {color: "#dc3e19"} : {}} 
            onClick={() => handleOnSort("ASC")}
          >▲</span>
        </div>

      </div>
  );

  const FilterDate = () => (
    <div className="modal-filter">

       <div className="date-container">
         <label style={(filters[visibleFilter].from) ? {color: "#dc3e19"} : {}} ><p>From:</p>
          <DatePicker
            placeholderText="Please select..."
            selected={
              (filters[visibleFilter].from) ? 
              new Date(filters[visibleFilter].from) : null
            } 
            dateFormat="dd.MM.yyyy"
            onChange={(date) => handleOnDate(date, "from")}
            isClearable
          />
         </label>
         <label style={(filters[visibleFilter].to) ? {color: "#dc3e19"} : {}} ><p>To:</p>
          <DatePicker
            placeholderText="Please select..."
            selected={
              (filters[visibleFilter].to) ? 
              new Date(filters[visibleFilter].to) : null
            } 
            dateFormat="dd.MM.yyyy"
            onChange={(date) => handleOnDate(date, "to")}
            isClearable
          />
         </label>
       </div>  

      <div>Sort:
        <span 
          style={(filters[visibleFilter].sort === "DESC") ? {color: "#dc3e19"} : {}} 
          onClick={() => handleOnSort("DESC")}
        >▼</span>
        <span 
          style={(filters[visibleFilter].sort === "ASC") ? {color: "#dc3e19"} : {}} 
          onClick={() => handleOnSort("ASC")}
        >▲</span>
      </div>

    </div>
  );

  const FilterCategory = () => (
    <div className="modal-filter">

      {(visibleFilter === "gender") && (
        <label style={(filters[visibleFilter].category) ? {color: "#dc3e19"} : {}}>
          Filter:
          <select 
            className="filter-select" 
            defaultValue="null"
            name="gender" 
            value={filters[visibleFilter].category} 
            onChange={handleOnCategory}
          >
             <option value="null" >All</option>
             <option value="Male">Male</option>
             <option value="Female">Female</option>
         </select>
       </label>
       )}

      {(visibleFilter === "isStudent") && (
       <label style={(filters[visibleFilter].category) ? {color: "#dc3e19"} : {}}>
          Filter:
          <select 
            className="filter-select" 
            defaultValue="null"
            name="isStudent" 
            value={filters[visibleFilter].category} 
            onChange={handleOnCategory}
          >
             <option value="null" >All</option>
             <option value={true}>Yes</option>
             <option value={false}>No</option>
         </select>
       </label>  
      )}

      <div>Sort:
        <span 
          style={(filters[visibleFilter].sort === "DESC") ? {color: "#dc3e19"} : {}} 
          onClick={() => handleOnSort("DESC")}
        >▼</span>
        <span 
          style={(filters[visibleFilter].sort === "ASC") ? {color: "#dc3e19"} : {}} 
          onClick={() => handleOnSort("ASC")}
        >▲</span>
      </div>

    </div>
  );

  const renderTableItems = (item) => (
      <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.surname}</td>
      <td>{item.gender}</td>
      <td>{item.birthday}</td>
      <td>{(item.isStudent) ? 'Yes' : 'No'}</td>
      <td>{item.created}</td>
      <td>{item.lastEdit}</td>
      <td>
        <button onClick={() => props.history.push({ pathname: '/view', state: item.id })}>View</button>
        <button onClick={() => props.history.push({ pathname: '/edit', state: item.id })}>Edit</button>
        <button onClick={() => handleModalDeleteShow(item.id)}>Delete</button>
      </td>
      </tr>
    )


  const TableStudents = () => (
    <table className="main-table">

    <thead>
   
      <tr>
        <th>Name
          <span 
            className="filter-icon" 
            onClick={() => handleFiltersShow("name")}
            style={(activeFilters["name"] === true) ? {color: "#dc3e19"} : {}}
            >
            ☵ 
          </span>
          {(visibleFilter === "name") && (<FilterText />)}
        </th>
        <th>Surname
          <span 
            className="filter-icon" 
            onClick={() => handleFiltersShow("surname")}
            style={(activeFilters["surname"] === true) ? {color: "#dc3e19"} : {}}
            >
            ☵ 
          </span>
          {(visibleFilter === "surname") && (<FilterText />) }
        </th>
        <th>Gender
          <span 
            className="filter-icon" 
            onClick={() => handleFiltersShow("gender")}
            style={(activeFilters["gender"] === true) ? {color: "#dc3e19"} : {}}
            >
            ☵ 
          </span>
          {(visibleFilter === "gender") && (<FilterCategory />) }
        </th>
        <th>Birth date
        <span 
            className="filter-icon" 
            onClick={() => handleFiltersShow("birthday")}
            style={(activeFilters["birthday"] === true) ? {color: "#dc3e19"} : {}}
            >
            ☵ 
          </span>
          {(visibleFilter === "birthday") && (<FilterDate />) }
        </th>
        <th>Student
          <span 
            className="filter-icon" 
            onClick={() => handleFiltersShow("isStudent")}
            style={(activeFilters["isStudent"] === true) ? {color: "#dc3e19"} : {}}
            >
            ☵ 
          </span>
          {(visibleFilter === "isStudent") && (<FilterCategory />) }          
        </th>
        <th>Created
          <span 
            className="filter-icon" 
            onClick={() => handleFiltersShow("created")}
            style={(activeFilters["created"] === true) ? {color: "#dc3e19"} : {}}
            >
            ☵ 
          </span>
          {(visibleFilter === "created") && (<FilterDate />) }
        </th>
        <th>Last edit
          <span 
            className="filter-icon" 
            onClick={() => handleFiltersShow("lastEdit")}
            style={(activeFilters["lastEdit"] === true) ? {color: "#dc3e19"} : {}}
            >
            ☵ 
          </span>
          {(visibleFilter === "lastEdit") && (<FilterDate />) }
        </th>
        <th>Actions</th>
      </tr>
    </thead>

        {(Object.keys(dataFiltred).length > 0 && dataFiltred.payload.length > 0) ? 
          (<tbody>{dataFiltred.payload.map(renderTableItems)}</tbody>) :
          (<tbody><tr><td><h1 className="noresult">No result</h1></td></tr></tbody>)
        } 

   </table> 
  )

  return (
    <main className="page">

      <div className="page-head"> 
        <div className="logo">The Classroom<sup>TM</sup></div>
        <div className="logout">
          <span>Hello, {user.userName}</span>
          <button onClick={() => dispatch(loggedUser())}>Log out</button>
        </div>
      </div>

      <div className="page-body">

        <div className="content">

        <div className="top-menu">
          <button onClick={() => props.history.push('/new')}>New student</button>
        </div>

        <TableStudents />
        
      </div>

      <Modal show={modalDeleteShow} handleClose={handleModalDeleteHide}>
          <div className="condition-form">
            <span>Are you sure you want to delete this student?</span>
            <div>
              <button onClick={handleDeleteItem}>Delete</button>
							<button onClick={handleModalDeleteHide}>Cancel</button>
            </div>
          </div>
      </Modal>
      </div>
    </main>
  );

}

export default MainArea;