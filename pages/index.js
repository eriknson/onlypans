import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

import styles from "../styles/Home.module.css";
import Link from "next/link";

import ProductGrid from "../src/components/ProductGrid";

const firebaseConfig = {
  apiKey: "AIzaSyBBaXYMlmm_mKY7ls9fWroSXlBp5lCblBo",
  authDomain: "only-pans.firebaseapp.com",
  projectId: "only-pans",
  storageBucket: "only-pans.appspot.com",
  messagingSenderId: "167354933204",
  appId: "1:167354933204:web:3c5c4eb3236056baa28041",
  measurementId: "G-LFL5QMM87H",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
} else {
  firebase.app(); // if already initialized, use that one
}

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
      <h1>Featured pans</h1>
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
