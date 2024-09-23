import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productsActions'
import { Container, Row, Col } from 'react-bootstrap'
import Product from '../Product'



function SellerScreen() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)

    const { error, loading, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]); // Add this empty dependency array

    console.log("userInfo", userInfo)

    const userProducts = userInfo ? products.filter(product => product.user === userInfo.id) : []



    return (
        <>
            {userInfo ? (
                <div>
                    {userProducts.length > 0 ? (
                        <Container>
                         <Row>
                         {userProducts.map((product) => (
                             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                 <Product product={product} />
                             </Col>
                         ))}
                     </Row>
                     </Container>
                    ) : (
                        <h1>No products</h1>
                    )}
                </div>
            ) : (
                <div>
                    <h1>Not Authorized</h1>
                </div>
            )}
        </>
    )
}

export default SellerScreen
