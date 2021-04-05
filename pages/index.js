import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import firebase from "firebase/app";
import "@firebase/functions";
import "@firebase/analytics";
import "@firebase/auth";
import "@firebase/firestore";
import React from "react";
import { useAuth } from "../auth";
import Container from "../src/components/Container";
import { Flex, Box, Button, Text, Heading, Stack } from "@chakra-ui/core";

//import styles from "../styles/Home.module.css";
import styled from "styled-components";
import Link from "next/link";

//import ProductGrid from "../src/components/ProductGrid";

const HeroTitle = styled.h1`
  font-weight: 700;
  font-size: 48px;
`;

export default function Home(props) {
  const { user } = useAuth();
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
    <Container>
      <Flex>
        <Box w={500} p={4} my={12} mx={"auto"}>
          <Heading as="h2" textAlign="center">
            Welcome everyone.
          </Heading>
          <Text mt={8} textAlign="center">{`User ID: ${
            user ? user.uid : "No user signed in"
          }`}</Text>
          <Stack
            mt={8}
            alignItems="center"
            justifyContent="center"
            isInline
            width="100%"
          ></Stack>
          <Button
            variant="solid"
            variantColor="blue"
            width="100%"
            isDisabled={!user}
          >
            <Link href="/authenticated">
              <a>Go to authenticated route</a>
            </Link>
          </Button>
          <Button
            variant="solid"
            variantColor="green"
            width="100%"
            isDisabled={user}
          >
            <Link href="/login">
              <a>Go to authenticated route</a>
            </Link>
          </Button>
        </Box>
      </Flex>
    </Container>
    /* <div className={styles.container}>
      <HeroTitle>🍳🥘🔥</HeroTitle>
      <ProductGrid products={props.products.map((p) => p.product || [])} />
    </div> */
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
