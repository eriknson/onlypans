import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useRouter } from 'next/router';

export default function ProductPage(props) {
  const router = useRouter();
  return (
    <div>
      <h1>{props.product.name}</h1>
      <img src={props.product.imageUrl}></img>
    </div>
  );
}

const client = new ApolloClient({
  uri: 'https://api.styleseek.se/v1/graphql',
  cache: new InMemoryCache(),
});

export async function getStaticProps(context) {
  const name = context.params.name;
  const { data } = await client.query({
    query: gql`
      query MyQuery($name: String!) {
        product(where: { groupSlug: { _eq: $name } }) {
          brand
          name
          imageUrl
        }
      }
    `,
    variables: { name },
  });
  return {
    props: {
      product: data.product[0],
    },
  };
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
  });
  return {
    paths: data.searchProducts.map((p) => {
      return { params: { name: p.product.groupSlug } };
    }),
    fallback: false,
  };
}
