import React from 'react';
import PromptCategoryList from './PromptCategoryListV2';
import { StopCircleIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';


function ChatInput({ group, inputValue, onInputChange, onKeyPress, handleInput, restartWebSocket, botTyping, status, messagesLength }) {

// This function will be called when the form is submitted
const handleSubmit = (e) => {
  e.preventDefault(); // Prevents the default form submit action (page refresh)
  handleInput(inputValue); // Pass the current inputValue to the handleInput function
};

const handleWebSocketRestart = (e) => {
  e.preventDefault();
  restartWebSocket();
};

    // Modified onKeyPress function to disable Enter when loading or botTyping
    const handleKeyPress = (e) => {
      if ((e.key === 'Enter') && (botTyping || status === "loading" || !inputValue.trim())) {
          e.preventDefault();
          // Optionally, you can provide feedback to the user here
      } else {
          onKeyPress(e); // Handle other key presses as normal
      }
  };

const LoadingSpinner = ({ colors = "fill-red-600" }) => (

  <div className="text-center">

      <div role="status">
          <svg aria-hidden="true" 
                  className={`inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 ${colors}`} 

                  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>
  </div>
);

const isDisabled = group === 'admin';


    return (
      <>
      {isDisabled ?
      <>
      </>
      :
      <>
        {/* Rounded input */}
        <form onSubmit={handleSubmit} className='stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl'>
        <div className='relative flex h-full flex-1 justify-center items-stretch md:flex-col'>
          
        {messagesLength === 0 && (

            <div>
              <div className='h-full flex ml-1 md:w-full md:m-auto md:mb-4 gap-0 md:gap-2 justify-center'>
                <div className='grow'>
                  <div className='absolute bottom-full left-0 mb-4 flex w-full grow gap-2 px-1 pb-1 sm:px-2 sm:pb-0 md:static md:mb-0 md:max-w-none'>
                  {status === "loading" ? (
                          <div className="grid w-full grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">

            <LoadingSpinner colors="fill-slate-700 dark:fill-slate-200" />
            </div>
          ) : (
                    <PromptCategoryList handleInput={handleInput} />
          )}
                  </div>
                </div>
              </div>
            </div>
        )}

          <label htmlFor="chat-input" className="sr-only">Message KosherGPT...</label>
          <div className=" flex flex-col w-full  flex-grow relative  ">
            {/* Voice input button (if applicable) */}
            {/* <button
              type="button"
              disabled={isDisabled}
              className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600"
            >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"
              ></path>
              <path d="M5 10a7 7 0 0 0 14 0"></path>
              <path d="M8 21l8 0"></path>
              <path d="M12 17l0 4"></path>
            </svg>
            <span className="sr-only">Use voice input</span>
            </button> */}
            <textarea
              disabled={isDisabled}
              id="chat-input"
              className="mt-4 block w-full resize-none rounded-2xl border-none bg-slate-200 p-4 pl-10 pr-20 text-base text-slate-900 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-blue-600 sm:text-base"
              placeholder="Message KosherGPT..."
              rows="1"
              required
              autoFocus
              maxLength={1000} 
              value={inputValue}
              onChange={onInputChange}
              // onKeyDown={onKeyPress}
              onKeyDown={handleKeyPress} 
            ></textarea>
            { botTyping ? 
              <button
              onClick={handleWebSocketRestart} 
              className={`text-xs	 absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-2 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base`}
              >
          <StopCircleIcon className="h-6 w-6" />
          <span className="sr-only">Stop incoming messages</span>
          </button>
          :
            <button
              type="submit"
              disabled={
                isDisabled || 
                status === "loading" ||
                !inputValue.trim()
            }
              className={`text-xs	 absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-2 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base ${status === "loading" || !inputValue.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
              >

       <PaperAirplaneIcon className="h-6 w-6" />
    <span className="sr-only">Send message</span>
                
  
            </button>
            }
          </div>
          </div>
        </form>
      </>

          }
          </>
    );
}

export default ChatInput;