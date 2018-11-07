import React from 'react';

const Header = (props) => {
  const handleClick = e => {
    e.preventDefault();
    if (props.history && props.push) {
      props.history.push(props.push);
    }
  };
  if(props.search){
    return (
      <div className="header">
          <p className="logo">
            {props.display}
          </p>
      </div>
    );
  }
  return (
    <div className="header">
        <p className="logo">
          <a onClick={handleClick}>
            <span style={{color: 'white'}} className="fa fa-arrow-left"/>
          </a>
          {`   ${props.display}`}
        </p>
    </div>
  );
};

export default Header;