import React from 'react'

interface NavigationContainerProps {
    children: React.ReactNode
}

const NavigationContainer = ({ children }: NavigationContainerProps) => {
    return (
        <div className='flex flex-col p-4 gap-8'>{children}</div>
    )
}

export default NavigationContainer