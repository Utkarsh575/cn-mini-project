import Image from "next/image";
import { CodeBlock, atomOneDark, dracula } from "react-code-blocks";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export default function Home() {
  const [comments, setComments] = useState([]);

  const [showAuthor, setShowAuthor] = useState<boolean>(false);
  // const fetchData = async () => {
  //   const url: RequestInfo | URL =
  //     "https://jsonplaceholder.typicode.com/posts/1/comments";
  //   try {
  //     // fetch data
  //     let res = await fetch(url);
  //     res = await res.json();
  //     console.log(res);
  //     setComments(res);
  //   } catch (e) {
  //     //error part
  //     console.log(e);
  //   }
  // };

  const MY_QUERY = gql`
    ${showAuthor ? "{books{id name}}" : "{books{id name, author{name}}}"}
  `;
  const { loading, error, data } = useQuery(MY_QUERY);
  console.log(data);

  const [restBooks, setRestBooks] = useState([]);

  const fetchBooksViaRest = async () => {
    let res = await fetch("http://localhost:5000/rest");
    let data = await res.json();
    console.log(data);
    setRestBooks(data);
  };

  useEffect(() => {
    console.log("useEffect called");
  }, [data, showAuthor, restBooks]);

  return (
    <main
      className={`flex flex-row items-start justify-center w-full p-10 bg-black h-full`}
    >
      <div className="flex justify-between items-start  w-full h-full ">
        <div className="flex flex-col bg-gray-900 items-center justify-center w-[50%] h-full p-10 rounded-l-xl">
          <h1 className="font-bold text-4xl py-2 text-white">
            GraphQL response
          </h1>
          <div className="flex gap-5 mb-2 ">
            <button
              className="px-7 rounded-md py-3 bg-purple-400 shadow-lg hover:bg-purple-500 hover:transition-colors hover:duration-500"
              onClick={() => {
                setShowAuthor(!showAuthor);
              }}
            >
              show Author
            </button>
            <button
              className="px-7 rounded-md py-3 bg-purple-400 shadow-lg hover:bg-purple-500 hover:transition-colors hover:duration-500"
              onClick={() => {
                setShowAuthor(!showAuthor);
              }}
            >
              Don't show Author
            </button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2">
            {!loading &&
              data?.books.map((e: any) => {
                return (
                  <div className="w-[15rem] h-[7rem] bg-yellow-200  border-r-4 border-t-4 border-white rounded-md  font-bold p-2 ">
                    <h1>📗{e.id}</h1>
                    <h1>{e.name}</h1>
                    <h1>{e?.author?.name}</h1>
                  </div>
                );
              })}
          </div>
          <div className="w-full mt-2 h-[15rem]">
            <CodeBlock
              text={JSON.stringify(data)}
              language="javascript"
              showLineNumbers={true}
              wrapLongLines={true}
              theme={atomOneDark}
            />
          </div>
        </div>
        <div className=" h-full w-[50%] flex flex-col items-center justify-center p-10 bg-slate-800 rounded-r-xl">
          <h1 className="text-4xl font-bold py-2 text-white">
            REST API RESPONSE
          </h1>

          <div className="flex justify-center w-full items-center gap-5">
            <button
              className="px-7 rounded-md py-3 bg-purple-400 shadow-lg hover:bg-purple-500 hover:transition-colors hover:duration-500"
              onClick={() => {
                fetchBooksViaRest();
              }}
            >
              Fetch All Books
            </button>
            {/* <button className="px-7 rounded-md py-3 bg-purple-400 shadow-lg hover:bg-purple-500 hover:transition-colors hover:duration-500">
              Fetch All Books
            </button> */}
            <button
              className="px-7 rounded-md py-3 bg-purple-400 shadow-lg hover:bg-purple-500 hover:transition-colors hover:duration-500"
              onClick={() => setRestBooks([])}
            >
              CLEAR
            </button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
            {restBooks.map((e: any) => {
              return (
                <div className="w-[15rem] h-[7rem] bg-green-300  border-r-4 border-t-4 border-white rounded-md  font-bold p-2 ">
                  <h1>📕{e.id}</h1>
                  <h1>{e.name}</h1>
                  <h1>{e?.author?.name}</h1>
                </div>
              );
            })}
          </div>
          <div className="w-full mt-2 h-[15rem]">
            <CodeBlock
              text={JSON.stringify(restBooks)}
              language="javascript"
              showLineNumbers={true}
              wrapLongLines={true}
              theme={dracula}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
