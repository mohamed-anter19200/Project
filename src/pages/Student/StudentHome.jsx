import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import CourseNavigation from '../../components/CourseNavigation/CourseNavigation'
import NewestUpload from '../../components/NewestUpload/NewestUpload'

export default function StudentHome() {
  return <>
  <div className='Student-Home-page'>
    <HeroSection />
    <CourseNavigation/>
    <NewestUpload/>
  </div>
  </>
}
