import React from 'react';
import ReactLoading from 'react-loading';
 
const Spinner = ({ type, color }) => (
    <div className="ring-loader" style={{minHeight: "100vh", display: "flex", placeContent: "center"}}>
<ReactLoading className='spinner' type={"spinningBubbles"} color="black" height={'5%'} width={'5%'} />
    </div>
    
);
 
export default Spinner;