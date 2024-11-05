import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Button, Checkbox, Paper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Autocomplete } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import api from '../../../utils/apiService';

// Styled component for items
const Item = styled(Paper)(({ theme }) => ({
  display: 'flex',
  backgroundColor: '#D3D3D3',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  position: 'relative',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027'
  })
}));

// Fetcher for API requests
const fetchData = async (endpoint, setter) => {
  try {
    const response = await api.get(endpoint);
    setter(response.data);
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
  }
};

const Attendence = () => {
  const theme = useTheme();

  const [classes, setClasses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendenceData, setAttendenceData] = useState([]);
  const [reqData, setReqData] = useState({
    divisionId: null,
    classId: null,
    subjectId: null,
    date: null
  });

  // Fetch all required data
  useEffect(() => {
    fetchData('/student/getall', setStudents);
    fetchData('/schoolclass/getall', setClasses);
    fetchData('/division/getall', setDivisions);
    fetchData('/subject/getall', setSubjects);
  }, []);

  // Fetch attendance data based on selection
  useEffect(() => {
    const { classId, divisionId, subjectId, date } = reqData;
    if (classId && divisionId && subjectId && date) {
      const url = `/attendance?divisionId=${divisionId}&classId=${classId}&subjectId=${subjectId}&date=${date}`;
      fetchData(url, setAttendenceData);
    }
  }, [reqData]);

  // Handle attendance toggle for students
  const handleToggle = (index) => {
    setStudents((prevStudents) =>
      prevStudents.map((student, idx) => (idx === index ? { ...student, isPresent: !student.isPresent } : student))
    );
  };

  // Handle attendance submission
  const onHandleClickSubmit = async () => {
    const { classId, divisionId, subjectId, date } = reqData;
    if (classId && divisionId && subjectId && date) {
      const mappedStudents = students.map(({ rollno, isPresent, name }) => ({
        studentId: rollno,
        isPresent: !!isPresent,
        studentName: name
      }));

      const payload = {
        attendanceDate: date,
        studentIds: mappedStudents,
        classId: classId,
        divisionId: divisionId,
        teacherId: 1,
        subjectId: subjectId
      };

      try {
        const response = await api.post('/attendance/updateBulk', payload);
        console.log('Attendance updated:', response.data);
      } catch (error) {
        console.error('Failed to update attendance:', error);
      }
    }
  };

  return (
    <MainCard title="Attendance" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
      <Grid container spacing={gridSpacing}>
        {/* Class Selection */}
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            options={classes}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setReqData({ ...reqData, classId: value?.id })}
            renderInput={(params) => <TextField {...params} label="Class" />}
          />
        </Grid>

        {/* Division Selection */}
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            options={divisions}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setReqData({ ...reqData, divisionId: value?.id })}
            renderInput={(params) => <TextField {...params} label="Division" />}
          />
        </Grid>

        {/* Subject Selection */}
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            options={subjects}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setReqData({ ...reqData, subjectId: value?.id })}
            renderInput={(params) => <TextField {...params} label="Subject" />}
          />
        </Grid>

        {/* Date Picker */}
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={reqData.date ? dayjs(reqData.date) : null}
              onChange={(newValue) => setReqData({ ...reqData, date: newValue?.toISOString() })}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        {/* Student Attendance List */}
        <Grid item xs={12}>
          <SubCard title="Class 1">
            <Grid container spacing={gridSpacing}>
              {students.map((student, index) => (
                <Grid item xs={6} md={4} key={student.rollno}>
                  <Item>
                    <Avatar sx={{ bgcolor: '#673ab7', color: '#fff' }}>S</Avatar>
                    <div style={{ paddingLeft: '10px', minWidth: '200px' }}>
                      {student.name}
                      <p style={{ marginTop: 0, marginBottom: 0 }}>Roll No: {student.rollno}</p>
                    </div>
                    <Checkbox
                      edge="end"
                      checked={!!student.isPresent}
                      onChange={() => handleToggle(index)}
                      sx={{ position: 'absolute', right: '22px' }}
                    />
                  </Item>
                </Grid>
              ))}
            </Grid>
          </SubCard>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button variant="contained" sx={{ float: 'right', mt: 1, bgcolor: '#673ab7' }} onClick={onHandleClickSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Attendence;
