import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import EditDivision from 'views/masters/division/division.edit';
import Divisions from 'views/masters/division/division';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));


const Users =  Loadable(lazy(() => import('views/masters/users')));
const EditUsers =  Loadable(lazy(() => import('views/masters/users.edit')));

const Institutes =  Loadable(lazy(() => import('views/masters/institute/institutes')));
const EditInstitute =  Loadable(lazy(() => import('views/masters/institute/institute.edit')));

const Schools =  Loadable(lazy(() => import('views/masters/school/schools')));
const EditSchools =  Loadable(lazy(() => import('views/masters/school/school.edit')));



const Students =  Loadable(lazy(() => import('views/masters/student/index')));
const EditStudents =  Loadable(lazy(() => import('views/masters/student/edit')));

const Attendence = Loadable(lazy(() => import('views/masters/attendence')));

const Subjects =  Loadable(lazy(() => import('views/masters/subject/subjects')));
const EditSubject =  Loadable(lazy(() => import('views/masters/subject/subject.edit')));

const division =  Loadable(lazy(() => import('views/masters/division/division')));
const divisionEdit =  Loadable(lazy(() => import('views/masters/division/division.edit')));


// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'masters',
      children: [
        {
          path: 'teachers',
          element: <Users />
        },
        {
          path: 'teachers/edit/:id',
          element: <EditUsers />
        },
        {
          path: 'teachers/add',
          element: <EditUsers />
        },
        {
          path: 'institutes',
          element: <Institutes/>
        },
        {
          path: 'institute/edit/:id',
          element: <EditInstitute/>
        },
        {
          path: 'institute/add',
          element: <EditInstitute/>
        },
        {
          path: 'school/edit/:id',
          element: <EditSchools/>
        },
        {
          path: 'school/add',
          element: <EditSchools/>
        },
        {
          path: 'schools',
          element: <Schools/>
        },
        {
          path: 'division/edit/:id',
          element: <EditDivision/>
        },
        {
          path: 'division/add',
          element: <EditDivision/>
        },
        {
          path: 'divisions',
          element: <Divisions/>
        },
        {
          path: 'students/edit/:id',
          element: <EditStudents />
        },
        {
          path: 'students/add',
          element: <EditStudents />
        },
        {
          path: 'students',
          element: <Students/>
        },
        {
          path: 'attendence',
          element: <Attendence />
        },
        {
          path: 'subjects',
          element: <Subjects/>
        },
        {
          path: 'subject/edit/:id',
          element: <EditSubject/>
        },
        {
          path: 'subject/add',
          element: <EditSubject/>
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        },
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;


