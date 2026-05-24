import { Outlet } from 'react-router-dom'
import Navbar from '../util-components/others/Navbar'
import CreateSheetModal from '../util-components/sheetComponents/createSheetModal'
import ViewAllSheetsModal from '../util-components/sheetComponents/viewAllSheetsModal'
import EditSheetNameModal from '../util-components/sheetComponents/editSheetNameModal'
import {NotificationPanel} from "../pages/Notification"
import AddOwnQuestionModal from "../util-components/QuestionComponents/AddOwnQuestionComponent"

function NavbarLayout() {
  return (
    <div className='overflow-hidden h-screen  bg-black flex flex-col items-center text-white'>
        <Navbar/>
        <div className='w-screen' >
            <Outlet/>
        </div>

        <CreateSheetModal/>
        <ViewAllSheetsModal/>
        <EditSheetNameModal/>
        <NotificationPanel/>
        <AddOwnQuestionModal/>
    </div>
  )
}

export default NavbarLayout