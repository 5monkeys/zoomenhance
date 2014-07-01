ZOOM! ENHANCE!
==============

<a href="https://www.youtube.com/watch?v=LhF_56SxrGk">
  <img width=500 src="http://38.media.tumblr.com/f31196bf5e4599063e5ced92028efee3/tumblr_mp2x3h5odY1qzg3l3o1_1280.jpg" alt="Vector in on that guy over there...">
</a>

Zoom/enhance is a jQuery plugin that adds a zooming lens to high-resolution images.

**[Vector in on a demo](http://labs.5monkeys.se/zoomenhance.html).**

But how do *I* use it?
======================

First, download and add a `<script src=...>` tag after jQuery.

```javascript
$('.mcgyver img').zoomenhance();
```

Zoom/enhance only works on images at the time of writing, and always looks at the `src` attribute to determine which image is the high-resolution 'backing image.' It is a cakewalk to implement other facilities, and therefore left as an exercise for a future collaborator.

Ok, does it do cheap tricks?
============================

Most certainly. On initializing, pass a JavaScript object with options, like so:

```javascript
$('.mcgyver img').zoomenhance({ manualCss:  true,
                                zoomFactor: 2 });
```

So what are your options?

- **zoomFactor** is perhaps most important. When set, it's used to scale the backing image up or down. For example, with a zoom factor of two and an `<img>` element that is 300 pixels wide, the zoomed image will be enhanced to twice that size, i.e. 600 pixels. The default behavior is to show the picture at native resolution; this gives the crispest display as it incurs no smudging effects during interpolation.

- **manualCss** is described below, but basically prevents the plugin from adding a bunch of static CSS nonsense to the element's styling. Having the CSS in a stylesheet results in performance improvements, again, see below.

- **width** and **height** determine the size of the lens, which, being circular, should have a width equal to its height. The default is 200x200 pixels, i.e. a circle with a 100px radius.

- **hitboxPadding** sets the number of pixels *outside* the image that still trigger the lens to show. It can be useful if users need to look closely at edges of things. The default is five pixels.

I want it schnappy!
===================

Of course, nothing worthwhile is ever not schnappy, right? So, here are a few tips:

- Copy the CSS from the overlay element by means of manual labour. Strip pertinent dynamic CSS declarations like the positioning information, and use the `manualCss` option.

- Also add the following snippet to make the overlay its own [render layer](https://trac.webkit.org/wiki/Accelerated%20rendering%20and%20compositing):

  ```css
  .zoomenhance-overlay {
      declarations from previous step...
    
      -webkit-transform: translatez(0);
      -o-transform: translatez(0);
      transform: translatez(0);
  }
  ```

Questions, comments, feedback
=============================

Pull requests, issues and e-mails are welcome! Contact `ludvig` at `5monkeys`
dot `agency`.
