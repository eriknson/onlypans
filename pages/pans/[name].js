import styled from 'styled-components'
import Link from 'next/link'
import { Text, Dot, Button } from '@geist-ui/react'
import { ArrowRightCircle } from '@geist-ui/react-icons'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useRouter } from 'next/router'

import { gutter } from '../../src/utils/constants'
import { sizes } from '../../src/utils/media'

const Container = styled.div`
  background: #f5f2ed;
  padding: ${gutter * 2}px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${sizes.phone}px) {
    padding: ${gutter}px;
  }
`

const ProductWrapper = styled.div`
  max-width: 800px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${gutter * 2}px;

  @media (max-width: ${sizes.phone}px) {
    display: flex;
    flex-direction: column-reverse;
  }
`

const Image = styled.img`
  background: #fff;
  width: 100%;
  padding: ${gutter * 2}px;
  border-radius: 2rem;

  @media (max-width: ${sizes.phone}px) {
    padding: ${gutter}px;
  }
`

const Info = styled.div``

const Brand = styled(Text)`
  margin: 0;
  line-height: 70%;
  margin-bottom: 24px;
`

const Name = styled(Text)`
  margin-top: 24px;
`

const Description = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 16;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const StockText = styled(Text)`
  margin-left: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline;
  font-size: 14px;
`

const CTA = styled.div``

const BackButton = styled.div``

export default function ProductPage(props) {
  const router = useRouter()
  return (
    <Container>
      <ProductWrapper>
        <Info>
          <Brand h1>{props.product.brand}</Brand>
          <Link
            key={props.product.id}
            href={`https://styleseek.se/product/${props.product.groupSlug}`}
            passHref
          >
            <Button auto type='success' iconRight={<ArrowRightCircle />}>
              Checkout
            </Button>
          </Link>
          <StockText type='secondary' p>
            <Dot type={props.product.inStock ? 'success' : 'warning'} />
            {props.product.inStock ? 'In stock' : 'Out of stock'}
          </StockText>
          <Name h3 b>
            {props.product.name}
          </Name>

          <Description p>{props.product.description}</Description>
        </Info>
        <Image src={props.product.imageUrl} />
      </ProductWrapper>
    </Container>
  )
}

const client = new ApolloClient({
  uri: 'https://api.styleseek.se/v1/graphql',
  cache: new InMemoryCache(),
})

export async function getStaticProps(context) {
  const name = context.params.name
  const { data } = await client.query({
    query: gql`
      query MyQuery($name: String!) {
        product(where: { groupSlug: { _eq: $name } }) {
          brand
          name
          description
          inStock
          trackingUrl
          groupSlug
          price
          imageUrl
        }
      }
    `,
    variables: { name },
  })
  return {
    props: {
      product: data.product[0],
    },
  }
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query panQuery {
        searchProducts(query: "stekpanna", limit: 2000) {
          product {
            groupSlug
          }
        }
      }
    `,
  })
  return {
    paths: data.searchProducts.map((p) => {
      return { params: { name: p.product.groupSlug } }
    }),
    fallback: false,
  }
}
