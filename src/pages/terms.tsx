import TermsAndCondition from '@/components/authors/terms';
import ErrorMessage from '@/components/ui/error-message';
import PageHeading from '@/components/ui/page-heading';
import routes from '@/config/routes';
import { useTermsAndConditions } from '@/data/terms-and-conditions';
import GeneralContainer from '@/layouts/_general-container';
import GeneralLayout from '@/layouts/_general-layout';
import Seo from '@/layouts/_seo';
import type { NextPageWithLayout } from '@/types';
import dayjs from 'dayjs';
import { isArray, isEmpty } from 'lodash';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMemo } from 'react';

const TermsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  // const {
  //   termsAndConditions,
  //   isLoading,
  //   error,
  //   loadMore,
  //   hasMore,
  //   isLoadingMore,
  // } = useTermsAndConditions({
  //   type: 'global',
  //   issued_by: 'Super Admin',
  //   limit: 10,
  //   is_approved: true,
  //   orderBy: 'created_at',
  //   sortedBy: 'DESC',
  // });

  // const getLastUpdateTermsDate = useMemo(() => {
  //   return (
  //     !isEmpty(termsAndConditions) &&
  //     isArray(termsAndConditions) &&
  //     termsAndConditions[0]?.created_at
  //   );
  // }, [termsAndConditions]);

  // if (error) return <ErrorMessage message={error?.message} />;

  return (
    <>
      <Seo
        title="Terms & Conditions"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.terms}
      />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
        <PageHeading
          title={t('text-terms-page-title')}
          subtitle={`Last updated on September 29, 2023`}
        />
        <GeneralContainer>
          {/* <TermsAndCondition
            hasMore={hasMore}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            loadMore={loadMore}
            terms={termsAndConditions}
          /> */}
          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Disclaimers and Limitation of Liability')}
            </h3>
            <div className="space-y-5 leading-6">
              {`The Website is provided "as is" and "as available" without any
              warranties, either expressed or implied. Pickbazar shall not be
              liable for any direct, indirect, incidental, special,
              consequential, or punitive damages resulting from the use or
              inability to use the Website.`}
            </div>
          </div>
          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Intellectual Property')}
            </h3>
            <div className="space-y-5 leading-6">
              {`The Website and its original content, features, and functionality are owned by [Your Company] and are protected by international copyright, trademark, and other intellectual property laws.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Privacy Policy')}
            </h3>
            <div className="space-y-5 leading-6">
              {`Your use of the Website is also governed by our Privacy Policy, which can be found [link to Privacy Policy]. By using the Website, you consent to the practices described in the Privacy Policy.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Use of the Website')}
            </h3>
            <div className="space-y-5 leading-6">
              {`You must be at least [Age] years old to use this Website. By using the Website, you represent and warrant that you are at least [Age] years old. You agree to use the Website for lawful purposes only and in a manner that does not infringe upon the rights of others.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Acceptance of Terms')}
            </h3>
            <div className="space-y-5 leading-6">
              {`By using this Website, you agree to comply with and be bound by these terms and conditions. If you do not agree to these terms, please do not use the Website.`}
            </div>
          </div>
        </GeneralContainer>
      </div>
    </>
  );
};

TermsPage.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60, // In seconds
  };
};

export default TermsPage;
