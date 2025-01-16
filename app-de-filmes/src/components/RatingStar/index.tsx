import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

import './index.scss'

export interface Props {
    rating: number
}

function RatingStar(props: Props) {
    
    const numStars = Math.round(props.rating / 2)

    const totalStars = []
    const emptyStars = []

    for (let i = 0; i < 5; i++) {
        if (i < numStars) {
            totalStars.push(i)
        } else {
            emptyStars.push(i)
        }
    }

    return (
        <div className="rate-movie">
            {totalStars.map(index => 
                <FaStar key={index}/>

            )}
            {emptyStars.map(index => 
                <FaRegStar key={index}/>

            )}
        </div>
    )
}

export default RatingStar