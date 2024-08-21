import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import type { NextPageWithLayout } from '@/types';
import GeneralLayout from '@/layouts/_general-layout';
import PageHeading from '@/components/ui/page-heading';
import GeneralContainer from '@/layouts/_general-container';
import { privacyPolicy } from '@/data/static/privacy-setting';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
const PrivacyPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.privacy}
      />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
        <PageHeading
          title={t('text-privacy-page-title')}
          subtitle={t('text-privacy-page-subtitle')}
        />
        <GeneralContainer>
          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Personal Information')}
            </h3>
            <div className="space-y-5 leading-6">
              {`"Ramp" is a trademark of Ramp Private Limited ("Company"), a company incorporated under the Companies Act, 2013 with its registered and corporate office at Plot 64H, Sector 18, Gudgeon 122001 in the course of its business. The domain name grocers.com is owned by the Company.

If you are a California resident, the information below also applies to you. Certain terms used in this section have the meanings given to them in the California Consumer Privacy Act of 2018 ("CCPA").`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Snap')}
            </h3>
            <div className="space-y-5 leading-6">
              {`Customer are advised to read and understand our Privacy Policy carefully, as by accessing the website/app you agree to be bound by the terms and conditions of the Privacy Policy and consent to the collection, storage and use of information relating to you as provided herein.

If you do not agree with the terms and conditions of our Privacy Policy, including in relation to the manner of collection or use of your information, please do not use or access the website/app.

Our Privacy Policy is incorporated into the Terms and Conditions of Use of the website/app, and is subject to change from time to time without notice. It is strongly recommended that you periodically review our Privacy Policy as posted on the App/Web.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Other Information')}
            </h3>
            <div className="space-y-5 leading-6">
              {`We may automatically track certain information about you based upon your behavior on the website. We use this information to do internal research on our users’ demographics, interests, and behavior to better understand, protect and serve our users. This information is compiled and analyzed on an aggregated basis. This information may include the URL that you just came from (whether this URL is on the website or not), which URL you next go to (whether this URL is on the website or not), your computer browser information, your IP address, and other information associated with your interaction with the website. We may also share your Mobile IP/Device IP with third party(ies) and to the best of our knowledge, be-life and representations given to us by these third party(ies) this information is not stored.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Third Party Advertisers')}
            </h3>
            <div className="space-y-5 leading-6">
              {`To protect against the loss, misuse and alteration of the information under its control, the Company has in place appropriate physical, electronic and managerial procedures. For example, the Company servers are accessible only to authorized personnel and your information is shared with employees and authorized personnel on a need to know basis to complete the transaction and to provide the services requested by you. Although the Company endeavour to safeguard the confidentiality of your personally identifiable information, transmissions made by means of the Internet cannot be made absolutely secure. By using the website, you agree that the Company will have no liability for disclosure of your information due to errors in transmission and/or unauthorized acts of third parties.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Protection of social security numbers')}
            </h3>
            <div className="space-y-5 leading-6">
              {`Customer are advised to read and understand our Privacy Policy carefully, as by accessing the website/app you agree to be bound by the terms and conditions of the Privacy Policy and consent to the collection, storage and use of information relating to you as provided herein.

If you do not agree with the terms and conditions of our Privacy Policy, including in relation to the manner of collection or use of your information, please do not use or access the website/app.`}
            </div>
          </div>
        </GeneralContainer>
      </div>
    </>
  );
};

PrivacyPage.getLayout = function getLayout(page) {
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

export default PrivacyPage;
