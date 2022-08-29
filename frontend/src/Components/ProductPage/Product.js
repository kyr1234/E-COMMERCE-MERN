import React, { useEffect } from 'react'
import { getProductDetails, clearErrors } from '../../actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Layout/Loader/Loader'
import { useParams } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
function Product() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { product, error, loading } = useSelector((state) => state.product)
  console.log(product)
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(id))
  }, [dispatch, id])

  return (
    <div>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div>
          Hello
          <Carousel>
            {product.image &&
              product.image.map((item, i) => {
                ;<img
                  src={item.url}
                  key={item.url}
                  className="image"
                  alt={`${i}Slide`}
                />
              })}
          </Carousel>
        </div>
      )}
    </div>
  )
}

export default Product
