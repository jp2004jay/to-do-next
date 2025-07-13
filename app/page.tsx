import LinkButton from '@/componant/LinkButton'
import React from 'react'

const Home = () => {
    return (
        <div className='w-full h-[100vh] flex items-center justify-center'>
            <LinkButton
            href='/user/get'
            text='Click me to Enter'
            extraStyle='px-6 py-2'/>
        </div>
    )
}

export default Home