import React from 'react'
import cover from '../../assets/main-bg.webp';

function HeroSection() {
   return <>
     <section className="hero-section relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${cover})` }}>
     <div className="layer absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto relative flex flex-col justify-center w-full px-4  py-12  min-h-screen gap-4">
        <h1 className="md:text-3xl text-xl font-bold  text-white">
          Welcome to Tanta University! Computer Science Major
        </h1>
        <p className="text-white">
           Explore and enhance your learning with our resources.
        </p>
         <a href="#CourseNavigation"  className='btn w-fit'>
            Get started
         </a>
      </div>
    </section>
  </>
}
export default React.memo(HeroSection);