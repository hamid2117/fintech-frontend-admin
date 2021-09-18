import UsersIcon from '@material-ui/icons/GroupOutlined'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'
import CommentIcon from '@material-ui/icons/Comment'
import axios from 'axios'

export const Dashboard = [
  {
    id: 1,
    heading: 'Number of Users',
    Icon: UsersIcon,
    btn: 'Show User Details',
    link: '/userlist',
  },

  {
    id: 2,
    link: '/incidentlist',
    heading: 'Number of incidents',
    btn: 'Show Incident Details',
    Icon: CollectionsBookmarkIcon,
  },
  {
    id: 3,
    link: '/feedbacklist',
    heading: 'Number of Feedbacks',
    btn: 'Show Feedback Details',
    Icon: SpeakerNotesIcon,
  },
  {
    id: 4,
    link: '/unverified',
    btn: 'Show Unverified Incident',
    heading: 'Number of Unverified ',
    Icon: NotInterestedIcon,
  },
  {
    id: 5,
    link: '/incidentlist',
    heading: 'Number of Comments',
    btn: 'Show Incident Details',
    Icon: CommentIcon,
  },
]
