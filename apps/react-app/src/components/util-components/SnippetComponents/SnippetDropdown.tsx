import { useRecoilState, useSetRecoilState } from "recoil";
import { allSnippets } from "../../../recoilstates/snippets/allSnippets";
import { currentSnippet } from "../../../recoilstates/snippets/currentSnippet";
import type { snippetType } from "@repo/types/apiResponse/snippetsResponseType";
import codeState from "../../../recoilstates/editor/currentCode";
import { modalOpen } from "../../../recoilstates/snippets/createSnippetmodalOpen";
import { viewAllSnippetsModalOpen } from "../../../recoilstates/snippets/viewAllSnippetsModalOpen";


function SnippetDropdown() {

    const [snippets,] = useRecoilState<snippetType[]|[]>(allSnippets);
    const [current_snippet,setCurrSnippet] = useRecoilState<snippetType|null>(currentSnippet);
    const [,setCode] = useRecoilState<string>(codeState);
    const [,setOpenModal] = useRecoilState(modalOpen);
    const setViewAllSnippetOpen = useSetRecoilState(viewAllSnippetsModalOpen);

    const handleClicked = (e:React.MouseEvent<HTMLDivElement>,snippet:snippetType)=>{
        e.stopPropagation();
        setCurrSnippet(snippet);
        setCode(snippet.content as string);
        console.log(`Snippet ${snippet.name} selected with content ${snippet.content}`);
    }


  return (
    <div className="flex flex-col min-h-20 min-w-fit max-w-60 px-2 justify-between py-1 ">
       <div className=" flex flex-col w-full ">
             {snippets.map((snippet,i) => (
                <div 
                    onClick={(e)=>handleClicked(e,snippet)}
                    key={i} 
                    title={snippet.name} 
                    className={`py-1 px-3 hover:bg-gray-700 cursor-pointer  whitespace-nowrap ${current_snippet === snippet ? "bg-gray-800" : ""} `}
                >
                    {snippet.name}
                </div>
            ))}
       </div>
        <div className="flex gap-4 items-center text-blue-600">
            <div 
                className='hover:underline '
                onClick={()=>setViewAllSnippetOpen(true)}
            >
                View all
            </div>
            <div 
                className="hover:underline" 
                onClick={()=>setOpenModal(true)}
            >
                Create
            </div>
        </div>
    </div>
  )
}

export default SnippetDropdown
