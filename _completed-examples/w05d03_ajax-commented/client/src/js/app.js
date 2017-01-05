// Run the init function when the document has loaded
// We're using the JQuery shorthand syntax instead of the longer
// $(document).ready(function(){})
// We need to do this because we are going to use elements from the DOM
// and bind events to them
$(init);

// Because we're going to use this variable repeatedly in the file
// it's probably a good idea to create a global variable which we could
// change at a later date
const API = 'http://localhost:4000';

function init() {
  // Only becuase we want some content on the page initially, we're
  // going to call the function that is going to display all users
  usersIndex();
  // Setup an eventListener for the `All Users` button in the nav
  // You could call `.usersIndex` and the function `usersIndex` ANYTHING
  // However, we're following a semi-RESTful design pattern so that we don't
  // get lost
  $('.usersIndex').on('click', usersIndex);

  // This eventHandler is going to build a form to create a new User.
  // For this example, we're going to use a modal from Bootstrap
  $('.usersNew').on('click', usersNew);

  // Because the form with the class of `.usersCreate` is added by JavaScript
  // we need to use Event Delegation to keep an key out for ANY element with
  // a class of `.usersCreate` that appear in the `body`
  $('body').on('submit', '.usersCreate', usersCreate);
  $('body').on('click', '.usersDelete', usersDelete);
  $('body').on('click', '.usersEdit', usersEdit);
  $('body').on('submit', '.usersUpdate', usersUpdate);
  $('body').on('click', '.usersShow', usersShow);

  $('body').on('click', '.projectsNew', projectsNew);
  $('body').on('submit', '.projectsCreate', projectsCreate);
  $('body').on('click', '.projectsDelete', projectsDelete);
  $('body').on('click', '.projectsEdit', projectsEdit);
  $('body').on('submit', '.projectsUpdate', projectsUpdate);
}

function usersNew(e){
  // This check for `e` is not required because the `usersNew` function is only
  // called from an eventListener (`.on`) function which will always pass `e`
  // as the first argument of its callback argument
  if (e) e.preventDefault();

  // We're adding a form for creating a user
  // We've given it a specific class of `usersCreate` so that we can setup an
  // eventListener to listen for its submission
  $('.modal-content').html(`
    <form method="post" action="${API}/users" class="usersCreate">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add User</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="user_name">Name</label>
          <input class="form-control" type="text" name="user[name]" id="user_name" placeholder="Name">
        </div>
        <div class="form-group">
          <label for="user_image">Image</label>
          <input class="form-control" type="text" name="user[image]" id="user_image" placeholder="Image">
        </div>
        <div class="form-group">
          <label for="user_github">Github</label>
          <input class="form-control" type="text" name="user[github]" id="user_github" placeholder="Github">
        </div>
        <div class="form-group">
          <label for="user_bio">Bio</label>
          <textarea class="form-control" name="user[bio]" id="user_bio" placeholder="Bio"></textarea>
        </div>
        <div class="form-group">
          <label for="user_website">Website</label>
          <input class="form-control" type="text" name="user[website]" id="user_website" placeholder="Website">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>`);

  $('.modal').modal('show');
}

function usersCreate(e){
  if (e) e.preventDefault();

  $.ajax({
    url: $(this).attr('action'),
    type: $(this).attr('method'),
    data: $(this).serialize()
  }).done(() => {
    usersIndex();
    $('.modal').modal('hide');
  });
}

