import React, { useState } from 'react'
import { Select, TextField, MenuItem, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

function EditUserSection({ user_id, username, password, email, birth, role }, props) {
  const [userData, setUserData] = useState({
    user_id, username, password, email, birth, role
  });
  const [uploading, setUploading] = useState(false);

  const onUserDataChange = (e) => {
    console.log(userData);
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  }

  const onUserDataClear = (e) => {
    e.preventDefault();
    setUserData(Object.fromEntries(Object.keys(userData).map((key) => [key, ''])));
  }

  const userUpdateHandler = async (event) => {
    event.preventDefault();
    setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user/${userData.user_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        setUploading(false);

        if (response.ok) {
          console.log(userData);
          showSuccessAlert();
        } else {
          console.log("Failed to Update the post");
          showErrorAlert('Update Failed', 'Failed to update the post. Please try again.');
        }
      } catch (error) {
        showErrorAlert('Update Failed', error.message);
      }
    }, 2000);
    setUploading(true);

  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: 'Update Successful',
      text: 'Your post will show up on the main page soon.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  const showErrorAlert = (title, text) => {
    Swal.fire({
      title,
      text,
      icon: 'error',
      timer: 3000,
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className='flex flex-col gap-8'>
      <span className='text-2xl font-bold'>Update User</span>
      <form className='flex flex-col gap-4'>
        <TextField name='user_id' label="User ID" value={userData.user_id} onChange={onUserDataChange} />
        <TextField name='username' label="Username" value={userData.username} onChange={onUserDataChange} />
        <TextField name='password' label="Password" value={userData.password} onChange={onUserDataChange} />
        <TextField name='email' label="Email" value={userData.email} onChange={onUserDataChange} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={dayjs(userData.birth)}
            onChange={(date) => onUserDataChange({ target: { name: 'birth', value: date } })}
          />
        </LocalizationProvider>

        <Select
          name='role'
          value={userData.role}
          label='role'
          onChange={onUserDataChange}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      </form>
      <div className='flex gap-4 justify-center'>
        <Button variant="contained" color='success' onClick={(e) => userUpdateHandler(e)} disabled={uploading}>{uploading ? 'Updating...':'Update'}</Button>
        <Button variant="contained" color='warning' onClick={(e) => onUserDataClear(e)}>Clear</Button>
        <Button variant="contained" color='error' onClick={(e) => {
          e.preventDefault();
          props.onDialogClose;
        }}>Close</Button>
      </div>
    </div>

  )
}

export default EditUserSection