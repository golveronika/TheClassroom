import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loggedUser } from '../../redux/actions';

const LogginForm = (props) => {

  // Redux states
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.loggedUser.isLogged);  
  if (isLogged) props.history.push('/');

  // Hooks states
  const [name, setName] = useState('');
  const [valid, setValid] = useState(true);

  const inputEl = useRef(null);
  
  // Handles
  const handleOnLogin = (e) => {
    e.preventDefault();
    if (name) {
      dispatch(loggedUser(true, name));
      props.history.push('/');
    } else {
      setValid(false);
      inputEl.current.focus();
    }
  }

  const handleOnChangeName = (event) => {
    setName(event.target.value);
    setValid(true);

  }

  return (
    <form className="autorization-form" onSubmit={handleOnLogin}>
      <div className="autorization-form-inner">
        <h1>Hello</h1>
        <label>Please enter your name:
          <input 
            ref={inputEl} 
            autoFocus 
            type="text" 
            value={name} 
            onChange={handleOnChangeName} 
            style={(valid) ? {} : {outlineColor: "#ab150a"}} 
          /> 
        </label>
        <button>Enter</button>
      </div>
    </form>
  ) 
}

export default LogginForm;
