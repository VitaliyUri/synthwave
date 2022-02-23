$(function() {
    var header         = $("#header"),
        introH         = $("#intro").innerHeight(),
        sections       = $(".section"),
        nav            = $("nav") 
        headerHeight   = navHeight = $("header").outerHeight();
        scrollOffset   = $(window).scrollTop();
    checkScroll(scrollOffset, introH);


    // header fixed
    $(window).on("scroll", function () {
        scrollOffset = $(this).scrollTop();
        checkScroll(scrollOffset, introH);
    })

    function checkScroll(scrollOffset, blockH) {
        if (scrollOffset > blockH) {
            $("#header").addClass("header--fixed");
        } else {
            $("#header").removeClass("header--fixed");
        }
    }

    // smooth scroll
    // $("[data-scroll]").on("click", function (event) {
    //     event.preventDefault();
    //     var $this = $(this),
    //         blockId = $this.data('scroll'),
    //         blockOffset = $(blockId).offset().top;
    //     $("#nav a").removeClass("active");
    //     $this.addClass("active");
    //     $("html, body").animate({
    //         scrollTop: blockOffset+1
    //     }, 800);
    // })

    // nav toggle
    $("#nav_toggle").on("click", function (e) {
        e.preventDefault();
        // scroll reset in navigation for phones
        $("#nav").animate({
            scrollTop: 0
        }, 0);
        $(this).toggleClass("active");
        $("#nav").toggleClass("active")
        if (!$("#nav").hasClass("active")) {
            checkScroll(scrollOffset);
        }
        // menu closing after clicking on links
        $("[data-scroll]").on("click", function(e) {
            $("#nav_toggle").removeClass("active");
            $("#nav").removeClass("active");
            $("body").css("overflow","scroll");
            checkScroll(scrollOffset);
        })
        if (!$("#header").hasClass("header--fixed")) {
            $("#header").addClass("header--fixed")
        }
        if ($("#nav_toggle").hasClass("active")) {
            $("body").css("overflow-y","hidden");
        }else {
            $("body").css("overflow-y","scroll");
        }
    })

    // collapse
    $("[data-collapse]").on("click", function(e){
        e.preventDefault();

        var collapseId = $(this).data("collapse");
        $(collapseId).slideToggle();
    })

    // nav switcher

    $(window).on("scroll", function () {
        sections.each(function () {
            var top     = $(this).offset().top - ($(window).height())/2,
                bottom  = top + $(this).outerHeight();

            if (scrollOffset >= top && scrollOffset <= bottom) {
                nav.find("a").removeClass("active");
                nav.find("a[data-scroll=\"#"+$(this).attr("id")+"\"]").addClass("active");
            }
        })
    })

    $('.reviews').slick({
        nextArrow: '<button type="button" class="reviews__btn reviews__btn--next">Previous</button>',
        prevArrow: '<button type="button" class="reviews__btn reviews__btn--prev">next</button>',
    })

    
    const animItems = document.querySelectorAll('._anim-items');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll)
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active')
                } else {
                    if (!animItem.classList.contains('_anim-no-repeat')) {
                        animItem.classList.remove('_active')
                    }
                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }

        setTimeout(() => {
            animOnScroll();
        }, 1000);
    }

    
});