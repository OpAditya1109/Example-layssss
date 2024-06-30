
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
        scroller: "#main"
    });
    function loader_page() {
        var tl = gsap.timeline();
        var canvasAnimationStarted = false;
    
        tl.from("#loader #frame1", {
            top: "100%",
            duration: 3,
            ease: "power4.out"
        });
    
        tl.to("#loader #frame1 #potato-ground", {
            y: -680,
            duration: 6,
            ease: "power4.inOut",
            onUpdate: function() {
                var progress = this.progress();
                if (progress >= 0.2) {
                    document.getElementById('potato-ground').src = 'images/loader-images/potato-ground-with-soil.png';
                }
            }
        }, "-=3");
    
        tl.to("#loader #frame1 #ground-img", {
            y: 700,
            duration: 5,
            ease: "power4.inOut"
        }, "-=5");
    
        tl.to("#loader #frame2", {
            rotate: "10deg",
            duration: 2,
            scale: 1.5,
            opacity: 1,
            ease: "power2.inOut"
        }, "-=4");
    
        tl.from("#loader #frame2 .img1", {
            y: -350,
            duration: 1.5,
            ease: "power4.out"
        }, "-=1");
    
        // Anime.js animation for .img1
        tl.add(function() {
            var img1 = document.querySelector('#loader #frame2 .img1');
            img1.style.transform = 'translate(-50%, -50%)'; // Reset any previous transformations
    
            anime.timeline({ loop: false })
                .add({
                    targets: '#loader #frame2 .img1',
                    scale: [1, 1.5],
                    rotate: '1turn',
                    duration: 2000,
                    easing: 'easeInOutSine',
                    borderRadius: ['0%', '50%'],
                    backgroundColor: ['#3d251e', '#FBB915'],
                    delay: 0
                })
                .add({
                    targets: '#loader #frame2 .img1',
                    translateX: [
                        { value: 250, duration: 1000, easing: 'easeInOutQuad' },
                        { value: -250, duration: 1000, easing: 'easeInOutQuad' }
                    ],
                    translateY: [
                        { value: -250, duration: 1000, easing: 'easeInOutQuad' },
                        { value: 250, duration: 1000, easing: 'easeInOutQuad' }
                    ]
                })
                .add({
                    targets: '#loader #frame2 .img1',
                    scale: 0.5,
                    duration: 2000,
                    easing: 'easeInOutQuad'
                })
                .add({
                    targets: '#loader #frame2 .img1',
                    opacity: 0,
                    duration: 1000,
                    easing: 'easeOutExpo',
                    complete: function() {
                        document.getElementById('canvas').style.display = 'block';
                    }
                });
        });
    
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var images = [];
        var currentIndex = 0;
        var totalImages = 38;
        var imagesLoaded = 0;
    
        for (var i = 26; i < 26 + totalImages; i++) {
            let img = new Image();
            img.src = `images/loader-images/potato-peeler/unscreen-0${i}.png`;
            img.onload = function() {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    console.log('All images loaded');
                }
            };
            img.onerror = function() {
                console.error(`Failed to load image: ${img.src}`);
            };
            images.push(img);
        }
    
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    
        function drawImage() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (images[currentIndex] && images[currentIndex].complete) {
                ctx.globalAlpha = 1;
                ctx.drawImage(images[currentIndex], 0, 0, canvas.width, canvas.height);
            }
        }
    
        function startCanvasAnimation() {
            gsap.to({}, {
                duration: totalImages / 25,
                repeat: 0,
                ease: "none",
                onUpdate: function() {
                    currentIndex = Math.floor(this.progress() * totalImages);
                    drawImage();
                },
                onComplete: function() {
                    var fadeOutInterval = setInterval(function() {
                        if (ctx.globalAlpha > 0) {
                            ctx.globalAlpha -= 0.05;
                            drawImage();
                        } else {
                            clearInterval(fadeOutInterval);
                        }
                    }, 20);
                }
            });
        }
    
        tl.add(function() {
            if (imagesLoaded === totalImages && !canvasAnimationStarted) {
                canvasAnimationStarted = true;
                setTimeout(startCanvasAnimation, 2000);
            }
        }, "+=0");
    
        tl.to("#loader #frame4", {
            scale: 1,
            duration: 1,
            onComplete: function() {
                var video = document.getElementById('myVideo');
                if (video) {
                    video.play();
                } else {
                    console.error('Video element not found');
                }
            }
        }, "+=4.5");
    
        tl.to("#loader #frame4 img", {
            scale: 1,
            duration: 1
        }, "+=2");
    
        tl.from(".bar", 2, {
            delay: 1,
            height: 0,
            stagger: {
                amount: 0.5,
            },
            ease: "power4.inOut",
            onComplete: function() {
                slider_page();
            }
        }, "repeat");
    
        // Simplified animation for debugging
      
    
        tl.to("#loader", {
            opacity: 0,
            onComplete: function() {
                document.getElementById('loader').style.display = 'none';
                document.body.style.overflowY = "scroll";
            }
        });
        
        tl.from(".wrapper", {
            bottom: "100%",
            ease: "steps(12)",
            duration: 2,
            onStart: function() {
                console.log('Wrapper animation started');
            },
            onComplete: function() {
                console.log('Wrapper animation completed');
            }
        }, "ashish");
    
        tl.to(".wrapper", {
            opacity: 1,
            duration: 1,
            onStart: function() {
                console.log('Wrapper opacity animation started');
            },
            onComplete: function() {
                console.log('Wrapper opacity animation completed');
            }
        }, "ashish");
    }
    
    function slider_page() {
        const slides = document.querySelectorAll(".slide");
        let counter = 0;
        const totalSlides = slides.length;
        const colors = ["rgb(38, 38, 38)", "rgb(177, 166, 216)", "rgb(79, 171, 201)"]; // Array of background colors
        const buttons = document.querySelectorAll(".btn button");
        
        slides.forEach((slide, index) => {
            slide.style.left = `${index * 100}%`;
        });
        
        const goPrev = () => {
            counter--;
            if (counter < 0) {
                counter = totalSlides - 1;
            }
            slideImage();
        }
        
        const goNext = () => {
            counter++;
            if (counter >= totalSlides) {
                counter = 0;
            }
            slideImage();
        }
        
        const goToSlide = (index) => {
            counter = index;
            slideImage();
        }
        
        const updateButtonColors = () => {
            buttons.forEach((button, index) => {
                if (index === counter) {
                    button.classList.remove("inactive");
                    button.classList.add("active");
                } else {
                    button.classList.remove("active");
                    button.classList.add("inactive");
                }
            });
        }
        
        const slideImage = () => {
            slides.forEach((slide) => {
                slide.style.transform = `translateX(-${counter * 100}%)`;
            });
            const color = colors[counter % colors.length];
            document.querySelector(".wrapper").style.backgroundColor = color;
            document.getElementById("nav-content").style.backgroundColor = color;
            updateButtonColors();
        }
        
        // Automatically change slides every 3 seconds
        setInterval(() => {
            goNext();
        }, 3000);
        
        // Add event listeners to buttons
        buttons.forEach((button, index) => {
            button.addEventListener("click", () => goToSlide(index));
        });
        
        // Initialize button colors
        updateButtonColors();
        
    }
    
    
        // Automatically change slides every 3 seconds
        

    function receipe_page() {
        document.addEventListener("DOMContentLoaded", function() {
            let items = document.querySelectorAll(".item");
            let itemHovers = document.querySelectorAll(".item-hover");
           
    
            if (items.length !== itemHovers.length) {
                console.error("The number of '.item' elements and '.item-hover' elements does not match.");
                return;
            }
    
            items.forEach(function(item, index) {
                let itemHover = itemHovers[index];
    
                item.addEventListener("mouseenter", function() {
                    gsap.fromTo(itemHover, 
                        { y: -100 }, // Initial state

                        { y: 0, duration: 2 } // Animation state
                        
                    );
                   
                    
                 
                    itemHover.style.opacity = "1";
                });
    
                item.addEventListener("mouseleave", function() {
                    itemHover.style.opacity = "0";
                });
            });
    


            // GSAP ScrollTrigger configuration
            gsap.registerPlugin(ScrollTrigger);
    
            ScrollTrigger.matchMedia({
                // For screens wider than 768px
                "(min-width: 768px)": function() {
                    gsap.from(".item", {
                        opacity: 0,
                        y: -150,
                        borderRadius: "20px",
                        duration: 2,
                        stagger: 0.5,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: ".pg-2 .item",
                            scroller: "body",
                            start: "top 80%",
                            end: "bottom 90%",
                            scrub: 2,
                            // markers: true
                        }
                    });
                },
                // For screens narrower than 768px
                "(max-width: 767px)": function() {
                    gsap.from(".item", {
                        opacity: 0,
                        y: -150,
                        borderRadius: "20px",
                        duration: 3,
                        stagger: 1,
                        scrollTrigger: {
                            trigger: ".pg-2 .item",
                            scroller: "body",
                            start: "top 80%",
                            end: "bottom -5%",
                            scrub: 2,
                            // markers: true
                        }
                    });
                }
            });
        });
    }
    
    receipe_page()
    function products_page() {
        console.log("products_page function called");
    
        let workInfoItem = document.querySelectorAll('.work-photo-item');
        workInfoItem.forEach(function(item, index) {
            item.style.zIndex = workInfoItem.length - index;
        });
    
        gsap.set(".work-photo-item", {
            clipPath: "inset(0px 0px 0px 0px)"
        });
    
        const animation = gsap.to('.work-photo-item:not(:last-child)', {
            clipPath: "inset(50% 50% 50% 50%)",
            stagger: 0.5,
            ease: "none"
        });
    
        ScrollTrigger.create({
            trigger: '.work',
            // scroller: "#main",
            start: "top top",
            end: "bottom bottom",
            animation: animation,
            scrub: 1,
           
        });
    
        console.log("ScrollTrigger created for animation");
    }

    function video_page(){
        var tl= gsap.timeline({
            scrollTrigger:{
                trigger:"#videoo",
                scroller:"body",
    
                start:"top top",
                end:"bottom top",
                pin:true,
        scrub:1
            }
        });
        
        
        
        tl.to(".heading",{
            x:-300,
            duration:3
        },"elem")
        
        tl.to(".left-text",{
            x:-1000,
            duration:3
        },"elem")
        
        tl.to(".right-text",{
            x:1000,
            duration:3
        },"elem")
        tl.to("#video-center",{
            scale:1,
            duration:3,
            // scrub:1
        },"elem")
        
        
    }

    function footer_page(){
        gsap.to("#footer-rockstar-name",{ 
            // opacity:1,
            // duration:0.5,
        
           
        })
        
        var tl = gsap.timeline();
        
        // Create a ScrollTrigger instance with options
        ScrollTrigger.create({
            trigger: "footer",
            scroller: "body",
    
            start: "top top",
            end: "bottom 60%",
            scrub: 2,
            pin: true,
            animation: tl // link the timeline to the ScrollTrigger
        });
        
        // Add animations to the timeline
        tl.from(".a", {
            y: 50,
            duration: 1,
            delay: 0.5,
            stagger: 0.15,
            opacity: 0
        });
        
    }
    window.addEventListener('load', function() {
        loader_page();
        slider_page();
        receipe_page()
        products_page()
        video_page();
        footer_page()
    });
    

