import './style.css'
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function ProductDetail({product}) {
    const [hoverImage, setHoverImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const [listImage, setListImage] = useState([]);
    const [totalCost, setTotalCost] = useState([]);

    const handleHoverImage = (image) => {
        setHoverImage(image)
    }
    const handleClick = (image) => {
        setSelectedImage(image)
    }
    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        const newTotalCost = newQuantity * unitPrice;
    
        setQuantity(newQuantity);
        setTotalCost(newTotalCost);
    };
    
    const handleReduce = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            const newTotalCost = newQuantity * unitPrice;
    
            setQuantity(newQuantity);
            setTotalCost(newTotalCost);
        }
    };

    useEffect(() => {
        if (product && product && product.images && product.images.length > 0) {
            setListImage([
                product.images[0].large_url,
                product.images[0].medium_url,
                product.images[0].thumbnail_url,
                product.images[0].base_url,
            ])
            setUnitPrice(product.original_price)
            setTotalCost(product.original_price)
        }
    }, [product])
    
    return (
        <>
            <Header />
            <div className="product-detail gap-x-8 flex">
                <div className="w-3/12">
                    <div className="product-detail__left">
                        <div className="product-detail__left-image">
                            <div className="product-detail__left-image--main active" >
                                <img src={hoverImage || selectedImage || listImage[0]} alt="" />
                            </div>
                            <div className="product-detail__left-image--block">
                                <ul className="product-detail__left-image-list">
                                    {listImage.map((image, index) => (
                                        <li key={index} 
                                            className="product-detail__left-image-item"
                                            onMouseEnter={() => handleHoverImage(image)}
                                            onMouseLeave={() => handleHoverImage(null)}
                                            onClick={() => handleClick(image)}
                                        >
                                                <img
                                                    src={image}
                                                    alt=""
                                                    className={`product-detail__left-image-second ${
                                                    selectedImage === image ? "active" : ""
                                                    }`}
                                                />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="special-features">
                            <h3>Đặc điểm nổi bật</h3>
                            <ul className="special-features-list">
                                <li className="special-features-item">
                                    <i className="special-features-icon fa-solid fa-circle-check"></i>
                                    <span className="special-features-text">Màu sắc trong vỏ kim loại</span>
                                </li>
                                <li className="special-features-item">
                                    <i className="special-features-icon fa-solid fa-circle-check"></i>
                                    <span className="special-features-text">Màu sắc trong vỏ kim loại</span>
                                </li>
                                <li className="special-features-item">
                                    <i className="special-features-icon fa-solid fa-circle-check"></i>
                                    <span className="special-features-text">Màu sắc trong vỏ kim loại</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-6/12 px-4">
                    <div className="product-detail__center">
                        <div className="center__heading">
                            <div className="verify-and-author flex items-baseline">
                                <div className="verify flex items-center ">
                                    <i className="special-features-icon fa-solid fa-circle-check"></i>
                                    <span>Chính hãng</span>
                                </div>
                                <div className="author flex items-center">
                                    <span className="author__title">Tác giả: </span>
                                    <a href='/' className="author__name-link">{product && product.authors ? product.authors[0].name : ""}</a>
                                </div>
                            </div>
                            <h1 className="product__name">{ product && product.name ? product.name : 'N/A'  }</h1>
                            <div className="rate-and-sold flex items-baseline">
                                <div className="rating">
                                    <span className="rate-star">{ product && product.rating_average ? product.rating_average : '0'  }</span>
                                    <i className="star-gold fa-solid fa-star"></i>
                                    <i className="star-gold fa-solid fa-star"></i>
                                    <i className="star-gold fa-solid fa-star"></i>
                                    <i className="star-gold fa-solid fa-star"></i>
                                    <i className="star-gold fa-solid fa-star"></i>
                                    <span className="quantity-star">(928)</span>
                                </div>
                                <div className="sold">
                                    <span className="sold-quantity">{ product && product.quantity_sold ? product.quantity_sold.text : '0'  }</span>
                                </div>
                            </div>
                            <div className="price-and-discount flex items-baseline">
                                <span className="price">{ product && product.original_price ? product.original_price : '0'  }<sup>đ</sup></span>
                                <div className="discount">-26%</div>
                            </div>
                        </div>
                        <div className="center__body mt-6">
                            <div className="info-detail">
                                <div className="info-detail__title">Thông tin chi tiết</div>
                                <div className="info-detail__product flex flex-col">
                                { product && product.specifications && product.specifications.length > 0 ? product.specifications[0].attributes.map(item => (
                                    <div className="info-detail__product-item">
                                        <span>{item.name}</span>
                                        <span>{item.value}</span>
                                    </div>
                                )) : ''}
                                </div>
                            </div>
                            <div className="prod-desc mt-12">
                                <div className="prod-desc__title mb-4">Mô tả sách</div>
                                <img src={listImage.length > 0 ? listImage[0] : ''} alt="" className="prod-desc__img mb-6" />
                                <div dangerouslySetInnerHTML={{ __html: product && product.description ? product.description : '' }} />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/12">
                    <div className="product-detail__right">
                        <div className="quantity-book mb-6">
                            <p>Số lượng</p>
                            <div className="group-input">
                                <button className={quantity > 1 ? "" : "disable"} onClick={handleReduce}><img src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg" alt="remove-icon" width="20" height="20"/></button>
                                <input type="text" value={quantity} className="input" onChange={(e) => setQuantity(e.target.value)}></input>
                                <button onClick={handleIncrease}><img src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg" alt="add-icon" width="20" height="20"/></button>
                            </div>
                        </div>
                        <div className="total-cost">
                            <p>Tạm tính</p>
                            <div className="price">{totalCost}<sup>đ</sup></div>
                        </div>
                        <div className="buy">
                            <button className="buying">Mua ngay</button>
                            <button className="add-to-cart">Thêm vào giỏ hàng</button>
                            <button className="before-buy-after-pay">Mua sau khi thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />                                       
        </>
    )
}

export default ProductDetail