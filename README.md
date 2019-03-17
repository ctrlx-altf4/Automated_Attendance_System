Make sure you have images in the "collection/images/" folder before you start.

First, run the "generate_data_label.py" in the "etc/EigenFace/" folder. This will generate a csv file containing the image location and the corresponding unique id/label as well as a dictionary mapping these label to the name (saved using joblib).

Then, run the "train_model.py" in the same folder. If you are training a new dataset, go to line 29 and uncomment that and comment line 30 and 31 instead. Otherwise, do the opposite.

Finally, run the "make_prediction.py" in the main folder. This will open the camera and is ready for prediction.

Note:* This is a very VERY early prototype.