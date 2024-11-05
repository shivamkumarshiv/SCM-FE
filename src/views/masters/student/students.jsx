import { useNavigate } from "react-router-dom";
// material-ui
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
//import Link from '@mui/material/Link';
//import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';

import api from "../../../utils/apiService"
import { useEffect, useState } from "react";

const columns = [
  { field: 'rollno', headerName: 'Roll No', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 150,
    editable: true
  },
  {
    field: 'mobile',
    headerName: 'Mobile Number',
    width: 110,
    editable: true
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 110,
    editable: true
  },
  {
    field: 'userName',
    headerName: 'User Name',
    width: 110,
    editable: true
  }
];


const ActionWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  padding: '6px 6px'
});
// ==============================|| USERS ||============================== //

const Students = () =>  {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const actionColumn = {
    field: 'actions',
    headerName: 'Actions',
    width: 190,
    minWidth: 190,
    hideable: false,
    renderCell: (params) => {
      return (
        <ActionWrapper>
          <Button
            variant="outlined"
            id="approve_user"
            priority="primary"
            onClick={(e) => navigate(`/masters/institute/edit/${params.row.id}`)}
            disabled={false}
            startIcon={<EditOutlinedIcon />}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            id="reject_user"
            priority="primary"
            onClick={() => alert('Delete button called')}
            disabled={false}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </ActionWrapper>
      );
    }
  };
  useEffect(()=> {
    api.get('/student/getall').then(response => {
      console.log(response.data)
      setStudents(response.data);
    }).catch(err => console.error(err));
  },[]);

  return (
    <MainCard title="Students" secondary={<SecondaryAction icon ={<AddIcon onClick={(e) => navigate(`/masters/student/add`)} />}  />}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={students}
                    columns={[...columns, actionColumn]}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5
                        }
                      }
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                  />
                </Box>
              </Grid>
            </Grid>
          {/* </SubCard> */}
        </Grid>
      </Grid>
    </MainCard>
  )
};

export default Students;
