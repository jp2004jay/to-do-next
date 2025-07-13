import Link from 'next/link'
import React from 'react'

const LinkButton = ({text, href, extraStyle}:{text:string, href:string, extraStyle?:string}) => {
    return (
        <Link href={href}>
            <button className={`px-4 py-1 bg-gray-800 text-white rounded-full hover:bg-gray-900 hover:cursor-pointer transition-colors ${extraStyle}`}>
                {text}
            </button>
        </Link>
    )
}

export default LinkButton