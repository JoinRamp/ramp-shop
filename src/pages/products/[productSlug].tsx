import Single from '@/components/product/single';
import ItemNotFound from '@/components/ui/item-not-found';
import { PageLoader } from '@/components/ui/loader/spinner/spinner';
// import { getStaticPaths, getStaticProps } from '@/data/ssr/products.ssr';
import Layout from '@/layouts/_layout';
import { getProductDetailFn } from '@/services/products';
import type { NextPageWithLayout } from '@/types';
import type { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
// export { getStaticPaths, getStaticProps };

const ProductPage = () => {
  const { query } = useRouter();

  const productQuery = useQuery(['get_product', query.productSlug], () => {
    return getProductDetailFn(query.productSlug as string);
  });

  const products = useMemo(() => {
    if (productQuery.data?.data) {
      return productQuery.data.data;
    }
    return [];
  }, [productQuery.isLoading, productQuery.data]);

  if (productQuery.isLoading) {
    return (
      <div className="py-32">
        <PageLoader />
      </div>
    );
  }

  if (productQuery.isError && !productQuery.isLoading) {
    <div className="py-32">
      <ItemNotFound title="No help found 😔" message="" />
    </div>;
  }

  return <Single products={products} />;
};

ProductPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

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
export default ProductPage;
