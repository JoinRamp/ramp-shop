import { ContactInfo } from '@/components/contact-us/contact-info';
import ContactForm from '@/components/contact-us/form';
import { LocationIcon } from '@/components/icons/contact/location-icon';
import { MailIcon } from '@/components/icons/contact/mail-icon';
import { PhoneIcon } from '@/components/icons/contact/phone-icon';
import * as socialIcons from '@/components/icons/social';
import Link from '@/components/ui/link';
import PageHeading from '@/components/ui/page-heading';
import routes from '@/config/routes';
import { useContactUs } from '@/data/contact';
import { useSettings } from '@/data/settings';
import GeneralLayout from '@/layouts/_general-layout';
import Seo from '@/layouts/_seo';
import { getIcon } from '@/lib/get-icon';
import type { CreateContactUsInput, NextPageWithLayout } from '@/types';
import { isEmpty } from 'lodash';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const ContactUsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  // const { settings } = useSettings();
  // const { contactDetails } = settings ?? {};
  let [reset, setReset] = useState<CreateContactUsInput | null>(null);
  // const { mutate, isLoading, isSuccess } = useContactUs();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<CreateContactUsInput> = (values) => {
    console.log('we haveeee', values);
    setIsLoading(true);
    emailjs
      .sendForm('service_ewzpuhk', 'template_oyo3xgg', 'form#contact-form', {
        publicKey: 'weDXa0EwuDJErDthv',
      })
      .then(
        () => {
          setIsLoading(false);
          setReset({
            name: '',
            email: '',
            subject: '',
            description: '',
          });
          toast.success('Message Sent');
        },
        (error) => {
          console.log('FAILED...', error, error.text);
          setIsLoading(false);
        },
      );
  };
  // useEffect(() => {
  //   if (isSuccess) {
  //     setReset({
  //       name: '',
  //       email: '',
  //       subject: '',
  //       description: '',
  //     });
  //   }
  // }, [isSuccess]);

  return (
    <>
      <Seo
        title="Contact us"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.contact}
      />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
        <PageHeading
          title={t('contact-us-title')}
          subtitle={t('contact-us-subtitle')}
        />
        <div className="flex w-full flex-col overflow-hidden rounded-md px-4 py-5 sm:px-6 sm:py-8 md:bg-light md:p-10 md:shadow-card md:dark:bg-dark-200 md:dark:shadow-none lg:flex-row lg:p-0">
          <div className="shrink-0 border-light-300 dark:border-dark-300 lg:w-[400px] lg:py-10 ltr:lg:border-r ltr:lg:pl-10 ltr:lg:pr-[72px] rtl:lg:border-l rtl:lg:pl-[72px] rtl:lg:pr-10 lg:dark:bg-dark-250 xl:w-[430px] xl:py-12 ltr:xl:pr-24 rtl:xl:pl-24">
            <h2 className="pb-2 text-lg font-medium text-dark dark:text-light md:text-xl">
              {t('contact-us-info-title')}
            </h2>
            <p className="font-medium leading-[1.8em]">
              {t('contact-us-info-subtitle')}
            </p>
            <div className="grid-cols-2 gap-x-5 gap-y-8 space-y-7 pt-9 sm:grid sm:space-y-0 md:gap-y-9 lg:block lg:space-y-9">
              <ContactInfo
                icon={<LocationIcon className="h-12 w-12" />}
                title={t('contact-us-office-title')}
                description={'17, Fatai Aina Close,  Ojodu Estate, Lagos State'}
              />
              <ContactInfo
                icon={<PhoneIcon className="h-10 w-10" />}
                title={t('contact-us-phone-title')}
                description={'+234 9123200364'}
              />
              <ContactInfo
                icon={<MailIcon className="h-10 w-10" />}
                title={t('contact-us-site-title')}
                description={'https://www.joinramp.co/'}
              />
            </div>
          </div>
          <div className="w-full flex-grow pt-12 lg:p-10 xl:p-12">
            <ContactForm
              onSubmit={onSubmit}
              reset={reset}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

ContactUsPage.getLayout = function getLayout(page) {
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

export default ContactUsPage;
