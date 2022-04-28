import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import observable from './ObserverPattern/Observer'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  toast(data, {
    position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: false,
    autoClose: 2000
  })
}

observable.subscribe(logger);
observable.subscribe(toastify);

function handleClick() {
  observable.notify("User clicked a button")
}

function handleToggle() {
  observable.notify("User toggled switch")
}
function AppObserver() {

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>Click me!</Button>
      <FormControlLabel control={<Switch name="" onChange={handleToggle} />} label="Toggle me!" />
      <ToastContainer />
    </div>
  );
}

export default AppObserver;
