const app = angular.module('MyApp', []);


app.controller('MainController', ['$http', function($http) {
  const controller = this;
  this.indexOfEdit;
  this.user = "Blog";
  this.createForm = {}
  this.showLogin = false;
  this.loggedIn = false;

  //Toggle Login
  this.toggleLogin = () => {
    this.showLogin = !this.showLogin;
  }

  this.toggleLogout = () => {
    this.loggedIn = !this.loggedIn;
  }

  // Create Blog
  this.createBlog = function() {
    $http({
      method: 'POST',
      url: '/blogs',
      data: {
        title: this.title,
        message: this.message
      }
    }).then(function(response) {
      this.createForm = {}
      controller.getBlogs();
    }, () => {
      console.log('error');
    });
  }

  // Show Blog
  this.getBlogs = function() {
    $http({
      method: 'GET',
      url: '/blogs',
    }).then(function(response) {
      controller.blogs = response.data;
    }, () => {
      console.log('error');
    });
  };
  this.getBlogs();

  // Delete Blog
  this.deleteBlog = function(param) {
    $http({
      method: 'DELETE',
      url: '/blogs/' + param._id
    }).then(
      function(response) {
        controller.getBlogs();
      },
      function(error) {
        console.log('error');
      }
    );
  }

  // Update Blog
  this.editBlog = function(param) {
    this.indexOfEdit = -1;
    $http({
      method: 'PUT',
      url: '/blogs/' + param._id,
      data: {
        title: param.title,
        message: param.message
      }
    }).then(
      function(response) {
        controller.getBlogs();
      },
      function(error) {
        console.log('error');
      }
    );
  }

  // Create New User
  this.createUser = function() {
    $http({
      method: 'POST',
      url: '/users',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response) {

    }, function() {
      console.log('error');
    });
  }

  // Log In
  this.logIn = function() {
    $http({
      method: 'POST',
      url: '/sessions',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response) {
      controller.loggedInUsername = response.data.user;
      controller.user = "Logged In"
    }, function() {
      console.log('error');
    });
  }

  // Log Out
  this.logOut = function() {
    $http({
      method: 'DELETE',
      url: '/sessions',
    }).then(function(response) {
      console.log('logged out');
      controller.user = "Blog"
      controller.toggleLogin();
      controller.loggedIn = false;
    }, function() {
      console.log('error');
    })
  }
}]);
