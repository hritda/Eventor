import { Card, CardBody } from 'reactstrap'
import { H3, LI, UL } from '../../../../../AbstractElements'
import { Brand } from '../../../../../utils/Constant'
import { brandDetailsData } from '../../ProductPage/ProductPage';

const ProductBrand = () => {
  return (
    <Card>
      <CardBody>
        <div className="filter-block">
          <H3>{Brand}</H3>
          <UL className="simple-list">
            {brandDetailsData.map((data,i)=>(
              <LI key={i}>
                {data}
              </LI>
            ))}
          </UL>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProductBrand