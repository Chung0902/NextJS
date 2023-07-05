import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axiosClient from '@/libraries/axiosClient';

function Products({ products }) {

  return (
    <>
      <Head>
        <title>Trang sản phẩm</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
    
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {products && products.map((p) => <Link style={{ height: '80px' }} key={p._id} href={`/products/${p._id}`}><h1>{p.name}</h1></Link>)}
          </div>
      
      }
    </>
  );
}

export default Products;

// getServerSideProps - Server-Side Rendering
export async function getServerSideProps() {
  try {
    const response = await axiosClient.get('/products');

    return {
      props: {
        products: response.data.payload,
      },

      // revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

// getStaticProps - Static-Side Generation
// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true,
//   };
// }

// export async function getStaticProps(req) {
//   try {
//     const response = await axiosClient.get('/products');

//     return {
//       props: {
//         products: response.data.payload,
//       },

//       // revalidate: 10,
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
// }