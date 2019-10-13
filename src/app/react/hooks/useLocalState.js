
export function saveToLocalStorage(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (error) {
      console.log(error);
    }
  }
  
export function LoadFromLocalStorage() {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);    
    } catch (error) {
      console.log(error);
      return undefined;
      
    }
  }
  