// The first argument by default is the event that triggered this function
// This is becuase the JQuery .on method has been setup to do this
function usersIndex(e){
  // Without checking for `e` you would get "Cannot read property 'preventDefault' of undefined TypeError: Cannot read property 'preventDefault' of undefined"
  if (e) e.preventDefault();

  // We're using the shorthand JQuery `$.get` (XMLHttpRequest) instead of
  // $.ajax({
  //   url: `${API}/users`,
  //   type: 'GET'
  // })
  // to get the data about all of the users from the API
  $.get(`${API}/users`).done(data => {
    // We're selecting the `main` element using JQuery
    // and replacing it's entire content with a div with a class of `.users`
    $('main').html(`<div class="users"></div>`);
    // We're going to loop over the data that was returned from the ajax call
    // using the JQuery `$.each` (you could use `.forEach` or a `for` loop)
    //
    // `$.each`'s first argument is the index value of that item in the array
    // that you are looping over. The second (`.user`) is the item itself.
    $.each(data, (index, user) => {
      // We have DRYed up the logic of building some HTML using a single `user`
      // object and adding it into the `.users` div by putting it in a function
      addUser(user);
    });
  });
}

function addUser(user){
  // We can use the new ES6 template literal to build a multi-line string
  // which is great because we don't have to use string concatenation, e.g.
  // '<img src="' + user.image + '">'
  //
  // We're making sure that we add a class of `.usersShow` to the link
  // so that we can make another request to the SHOW action of our API
  $('.users').prepend(`
    <div class="user-tile">
      <img src="${user.image}">
      <a class="usersShow" href="${API}/users/${user._id}">
        <h2>${user.name}</h2>
      </a>
      <p>${user.bio}</p>
    </div>`);
}

function usersDelete(e){
  if (e) e.preventDefault();

  $.ajax({
    url: `${API}/users/${$(this).data('id')}`,
    type: 'delete'
  }).done(() => {
    usersIndex();
  });
}

function usersEdit(e){
  if (e) e.preventDefault();

  $.ajax({
    method: 'get',
    url: `${API}/users/${$(this).data('id')}`
  }).done(user => {
    $('.modal-content').html(`
      <form method="put" action="${API}/users/${user._id}" class="usersUpdate">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Add User</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="user_name">Name</label>
            <input class="form-control" type="text" name="user[name]" id="user_name" placeholder="Name" value="${user.name}">
          </div>
          <div class="form-group">
            <label for="user_image">Image</label>
            <input class="form-control" type="text" name="user[image]" id="user_image" placeholder="Image" value="${user.image}">
          </div>
          <div class="form-group">
            <label for="user_github">Github</label>
            <input class="form-control" type="text" name="user[github]" id="user_github" placeholder="Github" value="${user.github}">
          </div>
          <div class="form-group">
            <label for="user_bio">Bio</label>
            <textarea class="form-control" name="user[bio]" id="user_bio" placeholder="Bio">${user.bio}</textarea>
          </div>
          <div class="form-group">
            <label for="user_website">Website</label>
            <input class="form-control" type="text" name="user[website]" id="user_image" placeholder="Website" value="${user.website}">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>`);

    $('.modal').modal('show');
  });
}

function usersUpdate(e){
  if (e) e.preventDefault();

  const url = $(this).attr('action');

  $.ajax({
    method: $(this).attr('method'),
    url: url,
    data: $(this).serialize()
  }).done(() => {
    usersShow(null, url);
    $('.modal').modal('hide');
  });
}

function usersShow(e, url){
  if (e) e.preventDefault();

  $.ajax({
    method: 'GET',
    url: url || $(this).attr('href')
  }).done(user => {
    $('main').html(`
      <div class="user">
        <div class="user-tile">
          <img src="${user.image}">
          <h2 id="username">${user.name}</h2>
          <p>${user.bio}</p>
          <ul class="list-inline">
            <li><a href="https://github.com/${user.github}">Github</a></li>
            <li><a href="${user.portfolio}">Portfolio</a></li>
          </ul>
          <ul class="list-inline">
            <li><a href="#" class="usersEdit" data-id="${user._id}">Edit</a></li>
            <li><a data-id="${user._id}" class="usersDelete" href="#">Delete</a></li>
          </ul>
          <a class="projectsNew btn btn-primary" href="#" data-id="${user._id}">Add a project</a>
        </div>
      </div>
      <h2>Projects</h2>
      <div class="projectsIndex">
      </div>`
    );

    projectsIndex(user);
  });
}

function projectsNew(e){
  if (e) e.preventDefault();

  const id = $(this).data('id');

  $('.modal-content').html(`
    <form method="post" action="${API}/users/${id}/projects" class="projectsCreate" data-user_id="${id}">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add Project</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="project_title">Title</label>
          <input class="form-control" type="text" name="project[title]" id="project_title" placeholder="Title">
        </div>
        <div class="form-group">
          <label for="project_description">Description</label>
          <textarea class="form-control" name="project[description]" id="project_description" placeholder="Description"></textarea>
        </div>
        <div class="form-group">
          <label for="project_github">Github</label>
          <input class="form-control" type="text" name="project[github]" id="project_github" placeholder="Github">
        </div>
        <div class="form-group">
          <label for="project_website">Website</label>
          <input class="form-control" type="text" name="project[website]" id="project_website" placeholder="Website">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>`);

  $('.modal').modal('show');
}

function projectsCreate(e){
  if (e) e.preventDefault();

  $.ajax({
    url: $(this).attr('action'),
    type: $(this).attr('method'),
    data: $(this).serialize()
  }).done(() => {
    usersShow(null, `${API}/users/${$(this).data('user_id')}`);
    $('.modal').modal('hide');
  });
}

function projectsIndex(user) {
  $.each(user.projects, (index, project) => {
    addProject(user, project);
  });
}

function addProject(user, project){
  $('.projectsIndex').prepend(`
    <div class='project-tile'>
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <ul class="list-inline">
        <li><a href='https://github.com/${project.github}'>Github</a>
        <li><a href='${project.website}'>Website</a></li>
      </ul>
      <ul class="list-inline">
        <li><a href="#" class="projectsEdit" data-user_id="${user._id}" data-id="${project._id}">Edit</a></li>
        <li><a data-user_id="${user._id}" data-id="${project._id}" class="projectsDelete" href="#">Delete</a></li>
      </ul>
  </div>`);
}

function projectsDelete(e){
  if (e) e.preventDefault();

  $.ajax({
    url: `${API}/users/${$(this).data('user_id')}/projects/${$(this).data('id')}`,
    type: 'delete'
  }).done(() => {
    $(this).parents('.project-tile').remove();
  });
}

function projectsEdit(e){
  if (e) e.preventDefault();

  $.ajax({
    method: 'get',
    url: `${API}/users/${$(this).data('user_id')}/projects/${$(this).data('id')}`
  }).done(project => {
    $('.modal-content').html(`
      <form method="put" action="${API}/users/${$(this).data('user_id')}/projects/${project._id}" class="projectsUpdate" data-user_id="${$(this).data('user_id')}">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Edit Project</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="project_title">Title</label>
            <input class="form-control" type="text" name="project[title]" id="project_title" placeholder="Title" value="${project.title}">
          </div>
          <div class="form-group">
            <label for="project_description">Description</label>
            <textarea class="form-control" name="project[description]" id="project_description" placeholder="Description">${project.description}</textarea>
          </div>
          <div class="form-group">
            <label for="project_github">Github</label>
            <input class="form-control" type="text" name="project[github]" id="project_github" placeholder="Github" value="${project.github}">
          </div>
          <div class="form-group">
            <label for="project_website">Website</label>
            <input class="form-control" type="text" name="project[website]" id="project_website" placeholder="Website" value="${project.website}">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>`);

    $('.modal').modal('show');
  });
}

function projectsUpdate(e){
  if (e) e.preventDefault();

  $.ajax({
    url: $(this).attr('action'),
    method: $(this).attr('method'),
    data: $(this).serialize()
  }).done(() => {
    usersShow(null, `${API}/users/${$(this).data('user_id')}`);
    $('.modal').modal('hide');
  });
}
