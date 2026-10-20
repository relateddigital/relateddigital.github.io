import {useLocation} from '@docusaurus/router';
import sdks from '@site/src/data/sdks';
import styles from './styles.module.css';

const SHARED_APK = '/downloads/android-test.apk';
const TESTFLIGHT_MAIL = 'mobiledevelopers@relateddigital.com';

function testflightHref(label) {
  const subject = `TestFlight daveti istiyorum - ${label}`;
  const body = [
    'Merhaba,',
    '',
    `${label} test uygulamasını denemek istiyorum.`,
    'TestFlight davetinin gelmesini istediğim e-posta adresimi aşağıya yazıyorum:',
    '',
    'E-posta adresim: (buraya kendi e-posta adresinizi yazın)',
    '',
  ].join('\n');
  return `mailto:${TESTFLIGHT_MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function TestApps({sdk}) {
  const both = sdk.mark === 'react' || sdk.mark === 'flutter';
  const showAndroid = both || sdk.mark === 'android';
  const showIos = both || sdk.mark === 'apple';

  return (
    <div className={styles.apps}>
      <span className={styles.caption}>Test Uygulamalarını Dene</span>
      <span className={styles.actions}>
        {showAndroid && (
          <a className={styles.action} href={sdk.apk || SHARED_APK} download>
            Android
          </a>
        )}
        {showIos && (
          <a className={styles.action} href={testflightHref(sdk.label)}>
            iOS
          </a>
        )}
      </span>
    </div>
  );
}

export default function SdkTitleNavbarItem({mobile = false}) {
  const {pathname} = useLocation();
  const sdk = sdks.find(
    (item) =>
      pathname === `/${item.routeBasePath}` ||
      pathname.startsWith(`/${item.routeBasePath}/`),
  );
  if (!sdk) {
    return null;
  }

  const title = (
    <>
      <img className={styles.logo} src={sdk.logo} alt="" />
      <span>{sdk.label}</span>
    </>
  );

  if (mobile) {
    return (
      <li className={`menu__list-item ${styles.mobile}`}>
        <span className={styles.title}>{title}</span>
        <TestApps sdk={sdk} />
      </li>
    );
  }

  return (
    <div className={`navbar__item ${styles.title}`}>
      {title}
      <TestApps sdk={sdk} />
    </div>
  );
}
