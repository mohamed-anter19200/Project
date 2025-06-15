import React from 'react'

export default function VideoPlayer({video}) {
                return(  <iframe
                                className='w-full rounded'
                                height={400}
                                src={video}
                                title="Lecture Video"
                                allowFullScreen
                                >
                </iframe>)
}
