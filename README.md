# Project 8 - Enhance an Existing Project
### OpenClassrooms 

 **1** - Download Existing todo list project <br/>
 **2** - Find the 2 bugs that are hidden in the code, then fix them <br/>
 **3** - Write tests in jasmine.js <br/>
 **4** - Refactor code <br/>
 **5** - Analyze performance and write an audit <br/> 
 **6** - Write technical documentation <br/>
 **7** - Present over video call to simulate real life conditions
 <br/>
 ### Skills Developed
 * Jasmine.js
 * JavaScript
 * Performance analysis
 * Producing Technical Documentation
 
 ### Setup
 
 ```
 npm install
 open index.html
 open SpecRunner.html
 
 ```
 ### Example Code
 
 ```JavaScript
 it('should show completed entries', function () {//spec to show completed entries
			// TODO: write test
			
			//----->Test Start<-----

			var todo={title:'testTodo',completed:true}; //sets up a completed todo

			setUpModel([todo]); //sets up model with the completed todo

			subject.setView('#/completed'); //sets active view to completed

			//will return true if the constructor matches the tested value
			expect(model.read).toHaveBeenCalledWith({completed:true},jasmine.any(Function));

			expect(view.render).toHaveBeenCalledWith('showEntries',[todo]); 
			//returns true if showEntries is called with the todo array and todos are showing 

			expect(todo.completed).toEqual(true); 
			//using the toEqual matcher to check the todos are completed
		
			//----->Test Finish<-----


		});
    
    
    
   
   
 
