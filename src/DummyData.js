import UsersIcon from '@material-ui/icons/GroupOutlined'
import DashboardIcon from '@material-ui/icons/DashboardOutlined'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'

export const Sidebar = [
  // {
  //   id: 1,
  //   link: '/dashboard',
  //   heading: 'Dashboard',
  //   Icon: DashboardIcon,
  // },
  {
    id: 2,
    link: '/userlist',
    heading: 'Userlist ',
    Icon: UsersIcon,
  },
  // {
  //   id: 3,
  //   link: '/incidentlist',
  //   heading: 'Incident',
  //   Icon: CollectionsBookmarkIcon,
  // },
  // {
  //   id: 4,
  //   link: '/feedbacklist',
  //   heading: 'Feedback',
  //   Icon: SpeakerNotesIcon,
  // },
  // {
  //   id: 5,
  //   link: '/unverified',
  //   heading: 'Unverified',
  //   Icon: NotInterestedIcon,
  // },
]

export const rows = [
  {
    isAdmin: false,
    _id: '1212121',
    name: 'Ahmed Ali ',
    email: 'hamid@gmail.com',
    createdAt: '12-6-2021',
    city: 'Islamabad',
  },
]

export const courseData = [
  {
    _id: '1212121',
    address: 'rawalpindi plaza',
    createdAt: '12-6-2021',
    charges: '2000 rs',
    contact: '03121302839',
    instructor: '6128b7ddd60a70069c898138',
    coursetitle: 'Best Course ever build',
    coursedescription: 'Best Course ever build',
    instructordescription: 'Best Instructor ever build',
    endtime: '18:00',
    starttime: '15:00',
    gymname: 'bahadur gym',
    lecturelink: 'https://meet.google.com/',
    location: 'alsdkfjaslkd;fj;aslkdfj',
    maxstudents: '80',
  },
]
export const incidentData = [
  {
    _id: '1212121',
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
    status: 'verified',
    createdAt: '12-6-2021',
    files: [
      {
        type: 'image',
        path: '93cb7734-cf7f-43cd-b387-e3d1cdcd1aa0.jpeg',
      },
    ],
    type: 'Crime',
    title: 'testing',
    description: 'Testing this incident.',
  },
]

export const feedbackData = [
  {
    _id: '1212121',
    createdAt: '12-12-2021',
    user: {
      firstName: 'Hamza',
      lastName: 'Ali',
    },
    createdAt: '12-6-2021',
    updatedAt: '12-6-2021',
  },
]
