import { getDirection } from '@/lib/constants';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = getDirection(locale);
    return (
      <Html dir={dir}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />{' '}
          <link rel="icon" href="/favicon.png" />
          <meta
            name="description"
            content={'Ramp | New Customers, More Sales'}
          />
          <meta property="og:type" content={'website'} />
          <meta
            property="og:title"
            content={'Ramp | New Customers, More Sales'}
          />
          <meta
            property="og:description"
            content={'Ramp | New Customers, More Sales'}
          />
          <meta
            property="og:image"
            content="http://res.cloudinary.com/dc9kfp5gt/image/upload/v1724451002/RampIcon/nk4lnmcd8vhwhet6mvn8.svg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
