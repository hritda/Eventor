import { Col, Row } from 'reactstrap'
import { H4 } from '../../../../../AbstractElements'
import { RateNow } from '../../../../../utils/Constant'


const ProductRate = () => {
  return (
    <Row>
      <Col md="4">
        <H4 className="product-title f-w-600">{RateNow}</H4>
      </Col>
      <Col md="8">
        <div className="d-flex">
          {/* <CommonRating /> */}
          <span>(250 review)</span>
        </div>
      </Col>
    </Row>
  )
}

export default ProductRate