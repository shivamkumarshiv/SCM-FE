import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Autocomplete,
  Box, Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, TextField
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import api from "../../../utils/apiService"
import { gridSpacing } from 'store/constant';

const EditSchool = ({ ...others }) => {
  const theme = useTheme();
  const { id: schoolId } = useParams();
  const [institues, setInstitues] = useState([]);
  const [schoolData, setSchoolData] = useState({
    name: '',
    instituteId: '',
    address: '',
    mobileNumber: '',
    email: '',
    faxNumber: '',
    code: ''
  });

  const Title = schoolId ? 'Edit School' : 'Add School';

  useEffect(() => {
    if (schoolId) {
      fetchSchoolData(schoolId);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchData('/institute/getall', setInstitues);
  }, []);

  const fetchData = async (endpoint, setter) => {
    try {
      const response = await api.get(endpoint);
      setter(response.data);
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
    }
  };

  const fetchSchoolData = async (id) => {
    try {
      const response = await api.get(`/schoolbranch/getbyid?id=${id}`);
      setSchoolData(response.data);
    } catch (error) {
      console.error('Failed to fetch school data:', error);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(schoolData);
    const schoolDataNew = { ...values, id: schoolData?.id };
    try {
      const response = await api.put(`/schoolbranch/update`, schoolDataNew);
      setSchoolData(response.data);
      setSubmitting(false);
      console.log('school updated:', response.data);
    } catch (error) {
      console.error('Failed to update school data:', error);
    }
  };

  return (
    <MainCard title={Title} >
      <Formik
        enableReinitialize
        initialValues={schoolData}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Name is required'),
          code: Yup.string().max(255).required('Code is required')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={gridSpacing}>
              {/* User Name */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="teacher-user-name">Name</InputLabel>
                  <OutlinedInput
                    id="institute-name"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Name"
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error>{errors.name}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  disablePortal
                  options={institues}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => setSchoolData({ ...schoolData, instituteId: value?.id })}
                  renderInput={(params) => <TextField {...params} label="Class" />}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="institute-address">Address</InputLabel>
                  <OutlinedInput
                    id="institute-address"
                    name="address"
                    type="text"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Address"
                  />
                  {touched.address && errors.address && (
                    <FormHelperText error>{errors.address}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="teacher-first-name">Mobile Number</InputLabel>
                  <OutlinedInput
                    id="mobileNumber"
                    name="mobileNumber"
                    value={values.mobileNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Mobile Number"
                  />
                </FormControl>
              </Grid>

              {/* Middle Name */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="institute-email">Email</InputLabel>
                  <OutlinedInput
                    id="institute-email"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Email"
                  />
                </FormControl>
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="teacher-last-name">Fax Number</InputLabel>
                  <OutlinedInput
                    id="institute-faxNumber"
                    name="faxNumber"
                    value={values.faxNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Fax Number"
                  />
                </FormControl>
              </Grid>

              {/* Mobile No */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="code">Code</InputLabel>
                  <OutlinedInput
                    id="institute-code"
                    name="code"
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Code"
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

export default EditSchool;
