import React from "react";
import { Link } from "react-router-dom";


const About = () => {
    return(
        <div>
            <Link to="/home">
                <nav style={{display: 'flex', position: 'start', marginLeft: '30px'}}><button className="button-52">Back</button></nav>
            </Link>
            <div className="w-100 center" style={{textAlign: "left"}}>
                <article className="pa3 pa5-ns">
                    <h1 className="f3 f1-m f-headline-l i">About</h1>
                    <p className="measure lh-copy f4">
                    The "Found it!" platform was created to provide an efficient and accessible solution to the problem of lost items. 
                    We believe that everyone deserves peace of mind and should not have to endure the anxiety and frustration that comes with losing precious or meaningful possessions.
                    Through our platform, users can easily report lost items, search for others' lost items,
                    and get in contact with potential finders to return items to their rightful owners.
                    Additionally, the "Found it!" platform encourages collaboration and community, fostering a sense of solidarity and reciprocity among its users. 
                    <b>Together, we can turn loss into recovery.</b>
                    </p>
                    <p className="measure lh-copy f4">
                    Hassan Ewida, a third-year student in the Software Engineering program at Ariel University.
                    As part of the degree, he is required to complete a practical final project that incorporates the knowledge and skills acquired throughout the program.
                    The "Found it!" project is his initiative to solve the problem of lost items through technology.
                    As someone who often forgets or loses things, the idea for this platform was born out of personal experience and the need to find an efficient and convenient solution to this common issue. With "Found it!,"
                    Hassan aims to create a supportive community of users who can assist one another in finding lost items and turn the unpleasant experience of loss into a positive experience of discovery and recovery.
                    </p>
                </article>
            </div>
        </div>
    );
}

export default About;