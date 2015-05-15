$(document).ready(function(){
       var title,author,date, id, json_data = {};
       $("#button").click(function(){
          var json = {};
          title=$("#title").val();
          author=$("#author").val();
          date=$("#releaseDate").val();
          json.title = title;
          json.author = author;
          json.releaseDate=date;
          $.ajax({
						type: 'POST',
						data: JSON.stringify(json),
				    contentType: 'application/json',
            url: 'http://localhost:3000/api/books',
              success: function(data) {
                   console.log(JSON.stringify(data));
                   var d = JSON.stringify(data)
                   if(d.indexOf('ERROR') == -1)
                   {
                     $("#hide").show();
                   }

                   else
                       $("#error").show();
                  }
              });
         });

         /*Data will be displayed in Bootstrap table*/
         $("#show").click(function(){
           $('#books').bootstrapTable('destroy');
            /*$.ajax({
  						type: 'GET',
              contentType: 'application/json',
              url: 'http://localhost:3000/api/books',
                success: function(response) {
                  console.log(JSON.stringify(response));
                  alert($('#books').bootstrapTable('getData'))
                    $('#books').bootstrapTable({
                      data: response
                    });//table
                    //$('#books').bootstrapTable("append", response);
                  }
                });*/
                $('#books').bootstrapTable({
                  url: 'http://localhost:3000/api/books',
                  refresh:true
                });
           });


           /*On Click of Delete Button a request will be fired to server
           which removes record from db and immediately removes row from
           bootstrap table*/
           $("#deletebtn").click(function(){
             var selects = $('#books').bootstrapTable('getSelections');
             ids = $.map(selects, function (row) {
                 return row._id;
             });
              $.ajax({
    						type: 'DELETE',
                contentType: 'application/json',
                url: 'http://localhost:3000/api/books/'+ids,
                  success: function(response) {
                    console.log(JSON.stringify(response));
                    $("#delete").show();
                    $('#books').bootstrapTable('remove', {
                      field: '_id',
                      values: ids
                    });
                    }
                  });
                  id = '';
             });
     });//end
