import React, { useRef } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { viewAllSnippetsModalOpen } from '../../recoilstates/viewAllSnippetsModalOpen';
import { SquarePen, Trash } from 'lucide-react';
import { allSnippets } from '../../recoilstates/allSnippets';
import { selectedSnippetId } from '../../recoilstates/selectedSnippetIdstate';
import type { snippetType } from '@repo/types/apiResponse/snippetsResponseType';
import { editSnippetModalOpen } from '../../recoilstates/editSnippetModal';
import { currentSnippet } from '../../recoilstates/currentSnippet';
import axios from 'axios';
import { toast } from 'react-toastify';
import type { basicResponseType } from '@repo/types/apiResponse/basicResponseType';

function ViewAllSnippetsModal() {

    const childRef = useRef<HTMLDivElement | null>(null);
    const setViewSnippetModal = useSetRecoilState(viewAllSnippetsModalOpen);
    const [snippets,setSnippets] = useRecoilState(allSnippets);
    const setSelectedSnippetId = useSetRecoilState(selectedSnippetId);
    const setIsOpenEditSnippetModal = useSetRecoilState(editSnippetModalOpen);
    const setCurrSnippet = useSetRecoilState(currentSnippet);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (childRef.current && !childRef.current.contains(e.target as Node)) {
            setViewSnippetModal(false);
        }
    };

    const handleDelete = async(snippet:snippetType)=>{
        setSelectedSnippetId(snippet.id);

        try{
            const token = localStorage.getItem("token");
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/editor/snippet`,{
                data: { id: snippet.id },
                headers: {
                    Authorization: `Bearer ${token}`,
                },  
            });

            const response = res.data as basicResponseType;
            if(!response.success) throw new Error(response.error || "Failed to delete");

            setSnippets(snippets.filter(s => s.id !== snippet.id));
            toast.success("Snippet deleted");

        }catch(err:unknown){
            if(err instanceof Error) toast.error(err.message);
        }
    }   

    const handleEdit= ( snippet:snippetType )=>{
        setSelectedSnippetId(snippet.id);
        setIsOpenEditSnippetModal(true);
        setCurrSnippet(snippet);
    }

  return (
    <div 
        onClick={handleOutsideClick}
        className='fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50'
    >
        <div 
            ref={childRef}
            className='w-full max-w-lg max-h-[70vh] bg-[#111] rounded-xl shadow-2xl border border-gray-800 flex flex-col'
        >
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-800'>
                <h2 className='text-lg font-semibold'>Your Snippets</h2>
                <button 
                    onClick={()=>setViewSnippetModal(false)}
                    className='text-sm px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition'
                >
                    Close
                </button>
            </div>

            <div className='overflow-y-auto p-4 space-y-2'>
                {snippets.length === 0 ? (
                    <div className='text-center text-gray-400 py-10'>
                        No snippets found
                    </div>
                ) : (
                    snippets.map((snippet) => (
                        <div 
                            key={snippet.id}
                            className='flex items-center justify-between px-4 py-2 rounded-lg border border-gray-800 hover:bg-gray-800/60 transition'
                        >
                            <span className='truncate max-w-[70%]'>
                                {snippet.name}
                            </span>

                            <div className='flex items-center gap-3'>
                                <SquarePen
                                    onClick={()=>handleEdit(snippet)}
                                    className="w-4 h-4 cursor-pointer hover:text-green-400 transition"
                                />
                                <Trash
                                    onClick={()=>handleDelete(snippet)}
                                    className="w-4 h-4 cursor-pointer hover:text-red-400 transition"
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  )
}

export default ViewAllSnippetsModal