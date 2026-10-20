import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import sdks from '@site/src/data/sdks';
import styles from './styles.module.css';

function SdkCard({label, current, routeBasePath, logo}) {
  return (
    <div className="col col--4">
      <Link className={styles.sdkCard} to={`/${routeBasePath}`}>
        <img className={styles.logo} src={logo} alt="" />
        <Heading as="h3">{label}</Heading>
        <p className={styles.version}>Güncel kılavuz {current}</p>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {sdks.map((sdk) => (
            <SdkCard key={sdk.id} {...sdk} />
          ))}
        </div>
      </div>
    </section>
  );
}
