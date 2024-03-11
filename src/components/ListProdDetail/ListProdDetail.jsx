import ProductDetail from "../ProductDetail/ProductDetal";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

function ListProdDetail() {
    const [productDetail, setProductDetail] = useState([]);
    const {id} = useParams()

    useEffect(() => {
        fetch(`https://86yfl7-8080.csb.app/books/${id}`)
            .then(response => response.json())
            .then(data => setProductDetail(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    return (
        <ProductDetail product={productDetail}/>
    )
}

export default ListProdDetail;