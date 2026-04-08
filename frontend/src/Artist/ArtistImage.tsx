// @ts-nocheck -- Converted from JSX. Pending type annotations.
import PropTypes from 'prop-types';
import React, { Component } from 'react';

function findImage(images, coverType) {
  return images.find((image) => image.coverType === coverType);
}

function getUrl(image, coverType, size) {
  const imageUrl = image?.url;

  if (imageUrl) {
    return imageUrl.replace(`${coverType}.jpg`, `${coverType}-${size}.jpg`);
  }
}

class ArtistImage extends Component {
  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    const pixelRatio = Math.ceil(window.devicePixelRatio);

    const { images, coverType, size } = props;

    const image = findImage(images, coverType);

    this.state = {
      pixelRatio,
      image,
      url: getUrl(image, coverType, pixelRatio * size),
      isLoaded: false,
      hasError: false,
    };
  }

  componentDidMount() {
    if (!this.state.url && this.props.onError) {
      this.props.onError();
    }
  }

  componentDidUpdate() {
    const { images, coverType, placeholder, size, onError } = this.props;

    const { image, pixelRatio } = this.state;

    const nextImage = findImage(images, coverType);

    if (nextImage && (!image || nextImage.url !== image.url)) {
      this.setState({
        image: nextImage,
        url: getUrl(nextImage, coverType, pixelRatio * size),
        hasError: false,
        // Don't reset isLoaded, as we want to immediately try to
        // show the new image, whether an image was shown previously
        // or the placeholder was shown.
      });
    } else if (!nextImage && image) {
      this.setState({
        image: nextImage,
        url: placeholder,
        hasError: false,
      });

      if (onError) {
        onError();
      }
    }
  }

  //
  // Listeners

  onError = () => {
    this.setState({
      hasError: true,
    });

    if (this.props.onError) {
      this.props.onError();
    }
  };

  onLoad = () => {
    this.setState({
      isLoaded: true,
      hasError: false,
    });

    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  //
  // Render

  render() {
    const { className, style, placeholder, lazy } = this.props;

    const { url, hasError, isLoaded } = this.state;

    if (hasError || !url) {
      return (
        <img className={className} style={style} src={placeholder} alt="" />
      );
    }

    const mergedStyle = isLoaded
      ? style
      : {
          ...style,
          backgroundImage: `url(${placeholder})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };

    return (
      <img
        className={className}
        style={mergedStyle}
        src={url}
        loading={lazy ? 'lazy' : undefined}
        onError={this.onError}
        onLoad={this.onLoad}
        rel="noreferrer"
        alt=""
      />
    );
  }
}

ArtistImage.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  coverType: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  lazy: PropTypes.bool.isRequired,
  overflow: PropTypes.bool.isRequired,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
};

ArtistImage.defaultProps = {
  size: 250,
  lazy: true,
  overflow: false,
};

export default ArtistImage;
