import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import styled from 'styled-components';
import Link from "next/link";
import ProductGrid from "../src/components/ProductGrid";

const HeroTitle = styled.h1`
  font-weight: 700;
  font-size: 48px;
`;

export default function Home(props) {
  let products = props.products.map((p, i) => {
    return (
      <div key={p.product.id}>
        <Link href="/pans/[name]" as={`/pans/${p.product.groupSlug}`}>
          {p.product.name}
        </Link>
      </div>
    );
  });
  return (
    <div className={styles.container}>
      <HeroTitle>🍳🥘🔥</HeroTitle>
      <ProductGrid products={props.products.map((p) => p.product || [])} />
    </div>
  );
}

const client = new ApolloClient({
  uri: "https://api.styleseek.se/v1/graphql",
  cache: new InMemoryCache(),
});

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query panQuery {
        searchProducts(query: "stekpanna", limit: 20) {
          product {
            brand
            category
            currency
            description
            ean
            id
            groupSlug
            imageUrl
            manufacturerArticleNumber
            name
            price
            trackingUrl
          }
        }
      }
    `,
  });
  console.log(data);
  return {
    props: {
      products: data.searchProducts,
    },
  };
}
