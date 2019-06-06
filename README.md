Required modules:
1. python 3.x (3.7.3)
2. opencv 3.4.2
3. scikit-learn 0.20.3
4. pandas 0.24.2


To train the model, make sure you have images in the "collection/images/" folder before you start. Images of a person should be contained in folder with the name of the folder set to the person's name (or identity).

Now, run the "generate_data_label.py" in the "etc/EigenFace/" folder. This will generate a csv file containing the image location and the corresponding unique id/label as well as a dictionary mapping these label to the name (saved using joblib (sklearn.externals)).

Then, run the "train_model.py" present in the same folder. If you are training a new dataset, comment line 30+31 and uncomment line 29. Otherwise, do the opposite.

Finally, run the "make_prediction.py" in the main folder. This will open the camera and is ready for prediction.

Note:* 
	'environment.yml' consists of the virtual environment for this project.
	
	This code is only for demo purpose and not to be integrated with the main program.
	
	
	
	To run the code 
go to the project directory in your terminal and type npm i
Then go to the client directory and type npm i 
these two steps installs all the neccessary packages to run the project. 

Now return back to the root(main) project directory and type npm run dev
