
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: []
};

var nutrition = (localStorage.setItem("nutrition", JSON.stringify(nutrition))) ? JSON.parse(localStorage.getItem("nutrition")):{
    caloriesArr: [0],
    caloriesDone: [0]
};



// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

renderTodoList();

// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function() {
  var value = document.getElementById('item').value;
  if (value) {
    addItem(value);
  }
});

document.getElementById('item').addEventListener('keydown', function (e) {
  var value = this.value;
  if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
    addItem(value);
  }
});


    
    var suggesstedCalories;

    var ingredients = [
        {
            name:"banana",
            calories:89
        },
        {
            name:"pear",
            calories:57
        },
        {
            name:"apple",
            calories:52
        },
        {
            name:"lemon",
            calories:29
        },
        {
            name:"tomato",
            calories:18
        },
        {
            name:"chicken",
            calories:239
        },
        {
            name:"eggs",
            calories:44
        },
        {
            name:"broccoli",
            calories:44
        },
        {
            name:"cheese",
            calories:44
        },
        {
            name:"shake",
            calories:4400
        }
    ]
   
    // ####################### NEWLY IMPLEMENTED getSum() & addCalories() FUNCTIONS
    function getSum() {
      var sum = 0;
      for (var i in data.completed) { // Goes through completed items
        var calories = data.completed[i].split(' ').slice(-1)[0];  // Gets the number part
        sum += parseFloat(calories); // Adds to sum
      }
      return sum;
    }

     function addCalories(item) {
        document.getElementById("calories").innerHTML = getSum() + "/" + suggesstedCalories;
    }
    
    var caloriesDone =  nutrition.caloriesArr.reduce(getSum);

function addItem (value) {
    
  var index = value.indexOf(" ");  // Gets the first index where a space occours
  var amount = value.substr(0, index);  // Gets the number part
  var text = value.substr(index + 1);  // Gets the text part
    
  var ingNo = ingredients.map(function(e) { return e.name; }).indexOf(text); //Matches the ingredient name with value provided
  var ingCalories;
  if (ingNo == -1) {ingCalories = null;} else {ingCalories = ingredients[ingNo].calories;}
    
  var caloriesEaten = amount / 100 * ingCalories;
  
  // Checks if it is an ingredient or a random string and adds it to the DOM
  if (ingCalories == null){
        addItemToDOM(value);
    } else {
        addItemToDOM(text + " " + caloriesEaten);
    }
  // Checks if it is an ingredient or a random string and adds it to the array
  document.getElementById('item').value = '';
  if (ingCalories == null){
        data.todo.push(value);
    } else {
        data.todo.push(text + " " + caloriesEaten);
    }
    
  if (caloriesEaten == NaN) {caloriesArr.push(null);}else{nutrition.caloriesArr.push(caloriesEaten);}    
    

  
  dataObjectUpdated();
    
}
var circle;

window.onload = function progressBar() {
    circle = new ProgressBar.Circle('#progress', {
        color: '#25b99a',
        duration: 2000,
        easing: 'easeInOut'
    });
    
    circle.animate(0.01);
    document.getElementById('id01').style.display='block'
};

function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemToDOM(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemToDOM(value, true);
  }
    
}

function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
    /*
  if (amount === caloriesEaten) {
      nutrition.caloriesArr.splice(nutrition.caloriesArr.indexOf(caloriesEaten), 1)
  } else {
      nutrition.caloriesArr.splice(nutrition.caloriesArr.indexOf(caloriesEaten), 1)
  }
    */
  addCalories() // ####################### UPDATES COMPUTATION OF CALORIES ONCE ITEM IS REMOVED
  dataObjectUpdated();
  
  parent.removeChild(item);
}

function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();

  // Check if the item should be added to the completed list or to re-added to the todo list
  var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');
  addCalories();
  circle.animate(nutrition.caloriesDone.reduce(getSum)/suggesstedCalories.toFixed(0));
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemToDOM(text, completed) {
  var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');

  var item = document.createElement('li');
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  // Add click event for removing the item
  remove.addEventListener('click', removeItem);

  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  // Add click event for completing the item
  complete.addEventListener('click', completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var gender = document.getElementById("gender").value;

function caloriesRecommended() {
                
    var gender = prompt("What is your gender?");
    var genderArray = ["male","female"];
    var checkGender = genderArray.indexOf(gender);
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    var age = document.getElementById("age").value;
    var activity = document.getElementById("activity").value;
    var output = document.getElementById("output");
    var levels = [1.2,1.4,1.6,1.8,1.95];
    var multiplicator = levels[activity-1];
    var bmr="";


    if (checkGender==0){
        bmr = +(13.75*weight) + +(5*height) + -(6.76*age) + +66;
        suggesstedCalories = bmr * multiplicator;
    } else {
        bmr= +(9.56*weight) + +(1.85*height) + -(4.68*age) + +655;
        suggesstedCalories = bmr * multiplicator;
    };
    document.getElementById("calories").innerHTML = nutrition.caloriesArr.reduce(getSum) + "/" + suggesstedCalories.toFixed(0);
    document.getElementById('id01').style.display='none';
    
    }