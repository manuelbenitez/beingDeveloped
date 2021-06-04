import { Divider } from '@material-ui/core'
import React from 'react'

const About = () => {
    return (
        <div>
            <div className='intro'>
                <h1>Welcome my analog pictures collection</h1>
                <h2>None of the pictures on this website are edited, as they were taken they were developed.</h2>
                <h2>Nothing else to say about it so I want to thank you for taking the time to pass by and I hope you enjoyed it!</h2>
                <h2>Now if you are interested in how this website was built, all the information is below.</h2>

            </div>
            <Divider></Divider>
            <div className='intro'>
                <h1>The website has been coded using React, Firebase and UI/UX design. It is working on a mobile version, but I will always recommend to use the browser version to look at the pictures.</h1>
                <br />
                <h2>You can login using a private link and change the content of the website without the need to code again and</h2>
                <h2>A user can add and delete whole albums (There is always a backup of the albums in case of deleting them by accident) and also</h2>
                <h2>the user is able to add and delete single pictures in an album but without having a backup</h2>
                <h2>Using a mobile you will only be able to update and delete single pictures and</h2>
                <h2>This is how the website would look if the user was logged in.</h2>
                <h2>If you want to change the styles you only have to play a bit with the index.css file</h2>
                <h2>You can find the template of this website on my Github <a href='https://github.com/manuelbenitez/beingDeveloped'>page</a></h2>
                <h2>Please feel free to steal the code and contact me if you have any questions or want a similar website coded for yourself to manu.benitez1@hotmail.com</h2>
                <br />
            </div>
        </div>
    )
}

export default About
