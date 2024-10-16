import React from 'react'

export default function About() {
  return (
<div class="py-16 " style={{backgroundColor:"#D9D6D1"}}>  
  <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div class="md:5/12 lg:w-5/12">
           <img src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png" alt="" />
        </div>
        <div class="md:7/12 lg:w-6/12">
          <h2 class="text-2xl text-gray-900 font-bold md:text-4xl"> Welcome to Your Book Haven</h2>
          <p class="mt-6 text-gray-600">Discover a world of books tailored to your tastes! Whether you're into thrilling mysteries, heartwarming romances, or insightful non-fiction, we’ve got something for every book lover. Start your reading adventure today, explore our curated collections, and let us help you find your next favorite read.</p>
          <p class="mt-4 text-gray-600"> Join our community of passionate readers and enjoy exclusive offers, author events, and book clubs that bring stories to life. We believe every book has a story to tell, and we’re excited to share that journey with you. Let’s turn the page together!</p>
        </div>
      </div>
  </div>
</div>

  )
}
