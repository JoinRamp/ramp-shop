import type {
  CategoryQueryOptions,
  NextPageWithLayout,
  ProductQueryOptions,
  SettingsQueryOptions,
} from '@/types';
// import type { GetStaticProps } from 'next';
import Layout from '@/layouts/_layout';
// import { useProducts } from '@/data/product';
import Grid from '@/components/product/grid';
import { useRouter } from 'next/router';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
// import client from '@/data/client';
import { dehydrate, QueryClient, useQuery } from 'react-query';
// import { API_ENDPOINTS } from '@/data/client/endpoints';
import CategoryFilter from '@/components/product/category-filter';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getProductsFn } from '@/services/products';
import { useMemo } from 'react';
import { ProductType } from '@/types/product';
import { PageLoader } from '@/components/ui/loader/spinner/spinner';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PromoCarousel from '@/components/product/promo-carousel';

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   const queryClient = new QueryClient();
//   try {
//     await Promise.all([
//       queryClient.prefetchQuery(
//         [API_ENDPOINTS.SETTINGS, { language: locale }],
//         ({ queryKey }) =>
//           client.settings.all(queryKey[1] as SettingsQueryOptions),
//       ),
//       queryClient.prefetchInfiniteQuery(
//         [API_ENDPOINTS.PRODUCTS, { language: locale }],
//         ({ queryKey }) =>
//           client.products.all(queryKey[1] as ProductQueryOptions),
//       ),
//       queryClient.prefetchInfiniteQuery(
//         [API_ENDPOINTS.CATEGORIES, { limit: 100, language: locale }],
//         ({ queryKey }) =>
//           client.categories.all(queryKey[1] as CategoryQueryOptions),
//       ),
//     ]);
//     return {
//       props: {
//         ...(await serverSideTranslations(locale!, ['common'])),
//         dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//       },
//       revalidate: 60, // In seconds
//     };
//   } catch (error) {
//     //* if we get here, the product doesn't exist or something else went wrong
//     return {
//       notFound: true,
//     };
//   }
// };

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations('en', [
          'common',
          'form',
          'table',
          'widgets',
        ])),
      },
    };
  }
  return {
    props: {},
  };
};

function Products() {
  const { query } = useRouter();
  // const { products, loadMore, hasNextPage, isLoadingMore, isLoading } =
  //   useProducts({
  //     ...(query.category && { categories: query.category }),
  //     ...(query.price && { price: query.price }),
  //     sortedBy: 'DESC',
  //   });
  const productQuery = useQuery(['get_products'], () => {
    return getProductsFn();
  });

  const products = useMemo(() => {
    if (productQuery.data?.data) {
      return productQuery.data.data as ProductType[];
    }
    return [];
  }, [productQuery.isLoading, productQuery.data]);

  // if (productQuery.isLoading) <PageLoader text="Loading..." />;

  return (
    <Grid
      products={products}
      limit={3000}
      // onLoadMore={loadMore}
      // hasNextPage={hasNextPage}
      // isLoadingMore={isLoadingMore}
      isLoading={productQuery.isLoading}
    />
  );
}

// TODO: SEO text gulo translation ready hobe kina? r seo text gulo static thakbe or dynamic?
const Home: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="UI Design Resources, UI Kits, Wireframes, Icons and More"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.home}
      />
      {/* <CategoryFilter /> */}
      <PromoCarousel />
      <Products />
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
