
$(function(){

  var $todos = $('#todo-list');
  var $input = $('#input');

  var itemTemplate =" " +
  "<li>"+
  "{{content}}  "+
  "<button data-id='{{id}}' class='done'>done!</button>"+
  "</li>";

  function addTodo(todo){
    $todos.append(Mustache.render(itemTemplate, todo));
  }
  $.ajax({
      type: 'GET',
      url:'http://rest.learncode.academy/api/:lucy/:todo-items/',
      success: function(todos) {
        $.each(todos,  function(i, todo) {
          addTodo(todo);
        });
      },
      error: function(){
        alert('error loading list');
      }
    });
      $('#input-button').on ( 'click' , function(){

          var todo ={
          content:$input.val()
        };
        $.ajax({
          type:'POST',
          url:'http://rest.learncode.academy/api/:lucy/:todo-items/',
          data: todo,
          success: function(newTodo){
            addTodo(newTodo);
          },
          error: function(){
            alert('item error');
          }
      });
  });

$todos.delegate( '.done', 'click' , function(){
  var $li =$(this).closest ('li');
  $.ajax({
    type: 'DELETE'  ,
    url: 'http://rest.learncode.academy/api/:lucy/:todo-items/' + $(this).attr('data-id'),
    success: function(){
      $li.fadeOut(600, function(){
        $(this).remove() ;
      });
    }
  });
});

});
