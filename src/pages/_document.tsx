import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <meta name='application-name' content='ProntoSaude' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='ProntoSaude' />
          <meta name='description' content='ProntoSaude - Vendas' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/icons/browserconfig.xml' />
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />

          <link rel='apple-touch-icon' href='/images/icons/apple-touch-icon-iphone-retina-120x120.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/images/icons/apple-touch-icon-ipad-retina-152x152.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/images/icons/apple-touch-icon-ipad-retina-152x152.png' />
          <link rel='apple-touch-icon' sizes='167x167' href='/images/icons/apple-touch-icon-ipad-retina-152x152.png' />

          <link rel='icon' type='image/png' sizes='32x32' href='/images/icons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/images/icons/favicon-16x16.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/images/icons/favicon.ico' />
          <link rel="stylesheet" href='/flash.css' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
          <script src="https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js"></script>
          <link rel="preconnect" href="https://cdn.jsdelivr.net/npm/pace-js@latest/pace-theme-default.min.css" />

          {/* <meta name='twitter:card' content='summary' /> */}
          {/* <meta name='twitter:url' content='https://yourdomain.com' /> */}
          {/* <meta name='twitter:title' content='PWA App' /> */}
          {/* <meta name='twitter:description' content='Best PWA App in the world' /> */}
          {/* <meta name='twitter:image' content='https://yourdomain.com/icons/android-chrome-192x192.png' /> */}
          {/* <meta name='twitter:creator' content='@felipeneuhauss' /> */}
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Iberiabrands App' />
          <meta property='og:description' content='ProntoSaude - Backoffice' />
          <meta property='og:site_name' content='PWA App' />
          <meta property='og:url' content='https://iberiabrands.pt' />
          <meta property='og:image' content='https://iberiabrands.pt/icons/apple-touch-icon.png' />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
