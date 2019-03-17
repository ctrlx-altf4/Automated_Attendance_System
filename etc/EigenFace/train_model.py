import cv2
import pandas as pd
import numpy as np
from sklearn.externals import joblib
from sklearn.model_selection import train_test_split

face_classifier = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")

def train_model(x, y):
    x_train=[]
    for image_path in x:
        image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        image = cv2.resize(image, (200,200))
        x_train.append(np.asarray(image, dtype=np.uint8))
    model = cv2.face.EigenFaceRecognizer_create()
    model.train(np.array(x_train),y)
    model.write('model.yaml')
    print('Model trained!!')
    return model


df = pd.read_csv('data_label.csv', index_col=0)
label_info = joblib.load('label_info.txt')
#tst = df.iloc[:,1].isin(range(51))
#df = df[tst]

x_train, x_test, y_train, y_test = train_test_split(df.iloc[:,0], df.iloc[:,1], train_size=0.7)

model = train_model(np.asarray(x_train), np.asarray(y_train))
#model = cv2.face.EigenFaceRecognizer_create()
#model.read('model.yaml')

print('Predicted', 'Actual', 'Correct')
print('-------------------------------')

for image_path, op in zip(x_test, y_test):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
#    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#    img = face_classifier.detectMultiScale(image,1.3,5)
#    
#    if image is():
#        pass
#    else:
#        for (x,y,w,h) in img:
#            image = image[y:y+h, x:x+w]
#            image = cv2.resize(image, (200,200))
    y_pred = model.predict(image)
    print('{0}\t{1}\t{2}'.format(label_info[y_pred[0]], label_info[op], y_pred[0]==op))