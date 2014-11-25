!function ($) {
    $(function(){
        window.prettyPrint && prettyPrint()
    })
}(window.jQuery)

$(document).ready(function() {

    $.get( "/redis/config", function(data) {

        $("#keyContainer").html(data);

        $(".myform").click(function(){

            var values = {};

            var id = $(this).attr('id');
            var data2 = $("#" + id + ' :input').serializeArray();

            var numVariable = 0;
            for(var k=0; k<data2.length; k++) {
                var item = data2[k];

                if(item.name.indexOf("variable") > -1) {
                    numVariable = numVariable +1;
                }

                values[item.name] = item.value;
            }

            values["numVariable"] = numVariable;

            var formURL = $(this).attr("action");

            $.ajax({
                type: "POST",
                url : formURL,
                data : JSON.stringify(values),
                contentType: 'application/json',
                success:function(data, textStatus, jqXHR)
                {
                    $("#response").html(JSON.stringify(data, null, "\t"));
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    //if fails
                }
            });
        });
    });


});