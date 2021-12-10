import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { gutter } from '../../utils/constants'
import { sizes } from '../../utils/media'

import Loader from '../Loader'
import ProductItem from './ProductItem'
import CleanA from '../CleanA'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  grid-gap: ${gutter * 2}px;

  @media (max-width: ${sizes.phone}px) {
    grid-gap: ${gutter}px;
  }
`

const ProductList = ({ loading, error, products }) => {
  if (loading) return <Loader />
  if (error) return <h1>Error</h1>

  return (
    <Grid>
      {products.map((product, i) => (
        <Link
          key={`${product.id}-${i}`}
          href='/pans/[name]'
          as={`/pans/${product.groupSlug}`}
          passHref
        >
          <CleanA>
            <ProductItem fullSize={false} product={product} />
          </CleanA>
        </Link>
      ))}
    </Grid>
  )
}

export default ProductList
