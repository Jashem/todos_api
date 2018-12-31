$(document).ready(function(){
    $.getJSON('/api/todos')
     .then(showTodos)

     $("#todoInput").keypress(function(event){
         if(event.which == 13){
             createTodo();
         }
     })

     $(".list").on("click","span", function(event){
         event.stopPropagation();
         removeTodo($(this).parent());
     })

     $(".list").on("click","li", function(){
        updateTodo($(this));
    })
})


function showTodos(todos){
    todos.forEach(todo => {
        addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo = $('<li class="task">' +todo.name+ '<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed){
        newTodo.addClass("done")
    }
    $('.list').append(newTodo);
}

function createTodo(){
    var userInput = $("#todoInput").val();

    $.post('/api/todos', {name: userInput})
     .then(function(todo){
        $("#todoInput").val('');
        addTodo(todo);
     })
 }

 function removeTodo(todo){
    var url = '/api/todos/' + todo.data('id');
    $.ajax({
        method: "DELETE",
        url: url,
    })
     .then(function(message){
         todo.remove();
         console.log(message);
     })
 }

 function updateTodo(todo){
    var url = '/api/todos/' + todo.data('id');
    var done = !todo.data('completed');
    var data = {completed: done};
    $.ajax({
        method: "PUT",
        url: url,
        data: data,
    })
     .then(function(){
        todo.toggleClass("done");
        todo.data("completed", done);
     })
 }