import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts ,getSimilarPosts } from '@/services';

const PostWidgets = ({categories ,slug}) => {
  const[relatedPosts , setRelatedPosts] = useState([])

  //we wanna know if we are seeing postWidget in homepage or in a specific article page
  //recent post in homepage
  //related post in articlepage
  useEffect(() => {
    if(slug){
      getSimilarPosts(categories ,slug)
      .then((result) => setRelatedPosts(result))
    } else {
      getRecentPosts()
      .then((result) => setRelatedPosts(result))
    }
   } , [slug])


  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='tx-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>

      {relatedPosts.map((post) => (
        <div key={post.title} className='flex items-center w-full mb-4'>
          <div className='w-16 flex-none'>
            <img
              src={post.featuredImage.url}
              alt={post.title}
              width='60px'
              height='60px'
              className='align-middle rounded-full'/>
          </div>
          <div className='flex-grow ml-4'>
            <p className='text-gray-500 font-xs'>
              {moment(post.createdAt).format('MMM ,DD YYYY')}
            </p>
            <Link href={`/post/${post.slug}`}
               className='text-md' key={post.title}>
                {post.title}
               </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidgets
