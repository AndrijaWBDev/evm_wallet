import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/ui/button';
import {
  SUPPORT_LINK,
  SUPPORT_REQUEST_LINK,
} from '../../../helpers/constants/common';
import { isBeta } from '../../../helpers/utils/build-types';
var pjson = require('../../../../package.json');

export default class InfoTab extends PureComponent {
  state = {
    version: pjson.version,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  renderInfoLinks() {
    const { t } = this.context;

    return (
      <div className="settings-page__content-item settings-page__content-item--without-height">
        <div className="info-tab__link-header">{t('links')}</div>
        <div className="info-tab__link-item">
          <Button
            type="link"
            href="https://metamask.io/privacy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="info-tab__link-text"
          >
            {t('privacyMsg')}
          </Button>
        </div>
        <div className="info-tab__link-item">
          <Button
            type="link"
            href="https://metamask.io/terms.html"
            target="_blank"
            rel="noopener noreferrer"
            className="info-tab__link-text"
          >
            {t('terms')}
          </Button>
        </div>
        <div className="info-tab__link-item">
          <Button
            type="link"
            href="https://metamask.io/attributions.html"
            target="_blank"
            rel="noopener noreferrer"
            className="info-tab__link-text"
          >
            {t('attributions')}
          </Button>
        </div>
        <hr className="info-tab__separator" />
        <div className="info-tab__link-item">
          <Button
            type="link"
            href={SUPPORT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="info-tab__link-text"
          >
            {t('supportCenter')}
          </Button>
        </div>
        <div className="info-tab__link-item">
          <Button
            type="link"
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="info-tab__link-text"
          >
            {t('visitWebSite')}
          </Button>
        </div>
        <div className="info-tab__link-item">
          <Button
            type="link"
            href={SUPPORT_REQUEST_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="info-tab__link-text"
          >
            {t('contactUs')}
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { t } = this.context;

    return (
      <div className="settings-page__body">
        <div className="settings-page__content-row">
          <div className="settings-page__content-item settings-page__content-item--without-height">
            <div className="info-tab__item">
              <div className="info-tab__version-header">
                {isBeta() ? t('betaMetamaskVersion') : t('metamaskVersion')}
              </div>
              <div className="info-tab__version-number">
                {this.state.version}
              </div>
            </div>
            <div className="info-tab__item">
              <div className="info-tab__about">{t('builtAroundTheWorld')}</div>
            </div>
          </div>
          {/* {this.renderInfoLinks()} */}
        </div>
        {/* <div className="info-tab__logo-wrapper">
          <img src="./images/info-logo.png" className="info-tab__logo" alt="" />
        </div> */}
      </div>
    );
  }
}
