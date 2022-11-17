$(document).ready(function() {
    // Set background image of a div on click of the button

    var width = $(window).width();
    let images = [];

    images = ['images/backgrounds/croppedglass.jpg', 'images/backgrounds/k8.jpg', 'images/backgrounds/776.jpg']
    if (width < 700) {
        images = ['images/backgrounds/3d-mobile.jpg', 'images/backgrounds/k8-mobile.jpg', 'images/backgrounds/776-mobile.jpg']
    }

    let index = 0;

    setInterval(changeImages, 5000)

    function changeImages() {
        var imageUrl = images[index]
        $("#firstPage").css("background-image", "url(" + imageUrl + ")");
        index = (index + 1) % images.length
    }

    // function changeBackgroundSmoothly() {
    //     $("#firstPage").fadeOut(1000,changeImages);
    // }


});



$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    $("#showModal").click(function() {
        $(".modal").addClass("is-active");
    });

    $(".modal-close").click(function() {
        $(".modal").removeClass("is-active");
    });
    $("#modal-cancel").click(function() {
        $(".modal").removeClass("is-active");
    });

    document.getElementById('modal-submit').addEventListener('click', e => {
        contact();
    })

});


function contact() {


    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-bottom-right",
        "showDuration": "300",
        "hideDuration": "500",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }






    let name = document.getElementById('the_name').value
    let email = document.getElementById('the_email').value
    let subject = document.getElementById('the_subject').value
    let message = document.getElementById('the_message').value



    if (validate(name, email, subject, message)) {


        let body = {
            name: name,
            subject: subject,
            email: email,
            message: message
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");



        fetch('https://gihan-server.azurewebsites.net/api/k8/sendMail', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(body),
            redirect: 'follow'
        }).then(function(data) {
            clearAll();
            toastr.success('Email sent. Check your email for more details :) ', 'Success !!!')

        }).catch(function(err) {
            console.log(err);
            toastr.error('There is a problem with our email server. Please send your emails manually', 'Our Bad !')
        })



    }

}

function clearAll() {

    document.getElementById('the_name').value = '';
    document.getElementById('the_email').value = '';
    document.getElementById('the_subject').value = '';
    document.getElementById('the_message').value = '';
    $(".modal").removeClass("is-active");
}

function validate(name, email, subject, message) {
    if (!name || !name.length > 0) {
        toastr.error('Please input your name', 'Sorry!')
        return false;
    }
    if (!email || !email.length > 0 || !email.includes('@')) {
        toastr.error('Please input your email', 'Sorry!')
        return false;
    }
    if (!subject || !subject.length > 0) {
        toastr.error('Please input a subject', 'Sorry!')
        return false;
    }
    if (!message || !message.length > 0) {
        toastr.error('Please input your valuable message', 'Sorry!')
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(function($el) {
            $el.addEventListener('click', function() {

                // Get the target from the "data-target" attribute
                var target = $el.dataset.target;
                var $target = document.getElementById(target);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});

document.querySelectorAll('.navbar-link').forEach(function(navbarLink) {
    navbarLink.addEventListener('click', function() {
        navbarLink.nextElementSibling.classList.toggle('is-hidden-mobile');
    })
});


function openTab(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("content-tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " is-active";
    AOS.refreshHard();
}

// smooth scroll
$(document).ready(function() {
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 50
            }, 1000, function() {

                // window.location.hash = hash;
            });
        } // End if
    });
});