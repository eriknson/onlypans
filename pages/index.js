import styled from 'styled-components'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { Text } from '@geist-ui/react'

import ProductGrid from '../src/components/product/ProductGrid'
import { useAuthContext } from '../src/context/AuthContext'
import { gutter } from '../src/utils/constants'
import { sizes } from '../src/utils/media'

const Container = styled.div`
  background: #f5f2ed;
  padding: ${gutter * 2}px;

  @media (max-width: ${sizes.phone}px) {
    padding: ${gutter}px;
  }
`

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 24px;
`

export default function Home(props) {
  const auth = useAuthContext()
  return (
    <Container>
      <TitleContainer>
        <Text h1>🍳 onlypans.se</Text>
      </TitleContainer>
      <ProductGrid products={props.products.map((p) => p.product || [])} />
    </Container>
  )
}

const client = new ApolloClient({
  uri: 'https://api.styleseek.se/v1/graphql',
  cache: new InMemoryCache(),
})

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query panQuery {
        searchProducts(query: "stekpanna", limit: 200) {
          product {
            brand
            category
            description
            id
            groupSlug
            imageUrl
            name
            price
            trackingUrl
            inStock
          }
        }
      }
    `,
  })
  return {
    props: {
      products: data.searchProducts,
    },
  }
}
