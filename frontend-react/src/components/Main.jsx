import React from 'react'
import Button from './Button'

const Main = () => {
    return (
        <>
            <div className='container'>
                <div className='p-5 text-center bg-light-dark'>
                    <h1 className='text-light'>Stock Prediction Portal</h1>
                    <p className='text-light lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi adipisci odit reprehenderit blanditiis aspernatur, alias rerum necessitatibus veniam mollitia aliquam placeat facilis? Neque dolore, sapiente odio beatae dignissimos nobis aspernatur!</p>
                    <Button text='Login' class="btn-outline-warning" />

                </div>
            </div>
        </>
    )
}

export default Main
