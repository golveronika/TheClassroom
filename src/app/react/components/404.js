import React from 'react';

const NotFound_404 = (props) => {

  return (
    <main className="page-404">
        <div className="error_404">
        <span>404</span>
        <span>Sorry, page not found</span>
        </div>
        <button onClick={() => props.history.push('/')}>GO HOME</button>
    </main>
  );

}

export default NotFound_404;