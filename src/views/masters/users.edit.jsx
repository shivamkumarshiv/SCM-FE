import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box, Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import api from './../../utils/apiService';
import { gridSpacing } from 'store/constant';

const EditUsers = ({ ...others }) => {
  const theme = useTheme();
  const { id: userId } = useParams();
  const [teacherData, setTeacherData] = useState({
    userName: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobile: '',
    email: '',
    address: ''
  });

  const Title = userId ? 'Edit Teacher' : 'Add Teacher';

  useEffect(() => {
    if (userId) {
      fetchTeacherData(userId);
    }
  }, [userId]);

  const fetchTeacherData = async (id) => {
    try {
      const response = await api.get(`/teacher/getbyid?id=${id}`);
      setTeacherData(response.data);
    } catch (error) {
      console.error('Failed to fetch teacher data:', error);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const userData = { ...values, id: teacherData.id, type: 'teacher' };
    try {
      const response = await api.put(`/teacher/update`, userData);
      setTeacherData(response.data);
      setSubmitting(false);
      console.log('User updated:', response.data);
    } catch (error) {
      console.error('Failed to update teacher data:', error);
    }
  };

  return (
    <MainCard title={Title} >
      <Formik
        enableReinitialize
        initialValues={teacherData}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={gridSpacing}>
              {/* User Name */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="teacher-user-name">User Name</InputLabel>
                  <OutlinedInput
                    id="teacher-user-name"
                    name="userName"
                    value={values.userName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="User Name"
                  />
                  {touched.userName && errors.userName && (
                    <FormHelperText error>{errors.userName}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Password */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="teacher-password">Password</InputLabel>
                  <OutlinedInput
                    id="teacher-password"
                    name="password"
                    type="text"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="teacher-first-name">First Name</InputLabel>
                  <OutlinedInput
                    id="teacher-first-name"
                    name="firstName"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="First Name"
                  />
                </FormControl>
              </Grid>

              {/* Middle Name */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="teacher-middle-name">Middle Name</InputLabel>
                  <OutlinedInput
                    id="teacher-middle-name"
                    name="middleName"
                    value={values.middleName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Middle Name"
                  />
                </FormControl>
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="teacher-last-name">Last Name</InputLabel>
                  <OutlinedInput
                    id="teacher-last-name"
                    name="lastName"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Last Name"
                  />
                </FormControl>
              </Grid>

              {/* Mobile No */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="teacher-mobile-no">Mobile No</InputLabel>
                  <OutlinedInput
                    id="teacher-mobile-no"
                    name="mobile"
                    value={values.mobile}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Mobile No"
                  />
                </FormControl>
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="teacher-email">Email</InputLabel>
                  <OutlinedInput
                    id="teacher-email"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Email"
                  />
                </FormControl>
              </Grid>

              {/* Address */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="teacher-address">Address</InputLabel>
                  <OutlinedInput
                    id="teacher-address"
                    name="address"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Address"
                  />
                </FormControl>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Save
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

export default EditUsers;