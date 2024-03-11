import './style.css';
import ProductItem from '../ProductItem/ProductItem';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList({ searchTerm }) {
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10); // Số lượng sản phẩm trên mỗi trang

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://86yfl7-8080.csb.app/books');
                setProductList(response.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 

    // Lọc danh sách sản phẩm dựa trên giá trị nhập vào từ ô tìm kiếm
    const filteredProducts = productList.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Tính chỉ mục bắt đầu và chỉ mục kết thúc của sản phẩm trên trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Hàm chuyển đến trang trước
    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Hàm chuyển đến trang tiếp theo
    const goToNextPage = () => {
        if (currentPage < Math.ceil(productList.length / productsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    
    return (
        <>
            <div className="product-container">
                <div className="product-list grid grid-cols-5 gap-2 mx-5">
                    {currentProducts.map((product, index) => (
                        <ProductItem key={index} product={product} />
                    ))}
                </div>
                
                <div className="pagination hideMb hideSm">
                    <ul className="product-list__pagination hideMb hideMd hideSm">
                        <li className="pagination-item">
                            <a href="#" className="pagination-item__link" onClick={goToPrevPage}>
                                <i className="pagination-item__icon fa-solid fa-angle-left"></i>
                            </a>
                        </li>
                        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
                            <li key={index} className="pagination-item">
                                <a href="#" className={`pagination-item__link ${currentPage === index + 1 ? 'pagination-item--active' : ''}`} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                        <li className="pagination-item">
                            <a href="#" className="pagination-item__link" onClick={goToNextPage}>
                                <i className="pagination-item__icon fa-solid fa-angle-right"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ProductList;
