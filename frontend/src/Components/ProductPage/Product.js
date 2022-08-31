import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'

import Loader from '../Layout/Loader/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../Layout/Metadata'

const Product = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { id } = useParams()

  const { product, loading, error } = useSelector(
    (state) => state.productDetails,
  )
  console.log(product)
  useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(id))
  }, [dispatch, id, error, alert])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />

          <div>
            <Carousel>
              {product.image &&
                product.image.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Product
