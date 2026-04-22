import { useRecoilState } from 'recoil'
import { createSheetModalOpen } from '../../../recoilstates/sheet/createSheetModalState'
import { X } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { allSheetsState } from '../../../recoilstates/sheet/allSheetsState';

function CreateSheetModal() {

    const [isOpen, setIsOpen] = useRecoilState(createSheetModalOpen);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [allSheets, setAllSheets] = useRecoilState(allSheetsState);

    const handleCreate = async () => {
        try {
            const response: any = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/sheet/createSheet`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const data = response.data;

            if (data.error) {
                toast.error(data.error);
                return;
            }

            if (data.redirect) {
                navigate(data.redirect);
                return;
            }
            console.log(data.sheet)
            setAllSheets((prev) => [...prev, data.sheet]);
            console.log(allSheets)
            toast.success("Sheet created");
            setIsOpen(false);

        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

            {/* Modal */}
            <div className="w-[90%] max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-6 animate-fadeIn">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">Create New Sheet</h2>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="p-2 rounded-full hover:bg-gray-800 transition"
                    >
                        <X className="text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Enter sheet name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-11 px-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium 
                                   hover:bg-blue-500 active:scale-95 transition"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateSheetModal;