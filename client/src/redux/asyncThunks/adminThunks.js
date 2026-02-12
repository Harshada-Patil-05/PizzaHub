import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create Thunks

// Login Admin User
export const loginAdmin = createAsyncThunk(
  '/api/admin/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/login`,
        { email, password },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

// Register Admin User
export const registerAdmin = createAsyncThunk(
  '/api/admin/register',
  async ({ name, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/register`,
        { name, email, password, confirmPassword },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

// Admin Update Profile
export const updateAdminProfile = createAsyncThunk(
  '/api/admin/updateProfile',
  async (
    { name, email, password, confirmPassword },
    { rejectWithValue, getState }
  ) => {
    try {
      const {
        admin: { adminUserInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${adminUserInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/profile`,
        { name, email, password, confirmPassword },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

// Admin User Details
export const getAdminUserDetails = createAsyncThunk(
  '/api/admin/userDetails',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        admin: { adminUserInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${adminUserInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/profile`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

// Admin List Users
export const listAdminUsers = createAsyncThunk(
  '/api/admin/listUsers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        admin: { adminUserInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${adminUserInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

// Admin USer Details By ID
export const getAdminUserDetailsById = createAsyncThunk(
  '/api/admin/userDetailsById',
  async (id, { rejectWithValue, getState }) => {
    try {
      const {
        admin: { adminUserInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${adminUserInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/${id}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

// Admin Update User By ID
export const updateAdminUserById = createAsyncThunk(
  '/api/admin/updateUserById',
  async (
    { id, name, email, role, permissions, isApproved },
    { rejectWithValue, getState }
  ) => {
    try {
      const {
        admin: { adminUserInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminUserInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/${id}`,
        { name, email, role, permissions, isApproved },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

// Admin Delete User By ID
export const deleteAdminUserById = createAsyncThunk(
  '/api/admin/deleteUserById',
  async (id, { rejectWithValue, getState }) => {
    try {
      const {
        admin: { adminUserInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${adminUserInfo.token}`,
        },
      };

      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/${id}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);
