import React,{useEffect} from 'react'

export default function Slider() {
    useEffect(() => {  
        // Initialize the flexslider
        window.$('.flexslider').flexslider({
            animation: "fade",
            slideshowSpeed: 4000,
            animationSpeed: 600,
            controlNav: false,
            directionNav: true,
            controlsContainer: ".flex-container" // the container that holds the flexslider
        });
      }, []);
      
  return (
    <div>
      <div id="wrapper" className="container">
      <section className="homepage-slider" id="home-slider">
                    <div className="flexslider">
                        <ul className="slides">
                            <li>
                                <img src="../themes/images/carousel/banner-1.jpg" alt="" />
                            </li>
                            <li>
                                <img src="../themes/images/carousel/banner-2.jpg" alt="" />
                                <div className="intro">
                                    <h1>Mid season sale</h1>
                                    <p><span>Up to 50% Off</span></p>
                                    <p><span>On selected items online and in stores</span></p>
                                </div>
                            </li>
                        </ul>
                    </div>
      </section>
      </div>
    </div>
  )
}
