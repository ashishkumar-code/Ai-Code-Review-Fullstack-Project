import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import Markdown from "react-markdown";
import HashLoader from "react-spinners/HashLoader";
import { GoogleGenAI } from "@google/genai";



function CodeReviewer() {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ];
  const isLoggedIn = localStorage.getItem('token');
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyBesP1XGdTMci8_Ay5NnXGbiPpQ9UqyDXw",
  });

  const darkSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#1f2937",
      borderColor: state.isFocused ? "#6366f1" : "#374151",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1f2937",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#6366f1"
        : state.isFocused
        ? "#374151"
        : "#1f2937",
      color: "#fff",
    }),
    singleValue: (base) => ({ ...base, color: "#fff" }),
  };

  async function getAiResponse() {
    if (!code.trim()) {
      alert("Please enter code first");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
You are an expert-level software developer.

The following code is written in ${selectedOption.value}:

${code}

Provide:
1. Quality rating
2. Improvements
3. Explanation
4. Bugs
5. Errors
6. Fixes
`,
      });

      setResult(response.text);
    } catch (error) {
      console.error(error);
      setResult("❌ Failed to analyze code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="md:flex md:w-[95%] h-full mx-auto gap-2">
      {/* Editor Section */}
      <div className="md:w-1/2 md:h-[80vh] h-[50%] ">
        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="col-span-2">
            <Select
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              styles={darkSelectStyles}
            />
          </div>

          <button
            className="bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={()=>{
              if(!isLoggedIn){
                return alert("Please Login First !!")
              }
              getAiResponse();
            }}
          >
            Review
          </button>

          <button className="bg-green-500 rounded-md hover:bg-green-600"
          onClick={()=>{
            setCode("")
          }}>
            Clear Code
          </button>
        </div>

        <Editor
          height="100%"
          language={selectedOption.value}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
        />
      </div>

     <div className="md:w-1/2 md:h-[86vh] h-[50%] bg-zinc-900 p-3 flex flex-col">
 
  <div className="border-b border-zinc-700 pb-2 mb-2">
    Response
  </div>


  <div className="flex-1 overflow-y-auto">
    {loading && (
      <div className="flex justify-center items-center h-full">
        <HashLoader color="#800080" />
      </div>
    )}

    {!loading && <Markdown>{result}</Markdown>}
  </div>
</div>
</div>
  );
}

export default CodeReviewer;
