import { Card, Col, Container, Row } from 'reactstrap'
import ImageSlider from './ImageSlider/ImageSlider'
import ProductDetails from './ProductDetails/ProductDetails'
import ProductBrand from './ProductBrand/ProductBrand'
import ProductStatus from './ProductStatus/ProductStatus'
import ClothsDetails from './ClothsDetails/ClothsDetails'
import Breadcrumbs from '../../../../CommonElements/Breadcrumbs/Breadcrumbs'
import { Ecommerce, ProductPages } from '../../../../utils/Constant'
import { useEffect, useState } from 'react'
import { IEvent } from '../../../../DefinedTypes/types'

interface Props {
  event: IEvent|undefined
}
const ProductPageContainer = ({event}: Props) => {
 
  return (
    <>
      {/* <Breadcrumbs mainTitle={ProductPages} parent={Ecommerce} /> */}
      <Container fluid>
        <div>
          <Row className="product-page-main p-0">
            <ImageSlider />
            <ProductDetails event = {event}/>
            {/* <Col xxl="3" md="6" className="box-col-6">
              <ProductBrand />
              <ProductStatus />
            </Col> */}
          </Row>
        </div>
        {/* <Card>
          <Row className="product-page-main">
            <ClothsDetails />
          </Row>
        </Card> */}
      </Container>
    </>
  )
}

export default ProductPageContainer