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

         $("#show").click(function(){
            $.ajax({
  						type: 'GET',
              contentType: 'application/json',
              url: 'http://localhost:3000/api/books',
                success: function(response) {
                  console.log(JSON.stringify(response));
                  $('#books').bootstrapTable({
                            data: response
                    });//table
                  }
                });
           });

           $("#deletebtn").click(function(){
              $.ajax({
    						type: 'DELETE',
                contentType: 'application/json',
                url: 'http://localhost:3000/api/books/'+id,
                  success: function(response) {
                    console.log(JSON.stringify(response));
                    $("#delete").show();
                    /*$('#books').bootstrapTable('remove', {
                      field: '_id',
                       values: ids
                     });*/
                     $(this).remove();
                    }
                  });
                  id = '';
             });

           /* click input actions */
         $('.table').on('check.bs.table', function(e, name, args) {
            id = name._id
            /*title=name._title;
            author=name._author
            date=name._releaseDate
            json_data.id = id
            json_data.title = title;
            json_data.author = author;
            json_data.releaseDate=date;*/
        });

        var selects = $('#books').bootstrapTable('getSelections');
        ids = $.map(selects, function (row) {
            return row.id;
        });

     });//end
