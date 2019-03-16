import cv2
import numpy as np

#c:/anaconda64/envs/ml_env/Library/etc/haarcascades
face_classifier = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")

def face_extractor(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray,1.3,5)
    if faces is():
        return None
    
    for(x,y,w,h) in faces:
        cropped_faces = img[y:y+h, x:x+w]
    return cropped_faces
    
cap = cv2.VideoCapture(0)
cnt = 0
while True:
    ret, frame = cap.read()
    face_frame = face_extractor(frame)
    if face_frame is not None:
        cnt+=1
        face = cv2.resize(face_frame, (200,200))
        face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
        file = "images/user/user" + str(cnt) + ".jpg"
        cv2.imwrite(file, face)
        cv2.imshow('Sample collector', frame)
    else:
        print("No face")
    #ESC=27
    if cv2.waitKey(10) == 27 or cnt == 100:
        break
    
cap.release()
cv2.destroyAllWindows()
print("Samples collected")