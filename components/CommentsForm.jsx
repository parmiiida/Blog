import React, { useState, useEffect, useRef } from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {

  const [error, setError] = useState(false)
  const [localStorage, setlocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  //we dont want to keep these values in state we just want to read the value from  the input field
  //and the send it to graphcms
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')

  }, [])


  const handleCommentSubmition = () =>{
      setError(false)
       const { value:comment } = commentEl.current;
       const { value:name } = nameEl.current;
       const { value:email } = emailEl.current;
       const { checked:storeData } = storeDataEl.current;
      if(!comment || !name || !email){
        setError(true);
        return
      }

      //actual comment object
      const commentObj  = {name ,email, comment ,slug }

      if(storeData){
        window.localStorage.setItem('name' , name)
        window.localStorage.setItem('email' , email)
      }else{
        window.localStorage.remove('name' , name)
        window.localStorage.remove( 'email' , email)

      }

      submitComment(commentObj)
      .then((res) =>{
        setShowSuccessMessage(true)

        setTimeout(() => {
          setShowSuccessMessage(false);
        } , 3000)
      })
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a reply</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          ref={commentEl}
          className='p-4 outline-none w-full rounded-lg focus:ring-2  focus:ring-gray-200 bg-gray-100
          text-gray-700'
          placeholder='Comment'
          name='comment'/>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          type='text'
          ref={nameEl}
          className='py-2 p-4 outline-none w-full rounded-lg  focus:ring-2  focus:ring-gray-200 bg-gray-100
          text-gray-700'
          placeholder='Name'
          name='name'/>
      <input
          type='text'
          ref={emailEl}
          className='py-2 p-4 outline-none w-full rounded-lg focus:ring-2  focus:ring-gray-200 bg-gray-100
          text-gray-700'
          placeholder='Email'
          name='email'/>
      </div>

      {/* check if the user want us to save their information in local storage */}
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            ref={storeDataEl}
            type='checkbox'
            id='storeData'
            name='storeData'
            />
            <label className='text-gray-500 cursor-pointer hover:text-[#b0845d] ml-2' htmlFor='storeData'>Save my Email and Name for the next time i comment</label>
        </div>
      </div>
      {error && <p className='text-xs text-red-100'> all fields are required</p>}
      <div className='mt-8'>
        <button
          className='transition duration-500 ease hover:bg-[#b0845d] inline-block bg-[#964b09]  text-lg rounded-full text-white
          px-8 py-3 curser-pointer'
          type='button'
          onClick={handleCommentSubmition}
          >
            Post Comment
          </button>
          {showSuccessMessage && <span className='text-xl font-semibold text-[#9FC18F] float-right mt-3'>Comment submitted for view</span>}
      </div>
    </div>
  )
}

export default CommentsForm
