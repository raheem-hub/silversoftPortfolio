$(function () {
    "use strict";
    emailjs.init("SU227A8qMHQcY09yK");
     
    $('#ajax-contact').validator();
    $('#ajax-contact').on('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
        $("#submitbtn").attr("hidden",true);
        const data = $(this).serialize();
        console.log(data); // Log the serialized data for debugging

        // Parse the serialized data into an object
        const formData = data.split('&').reduce((obj, item) => {
            const [key, value] = item.split('=');
            obj[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
            return obj;
        }, {});

        // Create templateParams object
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message
        };

        // Send the email using EmailJS
        emailjs.send('service_90hq68g', 'template_guje0qo', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                $("#msgSubmit").removeClass("hidden");
                $("#submitbtn").attr("hidden",false);
                setTimeout(() => {
                    $("#msgSubmit").addClass("hidden");
                }, 5000);
                $('#ajax-contact')[0].reset(); // Reset the form
            }, function(error) {
                alert('FAILED...', error);
            });

        return false; // Prevent default form submission
    });
});