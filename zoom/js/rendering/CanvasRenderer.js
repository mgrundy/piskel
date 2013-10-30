(function () {

  var ns = $.namespace("pskl.rendering");
  ns.CanvasRenderer = function (frame, dpi) {
    this.frame = frame;
    this.dpi = dpi;
    this.transparentColor_ = 'white';
  };

  /**
   * Decide which color should be used to represent transparent pixels
   * Default : white
   * @param  {String} color the color to use either as '#ABCDEF' or 'red' or 'rgb(x,y,z)' or 'rgba(x,y,z,a)'
   */
  ns.CanvasRenderer.prototype.drawTransparentAs = function (color) {
    this.transparentColor_ = color;
  };

  ns.CanvasRenderer.prototype.render = function  () {
    var canvas = this.createCanvas_();
    var context = canvas.getContext('2d');
    for(var col = 0, width = this.frame.getWidth(); col < width; col++) {
      for(var row = 0, height = this.frame.getHeight(); row < height; row++) {
        var color = this.frame.getPixel(col, row);
        this.renderPixel_(color, col, row, context);
      }
    }

    return context;
  };

  ns.CanvasRenderer.prototype.renderPixel_ = function (color, col, row, context) {

    if(color == Constants.TRANSPARENT_COLOR) {
      color = this.transparentColor_;
    }
    context.fillStyle = color;

    context.fillRect(col * this.dpi, row * this.dpi, this.dpi, this.dpi);
  };

  ns.CanvasRenderer.prototype.createCanvas_ = function () {
    var width = this.frame.getWidth() * this.dpi;
    var height = this.frame.getHeight() * this.dpi;
    return pskl.CanvasUtils.createCanvas(width, height);
  };
})();