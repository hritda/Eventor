import { Btn } from '../../../../../AbstractElements'
import { AddToCart, AddToWishList, BuyNow } from '../../../../../utils/Constant'
import { FiUserPlus } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";

const ProductButtons = () => {
  return (
    <div className="m-t-15 btn-showcase">
      <Btn color="primary" href={`${process.env.PUBLIC_URL}/ecommerce/cart`}>
      <FiUserPlus size={15} color='white' />
        <span className='mx-2'>Enroll</span>
      </Btn>
      <Btn color="success" href={`${process.env.PUBLIC_URL}/ecommerce/checkout`}>
      <IoTimeOutline size={15} color='white' />
      <span className='mx-2'>Set reminder</span>
      </Btn>
      {/* <Btn color="secondary" href={`${process.env.PUBLIC_URL}/ecommerce/wishlist`}>
        <i className="fa fa-heart me-1" />
        {AddToWishList}
      </Btn> */}
    </div>
  )
}

export default ProductButtons