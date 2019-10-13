import React from 'react';
import { useSelector } from 'react-redux';

const View = (props) => {

    const dataTable = useSelector(state => state.dataTable.payload);
    const idItem = props.location.state;
    const item = dataTable.find((item) => (item.id === idItem));

  return (
    <main className="view-page">
        
     <div className="nav"><button onClick={() => props.history.push('/')}>Back</button></div>
     <div className="view-page-inner">
         <span className="view-label">ID</span>   
         <span className="view-value">{item.id}</span>    
         <span className="view-label">Name</span>   
         <span className="view-value">{item.name}</span>
         <span className="view-label">Surname</span>   
         <span className="view-value">{item.surname}</span>  
         <span className="view-label">Gender</span>   
         <span className="view-value">{item.gender}</span>  
         <span className="view-label">Birth date</span>   
         <span className="view-value">{item.birthday}</span>  
         <span className="view-label">Student</span>   
         <span className="view-value">{(item.isStudent) ? 'Yes' : 'No'}</span> 
         <span className="view-label">Created</span>   
         <span className="view-value">{item.created}</span>  
         <span className="view-label">Last edit</span>   
         <span className="view-value">{item.lastEdit}</span>  
     </div>

    </main>
  );

}

export default View;