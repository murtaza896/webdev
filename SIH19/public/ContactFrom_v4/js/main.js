
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="name"]');
    var phone = $('.validate-input input[name="phone"]');
    var message = $('.validate-input textarea[name="message"]');


    $('.validate-form').on('submit',function(){
        var check = true;

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }


        if($(phone).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(phone);
            check=false;
        }

        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);


function autofill()
{
    var locality = document.getElementById('locality');
    var state = document.getElementById('state');
    var city = document.getElementById('city');
    var district = document.getElementById('district');


}

// fetch('http://localhost:8000/autofill', {
//     method: 'GET',
//     headers: {
//         "Content-Type":"application/json"
//     }
// })
// .then(function(res){
//     console.log(res);
// });


// $("pincode").on('input', function(){
//     $.ajax({
//         url: "/autofill",
//         type: 'GET',
//         data: { "pincode": $("pincode").val(),
//                 "name": $("name").val()
//             },       
//         success: function(result){
//             result.forEach(element => {
//                 $("select").append("<option>" + element + "</option>");
//             });
//         }
//     });

//     console.log('I ran');
// });