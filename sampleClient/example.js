// submit image:
function submitImage(e){
    var submit = {};
    var image = e.files[0]; // the first file
        
    var reader = new FileReader();
    reader.onloadend = function() {
        submit["sourceImage"] = reader.result;
        submit["name"] = "testingImage";
        submit["username"] = 'redjohn';
        
        // upload image
        $.post($("#urlsubmit").text(), submit , function(data, status){
            $("#submit").text(JSON.stringify(data));
        });
    }
    reader.readAsDataURL(image);
}

$(document).ready(function(){
    $("#image").click(function(){
        // apply transformations:
        // grayscale
        $.get($("#urlgrayscale").text(), function(data, status){
            $("#grayscale").text(JSON.stringify(data));
        });

        // rotate
        $.get($("#urlrotate").text(), function(data, status){
            $("#rotate").text(JSON.stringify(data));
        });

        // apply multiple transformations
        $.get($("#urlmultiple").text(), function(data, status){
            $("#multiple").text(JSON.stringify(data));
        });
    });
    // Account and Authentication
    
    $("#user").click(function(){
        // create user
        var newUser = {};
        newUser["username"] = "testuser";
        newUser["password"] = 'newencrypted';
        newUser["name"] = 'name';
        newUser["email"] = 'testuser@testemail.cl';

        $.post($("#urlCreateUser").text(), newUser , function(data, status){
            $("#createUser").text(JSON.stringify(data));
        });

        // get user data
        $.get($("#urluser").text(), function(data, status){
            $("#getUser").text(JSON.stringify(data));
        });

        // update user data
        $.ajax({
            url: $("#urlDelete").text(),
            type: 'PUT',
            data: JSON.stringify(newUser),
            success: function(response) {
                $("#updateUser").text(JSON.stringify(response));
            }
         });

        // delete user data
        $.ajax({
            url: $("#urlDelete").text(),
            type: 'DELETE',
            success: function(response) {
                $("#deleteUser").text(JSON.stringify(response));
            }
         });

         // get user data
         $.get($("#urllogin").text(), function(data, status){
             $("#login").text(JSON.stringify(data));
         });
     
         // get user data
         $.get($("#urllogout").text(), function(data, status){
             $("#logout").text(JSON.stringify(data));
         });
    });

});
