#import cv2
import pandas as pd
from os import listdir
from os.path import isfile, join
from sklearn.externals import joblib

p1 = "E:/Machine Learning/Datasets/lfw2/"
p2 = "../../collection/images/"
relative_data_path = p2

cnt=0
df = pd.DataFrame()
label_info = {}

#do for all sub-directory
for dirr in listdir(relative_data_path):
    data_path = relative_data_path + dirr +'/'
    only_images = [f for f in listdir(data_path) if isfile(join(data_path,f))]

    for image_name in only_images:
        image_path = data_path + image_name
#        image =cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        df = df.append([[image_path, cnt]])
    label_info[cnt] = dirr
    cnt+=1
    

df.to_csv('data_label.csv')
joblib.dump(label_info, 'label_info.txt')