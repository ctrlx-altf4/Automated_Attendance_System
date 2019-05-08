import cv2
from sklearn.externals import joblib

face_classifier = cv2.CascadeClassifier("etc/EigenFace/haarcascade_frontalface_default.xml")

model = cv2.face.EigenFaceRecognizer_create()
model.read('etc/EigenFace/model.yaml')
label_info = joblib.load('etc/EigenFace/label_info.txt')

def face_detector(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray,1.1,0)
    
    if faces is():
        return img, []
    
    for (x,y,w,h) in faces:
#        cv2.rectangle(img,(x,y),(x+w,y+h), (0,255,255), 2)
        roi = img[y:y+h, x:x+w]
        roi = cv2.resize(roi, (200,200))
        
    return img, roi

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    image, face = face_detector(frame)
    
    try:
        face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
        y_pred = model.predict(face)
        disp_string = label_info[y_pred[0]]
        cv2.putText(image, disp_string, (200,450), cv2.FONT_HERSHEY_COMPLEX, 1, (0,255,0),1)
        cv2.imshow('Face Recognizer',image)
    except:
#        cv2.putText(image, "No face found", (200,450), cv2.FONT_HERSHEY_COMPLEX, 1, (0,255,0),1)
        cv2.imshow('Face Recognizer', image)
    if cv2.waitKey(1)==27:
        break

cap.release()
cv2.destroyAllWindows()