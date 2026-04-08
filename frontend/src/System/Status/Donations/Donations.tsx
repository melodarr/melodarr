// @ts-nocheck -- Converted from JSX. Pending type annotations.
import React, { Component } from 'react';
import FieldSet from 'Components/FieldSet';
import Link from 'Components/Link/Link';
import translate from 'Utilities/String/translate';
import styles from '../styles.module.css';

class Donations extends Component {
  //
  // Render

  render() {
    return (
      <FieldSet legend={translate('Donations')}>
        <div className={styles.logoContainer} title="Radarr">
          <Link to="https://radarr.video/donate">
            <img
              className={styles.logo}
              src={`${window.Melodarr.urlBase}/Content/Images/Icons/logo-radarr.png`}
            />
          </Link>
        </div>
        <div className={styles.logoContainer} title="Melodarr">
          {/* TODO: Set up Melodarr donations page */}
          <Link to="https://github.com/melodarr/melodarr">
            <img
              className={styles.logo}
              src={`${window.Melodarr.urlBase}/Content/Images/Icons/logo-lidarr.png`}
            />
          </Link>
        </div>
        <div className={styles.logoContainer} title="Readarr">
          <Link to="https://readarr.com/donate">
            <img
              className={styles.logo}
              src={`${window.Melodarr.urlBase}/Content/Images/Icons/logo-readarr.png`}
            />
          </Link>
        </div>
        <div className={styles.logoContainer} title="Prowlarr">
          <Link to="https://prowlarr.com/donate">
            <img
              className={styles.logo}
              src={`${window.Melodarr.urlBase}/Content/Images/Icons/logo-prowlarr.png`}
            />
          </Link>
        </div>
        <div className={styles.logoContainer} title="Sonarr">
          <Link to="https://sonarr.tv/donate">
            <img
              className={styles.logo}
              src={`${window.Melodarr.urlBase}/Content/Images/Icons/logo-sonarr.png`}
            />
          </Link>
        </div>
      </FieldSet>
    );
  }
}

Donations.propTypes = {};

export default Donations;
