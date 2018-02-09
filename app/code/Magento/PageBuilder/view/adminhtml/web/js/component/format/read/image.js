/*eslint-disable */
define(["../../../utils/image"], function (_image) {
  /**
   * Copyright © Magento, Inc. All rights reserved.
   * See COPYING.txt for license details.
   */
  var Image =
  /*#__PURE__*/
  function () {
    function Image() {}

    var _proto = Image.prototype;

    /**
     * Read heading type and title from the element
     *
     * @param element HTMLElement
     * @returns {Promise<any>}
     */
    _proto.read = function read(element) {
      var mainImageElement = element.querySelector("img:nth-child(1)");
      var imageLinkElement = element.querySelector("a");
      var captionElement = element.querySelector("figcaption");
      var response = {
        image: (0, _image.decodeUrl)(mainImageElement.getAttribute("src") || ""),
        mobile_image: "",
        alt: mainImageElement.getAttribute("alt"),
        title_tag: mainImageElement.getAttribute("title"),
        image_caption: captionElement ? captionElement.textContent : "",
        link_target: imageLinkElement ? imageLinkElement.getAttribute("target") : "",
        link_url: imageLinkElement ? imageLinkElement.getAttribute("href") : ""
      }; // Detect if there is a mobile image and update the response

      if (element.querySelector("img:nth-child(2)") && element.querySelector("img:nth-child(2)").getAttribute("src")) {
        response.mobile_image = (0, _image.decodeUrl)(element.querySelector("img:nth-child(2)").getAttribute("src"));
      }

      return Promise.resolve(response);
    };

    return Image;
  }();

  return Image;
});
//# sourceMappingURL=image.js.map
