import { useRecoilState } from "recoil";
import { allSnippets } from "../../recoilstates/allSnippets";
import { currentSnippet } from "../../recoilstates/currentSnippet";
import type { snippetType } from "@repo/types/apiResponse/snippetsResponseType";
import codeState from "../../recoilstates/currentCode";
import { modalOpen } from "../../recoilstates/modalOpen";


function SnippetDropdown() {

    const [snippets,setSnippets] = useRecoilState<snippetType[]|[]>(allSnippets);
    const [current_snippet,setCurrSnippet] = useRecoilState<snippetType|null>(currentSnippet);
    const [code,setCode] = useRecoilState<string>(codeState);
    const [openModal,setOpenModal] = useRecoilState(modalOpen);

    const handleClicked = (e:React.MouseEvent<HTMLDivElement>,snippet:snippetType)=>{
        e.stopPropagation();
        setCurrSnippet(snippet);
        setCode(snippet.content);
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
                    className={`py-1 hover:bg-gray-700 cursor-pointer  whitespace-nowrap ${current_snippet === snippet ? "bg-gray-800" : ""} `}
                >
                    {snippet.name}
                </div>
            ))}
       </div>
        <div className="flex gap-4 items-center text-blue-600">
            <div className='hover:underline '>View all</div>
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
