import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css'

export default function LazyLoadGameImage({ image }){
    return (
        <LazyLoadImage 
            alt="game image"
            effect="blur"
            className="object-cover"
            wrapperProps={{
                style: {transitionDelay: "0.5s"},
            }}
            src={image}
        />
    )
}