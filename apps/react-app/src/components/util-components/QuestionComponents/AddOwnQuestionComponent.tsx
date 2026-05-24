import { useState } from "react";
import { X, FileText, Link2, StickyNote, BookOpen } from "lucide-react";
import { useRecoilState } from "recoil";
import { addOwnQuestionModalState } from "../../../recoilstates/question/questionModalStates";

function AddOwnQuestionModal() {
  const [open, setOpen] = useRecoilState(addOwnQuestionModalState);

  const [form, setForm] = useState({
    title: "",
    statement: "",

    example1Input: "",
    example1Output: "",

    example2Input: "",
    example2Output: "",

    resources: "",
    notes: ""
  });

  const close = () => {
    setOpen(false);

    setForm({
      title: "",
      statement: "",

      example1Input: "",
      example1Output: "",

      example2Input: "",
      example2Output: "",

      resources: "",
      notes: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = () => {
    console.log(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4">

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1120]/95 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,.6)]">

        <div className="absolute top-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400" />

        {/* Header */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">

          <div>
            <h1 className="text-xl font-semibold text-white">
              Create Custom Question
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Add your own problem with resources & notes
            </p>
          </div>

          <button onClick={close} className="h-10 w-10 rounded-full flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.08] transition">
            <X size={18} className="text-gray-400"/>
          </button>

        </div>


        {/* Body */}

        <div className="overflow-y-auto px-8 py-6 pb-32 space-y-6 max-h-[70vh] custom-scrollbar">

          {/* Title */}

          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Question Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Maximum subarray sum"
              className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 focus:bg-white/[0.05] transition"
            />
          </div>


          {/* Statement */}

          <div>

            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <FileText size={15}/>
              Problem Statement
            </label>

            <textarea
              name="statement"
              value={form.statement}
              onChange={handleChange}
              placeholder="Write complete problem statement..."
              className="h-40 resize-none w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
            />

          </div>


          {/* Examples */}

          <div className="space-y-5">

            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-blue-400"/>
              <h3 className="text-gray-200 font-medium">
                Examples
              </h3>
            </div>


            {/* Example 1 */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">

              <p className="text-sm text-gray-400 mb-4">
                Example 1
              </p>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Input
                  </label>

                  <textarea
                    name="example1Input"
                    value={form.example1Input}
                    onChange={handleChange}
                    placeholder="nums = [1,2,3]"
                    className="h-24 resize-none w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Output
                  </label>

                  <textarea
                    name="example1Output"
                    value={form.example1Output}
                    onChange={handleChange}
                    placeholder="6"
                    className="h-24 resize-none w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                  />
                </div>

              </div>

            </div>


            {/* Example 2 */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">

              <p className="text-sm text-gray-400 mb-4">
                Example 2
              </p>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Input
                  </label>

                  <textarea
                    name="example2Input"
                    value={form.example2Input}
                    onChange={handleChange}
                    placeholder="nums=[-1,-2]"
                    className="h-24 resize-none w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Output
                  </label>

                  <textarea
                    name="example2Output"
                    value={form.example2Output}
                    onChange={handleChange}
                    placeholder="-1"
                    className="h-24 resize-none w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                  />
                </div>

              </div>

            </div>

          </div>


          {/* Resources */}

          <div>

            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Link2 size={15}/>
              Resources
            </label>

            <textarea
              name="resources"
              value={form.resources}
              onChange={handleChange}
              placeholder="Youtube links, article links..."
              className="h-24 resize-none w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
            />

          </div>


          {/* Notes */}

          <div>

            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <StickyNote size={15}/>
              Personal Notes
            </label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Observations, tricks, approach..."
              className="h-32 resize-none w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
            />

          </div>

        </div>


        {/* Footer */}

        <div className="absolute bottom-0 left-0 w-full px-8 py-5 border-t border-white/5 bg-[#0b1120] flex justify-end gap-3">

          <button onClick={close} className="px-5 py-2.5 rounded-xl bg-white/[0.05] text-gray-300 hover:bg-white/[0.08] transition">
            Cancel
          </button>

          <button onClick={handleSubmit} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-[1.02] transition text-white font-medium shadow-lg shadow-blue-500/20">
            Create Question
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddOwnQuestionModal;