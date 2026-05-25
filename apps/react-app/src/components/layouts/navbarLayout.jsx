import { Outlet } from 'react-router-dom'
import Navbar from '../util-components/others/Navbar'
import CreateSheetModal from '../util-components/sheetComponents/createSheetModal'
import ViewAllSheetsModal from '../util-components/sheetComponents/viewAllSheetsModal'
import EditSheetNameModal from '../util-components/sheetComponents/editSheetNameModal'
import AddOwnQuestionModal from "../util-components/QuestionComponents/AddOwnQuestionComponent"

function NavbarLayout() {
  return (
    <div className='overflow-hidden hide-scrollbar h-full  flex flex-col items-center text-white'>
        <Navbar/>
        <div className='w-full mt-14 min-h-screen overflow-y-scroll hide-scrollbar' >
            <Outlet/>
        </div>

        <CreateSheetModal/>
        <ViewAllSheetsModal/>
        <EditSheetNameModal/>
        <AddOwnQuestionModal/>
    </div>
  )
}

export default NavbarLayout