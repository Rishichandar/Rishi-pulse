import React, { useEffect } from 'react'
import { CheckToken } from '../../HTTPHandler/api';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { authenticate, logout } from '../../Redux/authSlice/AuthSlice';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../../Component/usermenu';

export const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        CheckToken()
          .then((res) => {
            if (res.Status === "Success") {
              dispatch(authenticate({ user: res.Response }));
            } else {
              dispatch(logout());
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
            navigate("/");
          });
      }, []);
  return <><UserMenu/></>
}
