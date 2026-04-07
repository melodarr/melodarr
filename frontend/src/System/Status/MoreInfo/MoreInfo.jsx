import React, { Component } from 'react';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItemDescription from 'Components/DescriptionList/DescriptionListItemDescription';
import DescriptionListItemTitle from 'Components/DescriptionList/DescriptionListItemTitle';
import FieldSet from 'Components/FieldSet';
import Link from 'Components/Link/Link';
import translate from 'Utilities/String/translate';

class MoreInfo extends Component {

  //
  // Render

  render() {
    return (
      <FieldSet legend={translate('MoreInfo')}>
        <DescriptionList>
          <DescriptionListItemTitle>Home page</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            {/* TODO: Set up Melodarr website */}
            <Link to="https://github.com/melodarr/melodarr">github.com/melodarr/melodarr</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>Wiki</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            {/* TODO: Set up Melodarr wiki */}
            <Link to="https://github.com/melodarr/melodarr/wiki">github.com/melodarr/melodarr/wiki</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>Reddit</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            {/* TODO: Set up Melodarr subreddit */}
            <Link to="https://www.reddit.com/r/Melodarr/">/r/Melodarr</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>Discord</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            {/* TODO: Set up Melodarr Discord */}
            <Link to="https://github.com/melodarr/melodarr/discussions">github.com/melodarr/melodarr/discussions</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>Source</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://github.com/melodarr/melodarr/">github.com/melodarr/melodarr</Link>
          </DescriptionListItemDescription>

          <DescriptionListItemTitle>Feature Requests</DescriptionListItemTitle>
          <DescriptionListItemDescription>
            <Link to="https://github.com/melodarr/melodarr/issues">github.com/melodarr/melodarr/issues</Link>
          </DescriptionListItemDescription>

        </DescriptionList>
      </FieldSet>
    );
  }
}

MoreInfo.propTypes = {

};

export default MoreInfo;
