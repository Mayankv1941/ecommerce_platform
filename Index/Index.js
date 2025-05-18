import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {PRODUCT_LIST} from '../../Utility/Constant'
import Slider from '../SliderDemo/Slider'

export default function Index() {

    const [prodList, setprodList] = useState([])

    useEffect(() => {
        productList()
      }, []);

    const productList = ()=>{
        axios.get(PRODUCT_LIST)
        .then((response)=>{
            // console.log(response.data)
            var obj = response.data
            setprodList(obj["productlist"])
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            <Header />
            <Slider />
            <div id="wrapper" className="container">
                <section className="main-content">
                    <div className="row">
                        <div className="span12">
                            <div className="row">
                                <div className="span12">
                                    <h4 className="title">
                                        <span className="pull-left"><span className="text"><span className="line">Feature <strong>Products</strong></span></span></span>
                                        <span className="pull-right">
                                            <a className="left button" href="#myCarousel" data-slide="prev"></a><a className="right button" href="#myCarousel" data-slide="next"></a>
                                        </span>
                                    </h4>
                                    <div id="myCarousel" className="myCarousel carousel slide">
                                        <div className="carousel-inner">
                <div className="active item">
                    <ul className="thumbnails">
                        {prodList.map((product,index)=>
                        <li className="span3" key={index}>
                           <div className="product-box">
                        <span className="sale_tag"></span>
                        <p>
                        <a href={`/productdetails/${product._id}`}>
                        <img src={product.product_imageurl[0]["path"]} alt=""/></a></p>
                        <a href="product_detail.html" className="title">{product.product_brand}</a><br />
                        <a href="products.html" className="category">{product.product_description}</a>
                        <p className="price">&#8377;{product.product_sellingprice}</p>
                    </div>
                </li>
                        )}
                        
                                                </ul>
                                            </div>
                                            <div className="item">
                                                <ul className="thumbnails">
                                                    <li className="span3">
                                                        <div className="product-box">
                                                            <p><a href="product_detail.html"><img src="themes/images/ladies/5.jpg" alt="" /></a></p>
                                                            <a href="product_detail.html" className="title">Know exactly</a><br />
                                                            <a href="products.html" className="category">Quis nostrud</a>
                                                            <p className="price">$22.30</p>
                                                        </div>
                                                    </li>
                                                    <li className="span3">
                                                        <div className="product-box">
                                                            <p><a href="product_detail.html"><img src="themes/images/ladies/6.jpg" alt="" /></a></p>
                                                            <a href="product_detail.html" className="title">Ut wisi enim ad</a><br />
                                                            <a href="products.html" className="category">Commodo consequat</a>
                                                            <p className="price">$40.25</p>
                                                        </div>
                                                    </li>
                                        <li className="span3">
                                        <div className="product-box">
                                                <p><a href="product_detail.html"><img src="themes/images/ladies/7.jpg" alt="" /></a></p>
                                                            <a href="product_detail.html" className="title">You think water</a><br />
                                                            <a href="products.html" className="category">World once</a>
                                                            <p className="price">$10.45</p>
                                                        </div>
                                                    </li>
                                                    <li className="span3">
                                                        <div className="product-box">
                                                            <p><a href="product_detail.html"><img src="themes/images/ladies/8.jpg" alt="" /></a></p>
                                                            <a href="product_detail.html" className="title">Quis nostrud exerci</a><br />
                                                            <a href="products.html" className="category">Quis nostrud</a>
                                                            <p className="price">$35.50</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />

                            <div className="row feature_box">
                                <div className="span4">
                                    <div className="service">
                                        <div className="responsive">
                                            <img src="themes/images/feature_img_2.png" alt="" />
                                            <h4>MODERN <strong>DESIGN</strong></h4>
                                            <p>Lorem Ipsum is simply dummy text of the printing and printing industry unknown printer.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="span4">
                                    <div className="service">
                                        <div className="customize">
                                            <img src="themes/images/feature_img_1.png" alt="" />
                                            <h4>FREE <strong>SHIPPING</strong></h4>
                                            <p>Lorem Ipsum is simply dummy text of the printing and printing industry unknown printer.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="span4">
                                    <div className="service">
                                        <div className="support">
                                            <img src="themes/images/feature_img_3.png" alt="" />
                                            <h4>24/7 LIVE <strong>SUPPORT</strong></h4>
                                            <p>Lorem Ipsum is simply dummy text of the printing and printing industry unknown printer.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="our_client">
                    <h4 className="title"><span className="text">Manufactures</span></h4>
                    <div className="row">
                        <div className="span2">
                            <a href="#"><img alt="" src="themes/images/clients/14.png"></img></a>
                        </div>
                        <div className="span2">
                            <a href="#"><img alt="" src="themes/images/clients/35.png"></img></a>
                        </div>
                        <div className="span2">
                            <a href="#"><img alt="" src="themes/images/clients/1.png"></img></a>
                        </div>
                        <div className="span2">
                            <a href="#"><img alt="" src="themes/images/clients/2.png"></img></a>
                        </div>
                        <div className="span2">
                            <a href="#"><img alt="" src="themes/images/clients/3.png"></img></a>
                        </div>
                        <div className="span2">
                            <a href="#"><img alt="" src="themes/images/clients/4.png"></img></a>
                        </div>
                    </div>
                </section>
            <Footer />
            </div>
        </div>
    )
}
