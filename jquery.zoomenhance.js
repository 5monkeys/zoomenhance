(function($) {
  // zoomenhance: Image zoomer
  $.fn.extend({
    zoomenhance: function(userOpts) {
      var defaults = { width: 200,
                       height: 200,
                       hitboxPadding: 5,
                       zoomFactor: undefined,
                       manualCss: false,
                       css: { cursor: 'none',
                              backgroundRepeat: 'no-repeat',
                              backgroundColor: '#ccc',
                              cursor: 'none',
                              border: '2px solid white',
                              boxShadow: '0 0 10px #777, 0 0 8px black inset, 0 0 20px white inset',
                              position: 'absolute'
                            }
                     };

      var opts = $.extend(defaults, (userOpts !== undefined) ? userOpts : {});

      return this.each(function() {
        var el = $(this);
        var src = el.attr('src');

        var overlay = $(document.createElement('div'));
        var overlayVisible = false;
        overlay.addClass('zoomenhance-overlay');

        if (!opts.manualCss) {
          var vec2dLength2 = function(x,y) { return Math.pow(x,2) + Math.pow(y,2); };
          var vec2dLength = function(x,y) { return Math.sqrt(vec2dLength2(x,y)); };
          overlay.css({ borderRadius: vec2dLength(opts.width/2,
                                                  opts.height/2) + 'px',
                        width:  opts.width  + 'px',
                        height: opts.height + 'px'
                      });
          overlay.css(opts.css);
        }

        overlay.appendTo(document.body);

        var imageWidth;
        var imageHeight;

        var updateImage = function(src, width, height) {
          overlay.css('backgroundImage', 'url(' + src + ')');

          if (opts.zoomFactor) {
            imageWidth = el.width()*opts.zoomFactor;
            imageHeight = el.height()*opts.zoomFactor;
            var bgSize = imageWidth + 'px '
                       + imageHeight + 'px';
            overlay.css({         'background-size': bgSize,
                          '-webkit-background-size': bgSize,
                             '-moz-background-size': bgSize,
                               '-o-background-size': bgSize });
          } else {
            imageWidth = width;
            imageHeight = height;
          }
        };

        var loadImageSize = function() {
          var src = el.attr('src');
          var sizeEl = $(document.createElement('img'));
          sizeEl.bind('load', function(ev) {
            if (ev.target.width*ev.target.height == 0) {
              return;
            }
            updateImage(src, ev.target.width, ev.target.height);
            $(this).remove();
          });
          sizeEl.attr('src', src);
          sizeEl.load();
        };

        var imageReloaded = function() {
          imageWidth = imageHeight = undefined;
          overlay.css('display', 'none');
          if (el.naturalWidth) {
            updateImage(el.attr('src'), el.naturalWidth, el.naturalHeight);
          }
          else {
            console.warn('getting image dimensions with unreliable method');
            loadImageSize();
          }
        };

        el.bind('load', imageReloaded);
        el.bind('error', imageReloaded);
        el.load();

        var mouseX;
        var mouseY;

        var relocate = function(ev) {
          if (imageWidth === undefined) {
            return;
          }

          if ((mouseX !== undefined) && mouseX == ev.pageX && mouseY == ev.pageY) {
            return;
          }

          mouseX = ev.pageX;
          mouseY = ev.pageY;

          var offset = el.offset();

          var elWidth = el.width();
          var elHeight = el.height();

          var elX = mouseX - offset.left;
          var elY = mouseY - offset.top;

          var overlayX = mouseX - opts.width/2;
          var overlayY = mouseY - opts.height/2;

          var x = Math.min(Math.max(elX / elWidth, 0), 1);
          var y = Math.min(Math.max(elY / elHeight, 0), 1);

          var zoomX = x*imageWidth - opts.width/2;
          var zoomY = y*imageHeight - opts.height/2;

          var outOfBounds = (Math.abs(elX - elWidth/2)  > (elWidth/2  + opts.hitboxPadding))
                         || (Math.abs(elY - elHeight/2) > (elHeight/2 + opts.hitboxPadding));

          overlay.css({backgroundPosition: (-zoomX) + 'px ' + (-zoomY) + 'px',
                       display: outOfBounds ? 'none' : 'block',
                       left: overlayX + 'px',
                       top: overlayY + 'px'});
        };

        $(document.body).bind('mousemove', relocate);
        el.bind('mousemove', relocate);
        overlay.bind('mousemove', relocate);
      });

    }
  });
})(jQuery || django.jQuery);
