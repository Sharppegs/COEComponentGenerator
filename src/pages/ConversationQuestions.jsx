import React from 'react'
import { useState, useContext } from 'react'
import styled from 'styled-components'
import { nanoid } from 'nanoid'
import { Context } from "../Context"
import { motion } from 'framer-motion'
import { Router } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

function ConversationQuestions() {
    const [input, setInput] = useState("")
    const [compType, setCompType] = useState("")
    const {saveConversationQuestions, conversationQs, canvasCode,  setCanvasCode} = useContext(Context) 
    const [spinner, setSpinner] = useState(false)
    const [clipCopied, setClipCopied] = useState(false)
  
     function getCode(component, LdText) {
        saveConversationQuestions(component, LdText)       
    }
  
    function submitHandler(e) {  
        e.preventDefault()
        const wordList = input
        getCode(compType, wordList)
        input ? setSpinner(true) : ""    
    }

    function clearAll() {
        setSpinner(false)
        
        setInput("")
        setCanvasCode("")
        setClipCopied(false)
    }

    // function copycode() {
    //     let copyText = document.querySelector(".componentCode").innerHTML;
    //     navigator.clipboard.write([
    //         new ClipboardItem({
    //             "text/html": new Blob([copyText], { type: "text/html" }),
    //             "text/plain": new Blob([copyText], { type: "text/plain" })
    //         })
    //         ])
    //     setClipCopied(true)
    // }


  return (
    <motion.div 
        key={Router.route}
        className='container px-4'
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
            duration: 0.25
        }}
        variants={{
            initialstate: {
                opacity: 0,
            },
            animateState: {
                opacity: 1,
            },
            exitState: {
                
            }
        }}>
        <motion.div 
        className='container md:w-[1250px] mx-auto flex flex-col py-3'
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{
            duration: 0.75,
            delay: 0.2
        }}>
       

        <section className="action-area">
         <div className='mb-5 flex flex-col gap-5 mb-3 px-5'>
           
                <h2 className='step-titles'>Step 1: choose a component</h2>
               
          
           <div className='md:flex gap-5 items-center justify-between mb-5'>
             <select 
                    name="student level" 
                    className='text-2xl rounded-lg text-[#07272d] component-select'
                    value={compType} 
                    onChange={(e) => setCompType(e.target.value)}
                    placeholder='Choose from below'>
                    <option value="" className='font-bold'>Choose component</option>
                    <option value="tabs">Tabs</option>
                    <option value="expanders">Expanders</option>
                    <option value="linked-references">Linked references</option>
                    <option value="sm">Flipcards (small)</option>
                    <option value="md">Flipcards (medium)</option>
                    
                </select>
                 <div className='reset-btn text-center rounded-full bg-[#b10303] font-bold text-[#f5f5f5] py-4 px-3 w-48 cursor-pointer mt-4 md:mt-0' onClick={() => clearAll()}>Reset</div>
            </div>
            <h2 className='step-titles'>Step 2: paste storyboard text and select 'Go'</h2>
         </div>
         
<div className='box-displays'>
    
    
         <FormStyle onSubmit={submitHandler} className='storyboard'>
            
                <h2 className='text-center text-2xl mb-5 underline action-titles'>Storyboard Text</h2>
                <textarea 
                
                    className='text-black mb-2 p-4 sb-textarea'
                   placeholder="Paste storyboard text here"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}>
                </textarea>
               
                <button type="submit" className=" go-btn mt-4 rounded-full bg-[#2c83f5] font-bold text-[#f5f5f5] py-2 px-3 w-48 cursor-pointer">Go</button>
              
         
        </FormStyle>
      
        <div className="storyboard">
            <h2 className='text-center text-2xl mb-5 underline action-titles'>Canvas code</h2>
            <div className="sb-textarea">
                    {canvasCode ? 
                <div>
                    
                   <ul className='canvas-code-container'>
                    {canvasCode.map(item => <li key={nanoid} className='mb-3 componentCode'>{item}</li> )}
                    </ul>

           
                </div> : spinner === true ? <LoadingSpinner /> : <p className='canvas-placeholder'>Code will appear here</p>
                }
            </div>

           {/* <button onClick={copycode} className=" go-btn mt-4 rounded-full bg-[#2c83f5] font-bold text-[#f5f5f5] py-2 px-3 w-48 cursor-pointer">{clipCopied ?  "Copied!" : "Copy Code"}</button> */}
        
        </div>

    </div>
    </section>   
        </motion.div>
        </motion.div>
    )
    }

    const FormStyle = styled.form`
    margin: 1em 2em;
   
    
    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: #fff;
    }
`


export default ConversationQuestions