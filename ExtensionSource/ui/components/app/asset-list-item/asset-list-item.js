import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Identicon from '../../ui/identicon';
import ListItem from '../../ui/list-item';
import Tooltip from '../../ui/tooltip';
import InfoIcon from '../../ui/icon/info-icon.component';
import Button from '../../ui/button';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { useMetricEvent } from '../../../hooks/useMetricEvent';
import { ASSET_TYPES, updateSendAsset } from '../../../ducks/send';
import { SEND_ROUTE } from '../../../helpers/constants/routes';
import { SEVERITIES } from '../../../helpers/constants/design-system';
import { INVALID_ASSET_TYPE } from '../../../helpers/constants/error-keys';
import Typography from '../../ui/typography/typography';
import {
  COLORS,
  TYPOGRAPHY,
  FONT_WEIGHT,
  JUSTIFY_CONTENT
} from "../../../helpers/constants/design-system";
import { NETWORK_TO_NAME_MAP } from '../../../../shared/constants/network';

const AssetListItem = ({
  className,
  'data-testid': dataTestId,
  iconClassName,
  onClick,
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
  warning,
  primary,
  secondary,
  identiconBorder,
  isERC721,
  usdPrice,
  tokenName,
  chainId
}) => {
  const t = useI18nContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const sendTokenEvent = useMetricEvent({
    eventOpts: {
      category: 'Navigation',
      action: 'Home',
      name: 'Clicked Send: Token',
    },
  });
  const titleIcon = warning ? (
    <Tooltip
      wrapperClassName="asset-list-item__warning-tooltip"
      interactive
      position="bottom"
      html={warning}
    >
      <InfoIcon severity={SEVERITIES.WARNING} />
    </Tooltip>
  ) : null;

  const midContent = warning ? (
    <>
      <InfoIcon severity={SEVERITIES.WARNING} />
      <div className="asset-list-item__warning">{warning}</div>
    </>
  ) : null;

  const sendTokenButton = useMemo(() => {
    if (tokenAddress === null || tokenAddress === undefined) {
      return null;
    }
    return (
      <Button
        type="link"
        className="asset-list-item__send-token-button"
        onClick={async (e) => {
          e.stopPropagation();
          sendTokenEvent();
          try {
            await dispatch(
              updateSendAsset({
                type: ASSET_TYPES.TOKEN,
                details: {
                  address: tokenAddress,
                  decimals: tokenDecimals,
                  symbol: tokenSymbol,
                },
              }),
            );
            history.push(SEND_ROUTE);
          } catch (err) {
            if (!err.message.includes(INVALID_ASSET_TYPE)) {
              throw err;
            }
          }
        }}
      >
        {t('sendSpecifiedTokens', [tokenSymbol])}
      </Button>
    );
  }, [
    tokenSymbol,
    sendTokenEvent,
    tokenAddress,
    tokenDecimals,
    history,
    t,
    dispatch,
  ]);

  return (
    <ListItem
      className={classnames('asset-list-item', className)}
      data-testid={dataTestId}
      title={
        <button
          className="asset-list-item__token-button"
          onClick={() => {
            onClick(tokenAddress, chainId);
          }}
          title={`${primary} ${tokenSymbol}`}
        >
            <h2 title={tokenSymbol}>{tokenSymbol}</h2>
        </button>
      }
      titleIcon={titleIcon}
      subtitle={<h3 title={NETWORK_TO_NAME_MAP[chainId]}>{NETWORK_TO_NAME_MAP[chainId]}</h3>}
      onClick={() => {
        onClick(tokenAddress, chainId);
      }}
      icon={
        <Identicon
          className={iconClassName}
          diameter={32}
          address={tokenAddress}
          image={tokenImage}
          alt={`${primary} ${tokenSymbol? tokenSymbol : ""}`}
          imageBorder={identiconBorder}
        />
      }
      midContent={midContent}
      rightContent={
        
        <>
          <Typography
            color={COLORS.WHITE}
            fontWeight={FONT_WEIGHT.NORMAL}
          >
            <h2>{ (isNaN(usdPrice) === false && Number(usdPrice)>0) ?`$${usdPrice}` : '$0.00'}</h2>
          </Typography>          
          <Typography
            color={COLORS.NEUTRAL_GREY}
            fontWeight={FONT_WEIGHT.NORMAL}
          >            
            <h3>{`${primary} ${tokenName? tokenName : ""}`}</h3>
          </Typography>
        </>
        
      }
    />
  );
};

AssetListItem.propTypes = {
  className: PropTypes.string,
  'data-testid': PropTypes.string,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  tokenAddress: PropTypes.string,
  tokenSymbol: PropTypes.string,
  tokenDecimals: PropTypes.number,
  tokenImage: PropTypes.string,
  warning: PropTypes.node,
  primary: PropTypes.string,
  secondary: PropTypes.string,
  identiconBorder: PropTypes.bool,
  isERC721: PropTypes.bool,
};

AssetListItem.defaultProps = {
  className: undefined,
  'data-testid': undefined,
  iconClassName: undefined,
  tokenAddress: undefined,
  tokenImage: undefined,
  warning: undefined,
};

export default AssetListItem;
