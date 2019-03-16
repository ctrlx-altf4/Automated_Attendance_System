import cv2
import numpy as np
from os import listdir
from os.path import isfile, join
from sklearn.externals import joblib

relative_data_path = "collection/images/"

cnt=0
x_train, y_train = [], []
label_info = {}
for dirr in listdir(relative_data_path):
    data_path = relative_data_path + dirr +'/'
    only_images = [f for f in listdir(data_path) if isfile(join(data_path,f))]

    for i, image_name in enumerate(only_images):
        image_path = data_path + image_name
        image =cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        x_train.append(np.asarray(image, dtype=np.uint8))
        y_train.append(cnt)
    label_info[cnt] = dirr
    cnt+=1
    
y_train = np.asarray(y_train, dtype=np.int32)

model = cv2.face.EigenFaceRecognizer_create()
model.train(np.asarray(x_train), y_train)

model.write('model.yaml')
joblib.dump(label_info, 'label_info.txt')

print("Model trained!")