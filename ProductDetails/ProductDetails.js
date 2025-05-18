import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import { useParams } from 'react-router-dom';
import { SINGLE_PRODUCT, INCRE_QTY, DECRE_QTY } from '../../Utility/Constant'

export default function ProductDetails() {
  const { id } = useParams();
  const [p_simg, setp_simg] = useState()
  const [prodimg, setprodimg] = useState([])
  const [pdesc, setpdesc] = useState()
  const [p_sprice, setp_sprice] = useState()
  const [p_mprice, setp_mprice] = useState()
  const [p_qty, setp_qty] = useState()
  const [p_brand, setp_brand] = useState()
  const [p_variant, setp_variant] = useState()
  const [p_category, setp_category] = useState()
  const [p_availability, setp_availability] = useState()
  const [p_details, setp_details] = useState()
  const [p_discount_percentage, setp_discount_percentage] = useState()
  const [p_size, setp_size] = useState([])

  const [size, setsize] = useState()

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

    window.$(function () {
      window.$('#myTab a:first').tab('show');
      window.$('#myTab a').click(function (e) {
        e.preventDefault();
        window.$(this).tab('show');
      })
    })

    productDetails()
  }, []);

  const productDetails = () => {
    let url = SINGLE_PRODUCT + id
    //  console.log(url)
    axios.get(url)
      .then((response) => {
        // console.log(response.data)
        var product = response.data.product
        console.log(product.product_imageurl[0].path)
        setp_simg(product.product_imageurl[0].path)
        setprodimg(product.product_imageurl)
        setpdesc(product.product_description)
        setp_sprice(product.product_sellingprice)
        setp_mprice(product.product_max_retailprice)
        setp_qty(product.product_quantity)
        setp_brand(product.product_brand)
        setp_variant(product.product_variant_name)
        setp_category(product.product_category)
        setp_availability(product.product_availability)
        setp_details(product.product_details)
        setp_discount_percentage(product.product_discount_percentage)
        var arrsize = product.product_size.split(",");
        setp_size(arrsize)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleIncre = (e) => {
    e.preventDefault()
    console.log("Increment")
    axios.put(INCRE_QTY + id)
      .then((response) => {
        var qty = response.data.updateprod.product_quantity
        console.log(qty)
        setp_qty(qty)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDecre = (e) => {
    e.preventDefault()
    console.log("Decrement")
    axios.put(DECRE_QTY + id)
      .then((response) => {
        var qty = response.data.updateprod.product_quantity
        console.log(qty)
        setp_qty(qty)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleAddtoCart = () =>{
    console.log("handleAddtoCart")
     console.log("Size:",size) 
     console.log("Quantity:",p_qty)
     console.log("Selling Price:",p_sprice)
     console.log("Variant:",p_variant)
     console.log("Brand:",p_brand)
     console.log("Category:",p_category)
     console.log("Single Image:",p_simg)
     //Now store data in redux
  }


  return (
    <div>
      <Header />
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
      {/* ===================== */}
      <section className="header_text sub">
        <h4><span>Product Detail</span></h4>
      </section>
      {/* <h1>id:{id}</h1> */}

      <section className="main-content">
        <div className="row">
          <div className="span9">
            <div className="row">
              <div className="span4">
                <a href={p_simg} className="thumbnail" data-fancybox-group="group1" title="Description 1">
                  <img alt="" src={p_simg}></img></a>
                <ul className="thumbnails small">
                  {prodimg.map((obj, index) =>
                    <li className="span1" key={index}>
                      <a href={obj.path} className="thumbnail" data-fancybox-group="group1" title="Description 2"><img src={obj.path} alt=""></img>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <div className="span5">
                <address>
                  <h4 style={{color:'brown'}}>
                  <strong>Brand:</strong> <span>{p_brand}</span><br></br>
                  <strong>Variant:</strong> <span>{p_variant}</span><br></br>
                  <strong>Category:</strong> <span>{p_category}</span><br></br>
                  <strong>Description:</strong> <span>{pdesc}</span><br></br>
                  <strong>Availability:</strong> <span style={{color:'green'}}>{p_availability}</span><br></br></h4>
                </address>
                <h4><strong>Price:&#8377;{p_sprice}</strong><small style={{ color: 'black' }}>
                    <del>   &#8377;{p_mprice}</del></small>
                  <span style={{color:'darkgoldenrod'}}>  {p_discount_percentage}% Off</span>
                  </h4>
              </div>
              <div className="span5">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <label style={{ fontSize: 18, fontWeight: 'bold' }}
                  >Qty:</label>
                  <form onSubmit={handleIncre}>
                    <button className="btn btn-inverse" type="submit"
                      style={{ fontSize: 24, textAlign: 'center' }}
                    >+</button>
                  </form>&nbsp;&nbsp;
                  <input type="text" className="span1"
                    style={{ textAlign: 'center',fontSize: 20,fontWeight:'bold',color:'brown' }}
                    placeholder="1"
                    value={p_qty}
                  />&nbsp;&nbsp;
                  <form onSubmit={handleDecre}>
                    <button className="btn btn-inverse" type="submit"
                      style={{ fontSize: 32, textAlign: 'center' }}
                    >-</button>
                  </form>
                </div>
              </div>
                    <label style={{ fontSize: 18, fontWeight: 'bold' }}>Select a Size:</label>
                       { p_size.map((data,index)=>
                        <div style={{display:"inline",fontSize: 30}}>
                        <input type="radio"
                        onChange={(event)=>setsize(event.target.value)}
                        checked={size === data} 
                        value={data}  
                        name="size"
                        key={index}
                        />
                        &nbsp;&nbsp;
                        <span
                        style={{fontSize: 18,verticalAlign:"middle",fontWeight:"bold"}}>{data}</span>
                        &nbsp;&nbsp;
                        </div>
                       )}
              <h1>{size}</h1>
              <button className="btn btn-inverse" type="button"
              style={{fontSize:20,fontWeight:'bold',padding:10}}
              onClick={handleAddtoCart}
              >
                Add to cart</button>
            </div>
            <div className="row">
              <div className="span8">
                <ul className="nav nav-tabs" id="myTab">
                  <li className="active"><a href="#home">Description</a></li>
                  <li className=""><a href="#profile">Additional Information</a></li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="home">
                    <h3>{p_details}</h3>
                  </div>
                  <div className="tab-pane" id="profile">
                    <table className="table table-striped shop_attributes">
                      <tbody>
                        <tr className="">
                          <th>Size</th>
                          <td>Large, Medium, Small, X-Large</td>
                        </tr>
                        <tr className="alt">
                          <th>Colour</th>
                          <td>Orange, Yellow</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="span9">
                <br></br>
                <h4 className="title">
                  <span className="pull-left"><span className="text"><strong>Related</strong> Products</span></span>
                  <span className="pull-right">
                    <a className="left button" href="#myCarousel-1" data-slide="prev"></a><a className="right button" href="#myCarousel-1" data-slide="next"></a>
                  </span>
                </h4>
                <div id="myCarousel-1" className="carousel slide">
                  <div className="carousel-inner">
                    <div className="active item">
                      <ul className="thumbnails listing-products">
                        <li className="span3">
                          <div className="product-box">
                            <span className="sale_tag"></span>
                            <a href="product_detail.html"><img alt="" src="../themes/images/ladies/6.jpg"></img></a><br />
                            <a href="product_detail.html" className="title">Wuam ultrices rutrum</a><br />
                            <a href="#" className="category">Suspendisse aliquet</a>
                            <p className="price">$341</p>
                          </div>
                        </li>
                        <li className="span3">
                          <div className="product-box">
                            <span className="sale_tag"></span>
                            <a href="product_detail.html"><img alt="" src="../themes/images/ladies/5.jpg"></img></a><br />
                            <a href="product_detail.html" className="title">Fusce id molestie massa</a><br />
                            <a href="#" className="category">Phasellus consequat</a>
                            <p className="price">$341</p>
                          </div>
                        </li>
                        <li className="span3">
                          <div className="product-box">
                            <a href="product_detail.html"><img alt="" src="../themes/images/ladies/4.jpg"></img></a><br />
                            <a href="product_detail.html" className="title">Praesent tempor sem</a><br />
                            <a href="#" className="category">Erat gravida</a>
                            <p className="price">$28</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="item">
                      <ul className="thumbnails listing-products">
                        <li className="span3">
                          <div className="product-box">
                            <span className="sale_tag"></span>
                            <a href="product_detail.html"><img alt="" src="../themes/images/ladies/1.jpg"></img></a><br />
                            <a href="product_detail.html" className="title">Fusce id molestie massa</a><br />
                            <a href="#" className="category">Phasellus consequat</a>
                            <p className="price">$341</p>
                          </div>
                        </li>
                        <li className="span3">
                          <div className="product-box">
                            <a href="product_detail.html"><img alt="" src="../themes/images/ladies/2.jpg"></img></a><br />
                            <a href="product_detail.html">Praesent tempor sem</a><br />
                            <a href="#" className="category">Erat gravida</a>
                            <p className="price">$28</p>
                          </div>
                        </li>
                        <li className="span3">
                          <div className="product-box">
                            <span className="sale_tag"></span>
                            <a href="product_detail.html"><img alt="" src="../themes/images/ladies/3.jpg"></img></a><br />
                            <a href="product_detail.html" className="title">Wuam ultrices rutrum</a><br />
                            <a href="#" className="category">Suspendisse aliquet</a>
                            <p className="price">$341</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="span3 col">
            <div className="block">
              <ul className="nav nav-list">
                <li className="nav-header">SUB CATEGORIES</li>
                <li><a href="products.html">Nullam semper elementum</a></li>
                <li className="active"><a href="products.html">Phasellus ultricies</a></li>
                <li><a href="products.html">Donec laoreet dui</a></li>
                <li><a href="products.html">Nullam semper elementum</a></li>
                <li><a href="products.html">Phasellus ultricies</a></li>
                <li><a href="products.html">Donec laoreet dui</a></li>
              </ul>
              <br />
              <ul className="nav nav-list below">
                <li className="nav-header">MANUFACTURES</li>
                <li><a href="products.html">Adidas</a></li>
                <li><a href="products.html">Nike</a></li>
                <li><a href="products.html">Dunlop</a></li>
                <li><a href="products.html">Yamaha</a></li>
              </ul>
            </div>
            <div className="block">
              <h4 className="title">
                <span className="pull-left"><span className="text">Randomize</span></span>
                <span className="pull-right">
                  <a className="left button" href="#myCarousel" data-slide="prev"></a><a className="right button" href="#myCarousel" data-slide="next"></a>
                </span>
              </h4>
              <div id="myCarousel" className="carousel slide">
                <div className="carousel-inner">
                  <div className="active item">
                    <ul className="thumbnails listing-products">
                      <li className="span3">
                        <div className="product-box">
                          <span className="sale_tag"></span>
                          <a href="product_detail.html"><img alt="" src="../themes/images/ladies/7.jpg"></img></a><br />
                          <a href="product_detail.html" className="title">Fusce id molestie massa</a><br />
                          <a href="#" className="category">Suspendisse aliquet</a>
                          <p className="price">$261</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="item">
                    <ul className="thumbnails listing-products">
                      <li className="span3">
                        <div className="product-box">
                          <a href="product_detail.html"><img alt="" src="../themes/images/ladies/8.jpg"></img></a><br />
                          <a href="product_detail.html" className="title">Tempor sem sodales</a><br />
                          <a href="#" className="category">Urna nec lectus mollis</a>
                          <p className="price">$134</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="block">
              <h4 className="title"><strong>Best</strong> Seller</h4>
              <ul className="small-product">
                <li>
                  <a href="#" title="Praesent tempor sem sodales">
                    <img src="../themes/images/ladies/1.jpg" alt="Praesent tempor sem sodales"></img>
                  </a>
                  <a href="#">Praesent tempor sem</a>
                </li>
                <li>
                  <a href="#" title="Luctus quam ultrices rutrum">
                    <img src="../themes/images/ladies/2.jpg" alt="Luctus quam ultrices rutrum"></img>
                  </a>
                  <a href="#">Luctus quam ultrices rutrum</a>
                </li>
                <li>
                  <a href="#" title="Fusce id molestie massa">
                    <img src="../themes/images/ladies/3.jpg" alt="Fusce id molestie massa"></img>
                  </a>
                  <a href="#">Fusce id molestie massa</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
