// Parallax//


$(".img-parallax").each(function() {
  var img = $(this);
  var imgParent = $(this).parent();
  function parallaxImg() {
    var speed = img.data("speed");

    var imgY = imgParent.offset().top;
    var winY = $(this).scrollTop();
    var winH = $(this).height();
    var parentH = imgParent.innerHeight();

    var winBottom = winY + winH;
   

    if (winBottom > imgY && winY < imgY + parentH) {
      var imgBottom = (winBottom - imgY) * speed;
      //Store and calcualte the crop area (less than the height of the image) before it disapears from view.
      var imgTop = winH + parentH;
      //Final calculation of percentage difference of next image coverage.
      var imgPercent = (imgBottom / imgTop) * 100 + (50 - speed * 50);
     
    }
    //Applying css for the visual application of calculation.

    img.css({
      top: imgPercent + "%",
      transform: "translate(-0, -" + imgPercent + "%)" // 'translate(-50%, -50%)'
    });
  }


$(document).on({
    scroll: function() {
      parallaxImg();
    },
    ready: function() {
      parallaxImg();
    }
  });
});



//Opacity//

var block = $(".opacity");
var range = 150;
$(window).on("scroll", function() {
  var st = $(this).scrollTop();

  block.each(function() {
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();
    offset = offset + height / 500;
    $(this).css({ opacity: -0.1 + (st - offset + range) / range });
  });
});





//Background color animation//

window.sections = [...document.querySelectorAll(".color")];
window.lastScrollTop = window.pageYOffset;

document.body.style.background = window.sections[0].getAttribute("data-bg");

window.addEventListener("scroll", onScroll);

function onScroll() {
  // const scrollTop = window.pageYOffset;

  const section = window.sections
    .map(section => {
      const el = section;
      const rect = el.getBoundingClientRect();
      return { el, rect };
    })
	.find(section => section.rect.bottom >= window.innerHeight * 0.5);
	try {
		document.body.style.background = section.el.getAttribute("data-bg");
	} catch {

	}
}


//Nav menu//



function closeMenu(nav, burger) {
  nav.classList.toggle("nav-active");
  burger.classList.toggle("toggle");
}

function navLinkAnimation(links) {
  links.forEach((link, index) => {
	  
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
        0.3}s`;
    }
  });
}






var navSlide = () => {
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".nav-links");
  var navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeMenu(nav, burger);
        navLinkAnimation(navLinks);
      });
    });
	navLinkAnimation(navLinks);
    burger.classList.toggle("toggle");
  });
};

navSlide();
