import os
import sys
import cv2
import time

sys.path.append('/home/pi/HSDL-Solution/mask_detect/')
from tensorflow_mask_detect import inference

class mask(object):
    def __init__(self):
        warn=0
        self.video_path=0
        
    def audio_set(self):
        pass
        
    def display_set(self):
        pass
        
    def mask_detect(self):
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        conf_thresh=0.5
        cap = cv2.VideoCapture(self.video_path)
        height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
        width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
        fps = cap.get(cv2.CAP_PROP_FPS)
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        #out = cv2.VideoWriter(BASE_DIR+'/otter_out.mp4', fourcc, fps, (int(width), int(height)))
        total_frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
        
        
        if not cap.isOpened():
            raise ValueError("Video open failed.")
            return
        status = True
        idx = 0
        while status:
            start_stamp = time.time()
            status, img_raw = cap.read()
            try:
                img_raw = cv2.cvtColor(img_raw, cv2.COLOR_BGR2RGB)
            except:
                break
            
            read_frame_stamp = time.time()
            if (status):
                result=inference(img_raw)
                cv2.imshow('image', img_raw[:, :, ::-1])
                cv2.waitKey(1)
                inference_stamp = time.time()
                # writer.write(img_raw)
                write_frame_stamp = time.time()
                
                print("%d of %d" % (idx, total_frames))
                print("read_frame:%f, infer time:%f, write time:%f" % (read_frame_stamp - start_stamp,
                                                                    inference_stamp - read_frame_stamp,
                                                                    write_frame_stamp - inference_stamp))                
                

if __name__ == "__main__":
    mask=mask()
    mask.mask_detect()