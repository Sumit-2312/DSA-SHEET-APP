import { useRecoilState } from "recoil";
import { allSheetsState } from "../../../recoilstates/sheet/allSheetsState";
import  {viewAllSheetsModalOpen}  from "../../../recoilstates/sheet/viewAllSheetsModalOpenState";
import { X, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { editSheetNameModalOpen } from "../../../recoilstates/sheet/editSheetNameModal";

function ViewAllSheetsModal() {

    const [isOpen, setIsOpen] = useRecoilState(viewAllSheetsModalOpen);
    const [allSheets, setAllSheets] = useRecoilState(allSheetsState);
    const [EditModalState, setEditModalState] = useRecoilState(editSheetNameModalOpen);

    if (!isOpen) return null;

    // DELETE
    const handleDelete = async (id: string) => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/sheet/Sheet`,
                {
                    data: { id },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = res.data;

            if (!data.success) {
                toast.error(data.error);
                return;
            }

            setAllSheets(prev => prev.filter(s => s.id !== id));
            toast.success("Deleted successfully");

        } catch (err: any) {
            toast.error(err.message);
        }
    };

    // EDIT (just placeholder for now)
    const handleEdit = (sheet: any) => {
        setEditModalState({isOpen: true, id: sheet.id, name: sheet.name});
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            {/* Modal */}
            <div className="w-[95%] max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-6 animate-fadeIn">

                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-semibold text-white">
                        All Sheets  
                    </h2>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-full hover:bg-gray-800 transition"
                    >
                        <X className="text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* List */}
                <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-1">

                    {allSheets.length === 0 && (
                        <div className="text-gray-400 text-center py-10">
                            No sheets found
                        </div>
                    )}

                    {allSheets.map((sheet) => (
                        <div
                            key={sheet.id}
                            className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg transition group"
                        >
                            {/* Name */}
                            <div className="text-white font-medium truncate">
                                {sheet.name}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition">

                                {/* Edit */}
                                <button
                                    onClick={() => handleEdit(sheet)}
                                    className="p-2 rounded-md hover:bg-blue-600/20 transition"
                                >
                                    <Pencil className="h-4 w-4 text-blue-400" />
                                </button>

                                {/* Delete */}
                                <button
                                    onClick={() => handleDelete(sheet.id)}
                                    className="p-2 rounded-md hover:bg-red-600/20 transition"
                                >
                                    <Trash2 className="h-4 w-4 text-red-400" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-5 flex justify-end">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ViewAllSheetsModal;