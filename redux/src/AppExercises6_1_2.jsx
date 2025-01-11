import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

 const App = () =>{

  const dispatch = useDispatch();
  const good = useSelector((state) => state.good);
  const bad = useSelector((state) => state.bad);
  const ok = useSelector((state) => state.ok);

  const handleGood = () => {
    dispatch({ type: 'GOOD' });
  }

  const handleOk = () => {
    dispatch({ type: 'OK' });
  }


  const handleBad = () => {
    dispatch({ type: 'BAD' });
  }

  const handleReset = () => {
    dispatch({ type: 'ZERO' });
  }

  return(
      <div>
        <button onClick={handleGood}>good</button> 
        <button onClick={handleOk}>ok</button> 
        <button onClick={handleBad}>bad</button> 
        <button onClick={handleReset}>0</button> 
        
        <div>good: {good}</div>
        <div>ok: {ok}</div>
        <div>bad: {bad}</div>
      </div>
    )
  }
  
export default App
