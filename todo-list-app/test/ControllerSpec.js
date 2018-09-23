/*global app, jasmine, describe, it, beforeEach, expect */

describe('controller', function () {
	'use strict';

	var subject, model, view;

	var setUpModel = function (todos) {
		model.read.and.callFake(function (query, callback) {
			callback = callback || query;
			callback(todos);
		});

		model.getCount.and.callFake(function (callback) {

			var todoCounts = {
				active: todos.filter(function (todo) {
					return !todo.completed;
				}).length,
				completed: todos.filter(function (todo) {
					return !!todo.completed;
				}).length,
				total: todos.length
			};

			callback(todoCounts);
		});

		model.remove.and.callFake(function (id, callback) {
			callback();
		});

		model.create.and.callFake(function (title, callback) {
			callback();
		});

		model.update.and.callFake(function (id, updateData, callback) {
			callback();
		});
	};

	var createViewStub = function () {
		var eventRegistry = {};
		return {
			render: jasmine.createSpy('render'),
			bind: function (event, handler) {
				eventRegistry[event] = handler;
			},
			trigger: function (event, parameter) {
				eventRegistry[event](parameter);
			}
		};
	};

	beforeEach(function () {
		model = jasmine.createSpyObj('model', ['read', 'getCount', 'remove', 'create', 'update']);
		view = createViewStub();
		subject = new app.Controller(model, view);
	});

	it('should show entries on start-up', function () {
		// TODO: write test
		//----->Test Start<-----

		var todo ={}; //sets up an empty todo
		setUpModel([todo]); //sets up model

		subject.setView(''); //sets the view

		expect(view.render).toHaveBeenCalledWith('showEntries',[todo]);
		//expects view to render and to show entries of empty array

		//----->Test Finish<-----


	});

	describe('routing', function () {

		it('should show all entries without a route', function () {
			var todo = {title: 'my todo'};
			setUpModel([todo]);

			subject.setView('');

			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
		});

		it('should show all entries without "all" route', function () {
			var todo = {title: 'my todo'};
			setUpModel([todo]);

			subject.setView('#/');

			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
		});

		it('should show active entries', function () {
			// TODO: write test

			//----->Test Start<-----
			var todo = {title:"testTodo", completed:false}; //sets a todo as completed false

			setUpModel([todo]); //sets up model with todo as argument

			subject.setView('#/active'); //sets view to active

			// will return true if the constructor matches the tested value
			expect(model.read).toHaveBeenCalledWith({completed:false},jasmine.any(Function));

			expect(view.render).toHaveBeenCalledWith('showEntries',[todo]); //returns true if showEntries is called with the todo array

			expect(todo.completed).toEqual(false); //ensuring the todos are still uncompleted
		
			//----->Test Finish<-----

		});




		//});

		it('should show completed entries', function () {
			// TODO: write test
			
			//----->Test Start<-----

			var todo={title:'testTodo',completed:true}; //sets up a completed todo

			setUpModel([todo]); //sets up model with the completed todo

			subject.setView('#/completed'); //sets active view to completed

			//will return true if the constructor matches the tested value
			expect(model.read).toHaveBeenCalledWith({completed:true},jasmine.any(Function));

			expect(view.render).toHaveBeenCalledWith('showEntries',[todo]); 
			//returns true if showEntries is called with the todo array

			expect(todo.completed).toEqual(true); 
			//ensuring the todos are completed
		
			//----->Test Finish<-----


		});
	});

	it('should show the content block when todos exists', function () {
		setUpModel([{title: 'my todo', completed: true}]);

		subject.setView('');

		expect(view.render).toHaveBeenCalledWith('contentBlockVisibility', {
			visible: true
		});
	});

	it('should hide the content block when no todos exists', function () {
		setUpModel([]);

		subject.setView('');

		expect(view.render).toHaveBeenCalledWith('contentBlockVisibility', {
			visible: false
		});
	});

	it('should check the toggle all button, if all todos are completed', function () {
		setUpModel([{title: 'my todo', completed: true}]);

		subject.setView('');

		expect(view.render).toHaveBeenCalledWith('toggleAll', {
			checked: true
		});
	});

	it('should set the "clear completed" button', function () {
		var todo = {id: 42, title: 'my todo', completed: true};
		setUpModel([todo]);

		subject.setView('');

		expect(view.render).toHaveBeenCalledWith('clearCompletedButton', {
			completed: 1,
			visible: true
		});
	});

	it('should highlight "All" filter by default', function () {
		// TODO: write test
	
	//----->Test Start<-----


	var currentPage ='';
	//sets currentPage to empty
	
	setUpModel([]);
	//sets up model

	subject.setView('');
	//sets up view

	expect(view.render).toHaveBeenCalledWith('setFilter',currentPage);
	//expects to have been called with set filter on current page

	//----->Test Finish<-----

	});

	it('should highlight "Active" filter when switching to active view', function () {
		// TODO: write test
	

		//----->Test Start<-----

		var currentPage ='active';
		//sets current page to active

		setUpModel([]);
		//sets model

		subject.setView('#/active'); 
		//sets to active view

		expect(view.render).toHaveBeenCalledWith('setFilter', currentPage); 
		//should be called with set filter and current page


		//----->Test Finish<-----



	});

	describe('toggle all', function () {
		


		//----->Test Start<-----
		
		beforeEach(function(){
			var todos = [{id:1,title:'testTodo1',completed:false},
							{id:2,title:'testTodo2', completed:false},
								{id:3,title:'testTodo3', completed:false}];
			setUpModel(todos);
			//declares todo before each test run and sets up model with todos
			
			subject.setView('');
			
			view.trigger('toggleAll',{completed:true});
			//toggles all todos to completed


		});

		it('should toggle all todos to completed', function () {
			// TODO: write test

			expect(model.update).toHaveBeenCalledWith(1, {completed:true}, jasmine.any(Function));
			expect(model.update).toHaveBeenCalledWith(2, {completed:true}, jasmine.any(Function));
			expect(model.update).toHaveBeenCalledWith(3, {completed:true}, jasmine.any(Function));

			//expects the updated model to have been called with ID and completed true


		});

		it('should update the view', function () {
			// TODO: write test


			//expects the view to update with the 3 todos
			expect(view.render).toHaveBeenCalledWith('elementComplete', {id:1,completed:true});
			expect(view.render).toHaveBeenCalledWith('elementComplete', {id:2,completed:true});
			expect(view.render).toHaveBeenCalledWith('elementComplete', {id:3,completed:true});


			//----->Test Finish<-----

		});
	});

	describe('new todo', function () {
		it('should add a new todo to the model', function () {
			// TODO: write test

			//----->Test Start<-----

			setUpModel([]);

			subject.setView('');

			view.trigger('newTodo', 'testTodo');

			
			//expects model.create to have been called with testTodo and function
			expect(model.create).toHaveBeenCalledWith('testTodo', jasmine.any(Function));

			//----->Test Finish<-----


		});

		it('should add a new todo to the view', function () {
			setUpModel([]);

			subject.setView('');

			view.render.calls.reset();
			model.read.calls.reset();
			model.read.and.callFake(function (callback) {
				callback([{
					title: 'a new todo',
					completed: false
				}]);
			});

			view.trigger('newTodo', 'a new todo');

			expect(model.read).toHaveBeenCalled();

			expect(view.render).toHaveBeenCalledWith('showEntries', [{
				title: 'a new todo',
				completed: false
			}]);
		});

		it('should clear the input field when a new todo is added', function () {
			setUpModel([]);

			subject.setView('');

			view.trigger('newTodo', 'a new todo');

			expect(view.render).toHaveBeenCalledWith('clearNewTodo');
		});
	});

	describe('element removal', function () {
		it('should remove an entry from the model', function () {
			// TODO: write test
		
			//----->Test Start<-----

			var todo = {id:1, title:'testTodo', completed:true};
			//declares a new todo

			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemRemove', {id:1});

			//expects model.remove to have been called with id 1 and Function
			expect(model.remove).toHaveBeenCalledWith(1, jasmine.any(Function));

			//----->Test Finish<-----



		});

		it('should remove an entry from the view', function () {
			var todo = {id: 42, title: 'my todo', completed: true};
			setUpModel([todo]);

			subject.setView('');
			view.trigger('itemRemove', {id: 42});

			expect(view.render).toHaveBeenCalledWith('removeItem', 42);
		});

		it('should update the element count', function () {
			var todo = {id: 42, title: 'my todo', completed: true};
			setUpModel([todo]);

			subject.setView('');
			view.trigger('itemRemove', {id: 42});

			expect(view.render).toHaveBeenCalledWith('updateElementCount', 0);
		});
	});

	describe('remove completed', function () {
		it('should remove a completed entry from the model', function () {
			var todo = {id: 42, title: 'my todo', completed: true};
			setUpModel([todo]);

			subject.setView('');
			view.trigger('removeCompleted');

			expect(model.read).toHaveBeenCalledWith({completed: true}, jasmine.any(Function));
			expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function));
		});

		it('should remove a completed entry from the view', function () {
			var todo = {id: 42, title: 'my todo', completed: true};
			setUpModel([todo]);

			subject.setView('');
			view.trigger('removeCompleted');

			expect(view.render).toHaveBeenCalledWith('removeItem', 42);
		});
	});

	describe('element complete toggle', function () {
		it('should update the model', function () {
			var todo = {id: 21, title: 'my todo', completed: false};
			setUpModel([todo]);
			subject.setView('');

			view.trigger('itemToggle', {id: 21, completed: true});

			expect(model.update).toHaveBeenCalledWith(21, {completed: true}, jasmine.any(Function));
		});

		it('should update the view', function () {
			var todo = {id: 42, title: 'my todo', completed: true};
			setUpModel([todo]);
			subject.setView('');

			view.trigger('itemToggle', {id: 42, completed: false});

			expect(view.render).toHaveBeenCalledWith('elementComplete', {id: 42, completed: false});
		});
	});

	describe('edit item', function () {
		it('should switch to edit mode', function () {
			var todo = {id: 21, title: 'my todo', completed: false};
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEdit', {id: 21});

			expect(view.render).toHaveBeenCalledWith('editItem', {id: 21, title: 'my todo'});
		});

		it('should leave edit mode on done', function () {
			var todo = {id: 21, title: 'my todo', completed: false};
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEditDone', {id: 21, title: 'new title'});

			expect(view.render).toHaveBeenCalledWith('editItemDone', {id: 21, title: 'new title'});
		});

		it('should persist the changes on done', function () {
			var todo = {id: 21, title: 'my todo', completed: false};
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEditDone', {id: 21, title: 'new title'});

			expect(model.update).toHaveBeenCalledWith(21, {title: 'new title'}, jasmine.any(Function));
		});

		it('should remove the element from the model when persisting an empty title', function () {
			var todo = {id: 21, title: 'my todo', completed: false};
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEditDone', {id: 21, title: ''});

			expect(model.remove).toHaveBeenCalledWith(21, jasmine.any(Function));
		});

		it('should remove the element from the view when persisting an empty title', function () {
			var todo = {id: 21, title: 'my todo', completed: false};
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEditDone', {id: 21, title: ''});

			expect(view.render).toHaveBeenCalledWith('removeItem', 21);
		});

		it('should leave edit mode on cancel', function () {
			var todo = {id: 21, title: 'my todo', completed: false};
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEditCancel', {id: 21});

			expect(view.render).toHaveBeenCalledWith('editItemDone', {id: 21, title: 'my todo'});
		});

		it('should not persist the changes on cancel', function () {
			var todo = {id: 21, title: 'my todo', completed: false};
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEditCancel', {id: 21});

			expect(model.update).not.toHaveBeenCalled();
		});
	});
});
