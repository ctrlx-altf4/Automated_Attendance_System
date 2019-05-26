import cv2

face_classifier = cv2.CascadeClassifier("etc/EigenFace/haarcascade_frontalface_default.xml")

def getFace(path):
    img = cv2.imread(path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray,1.3,5)
    print(len(faces))
    if faces is():
        return None

    cropped_faces = []
    for(x,y,w,h) in faces:
        cropped_faces.append(img[y:y+h, x:x+w])

    return cropped_faces