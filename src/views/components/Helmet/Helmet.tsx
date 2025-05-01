import React, { memo } from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';

function Helmet(props: { titleHelmet: string; contentHelmet: string }) {
  const { titleHelmet, contentHelmet } = props;
  return (
    <ReactHelmet>
      <title>{titleHelmet}</title>
      <meta name="description" content={contentHelmet} data-react-helmet="true" />
    </ReactHelmet>
  );
}

export default memo(Helmet);
