import { Outlet } from 'react-router-dom'
import Navbar from '../util-components/others/Navbar'
import CreateSheetModal from '../util-components/sheetComponents/createSheetModal'
import ViewAllSheetsModal from '../util-components/sheetComponents/viewAllSheetsModal'
import EditSheetNameModal from '../util-components/sheetComponents/editSheetNameModal'
import {NotificationPanel} from "../pages/Notification"

function NavbarLayout() {
  return (
    <div className='overflow-hidden min-h-screen bg-black flex flex-col items-center text-white'>
        <Navbar/>
        <div className='' >
            <Outlet/>
        </div>

        <CreateSheetModal/>
        <ViewAllSheetsModal/>
        <EditSheetNameModal/>
        <NotificationPanel/>
    </div>
  )
}

export default NavbarLayout