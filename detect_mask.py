import os
import sys
import cv2
import requests
import json
import time
import simpleaudio as sa
import threading
import pygame, pygame.font, pygame.event, pygame.draw, string
from pygame.locals import *
from pydub import AudioSegment
from pydub.playback import play
from url_test import post_data
"""from multiprocessing.pool import ThreadPool
pool = ThreadPool(processes=1)"""

sys.path.append('/home/pi/HSDL-Solution/mask_detect/')
from tensorflow_mask_detect import inference

def display_box(screen, message):
    fontobject=pygame.font.SysFont('unbatang', 100)
    if len(message) != 0:
        screen.blit(fontobject.render(message, 1, (255, 255, 255)),
                ((screen.get_width()/2-700), (screen.get_height()/2) - 10))
    pygame.display.flip()

def get_key():
    while True:
        event = pygame.event.poll()
        if event.type == KEYDOWN:
            return event.key

def thread_music(finsh,uid,place,p_code,no_mask):
    if finsh==False:
        try:
            #enable if needs
            """song = AudioSegment.from_wav("ko_tts.wav")
            play(song)"""
        except:
            pass
    url="http://hsdlapi.ap-northeast-2.elasticbeanstalk.com/api/detecitve"
    data={"transportId":uid,
    "placeName":place,
    "placeCode":p_code,
    "detectiveCount":no_mask}
    response=requests.post(url=url,data=json.dumps(data),headers={'Content-Type': 'application/json'})
    dict_meta = {'status_code':response.status_code, 'ok':response.ok, 'encoding':response.encoding, 'Content-Type': response.headers['Content-Type']}
    print({**dict_meta, **{'text':response.text}})

class mask(object):
    def __init__(self):
        warn=0
        self.video_path=0
        self.id="ckgp6h7a8dsoj0a260dl78ey8"
        self.place="송정공원"
        self.p_id="12345"
        self.img1=cv2.imread("/home/pi/HSDL-Solution/mask.jpg")
    def audio_set(self):
        pass
        
    def display_set(self):
        pass
        
    def mask_detect(self):
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        conf_thresh=0.7
        cap = cv2.VideoCapture(-1)
        #cap = cv2.VideoCapture(1)
        #cap.set(cv2.CAP_PROP_FPS,2)   여기가 프레임 수 바꾸는 곳
        height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
        width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
        print("height",height)
        print("width",width)
        fps = cap.get(cv2.CAP_PROP_FPS)
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        #out = cv2.VideoWriter(BASE_DIR+'/otter_out.mp4', fourcc, fps, (int(width), int(height)))
        total_frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
        print(fps)
        
        full_screen = False   
        window_size = (1920, 1080)
        pygame.init()      
        if full_screen:
            surf = pygame.display.set_mode(window_size, HWSURFACE | FULLSCREEN | DOUBLEBUF)
        else:
            surf = pygame.display.set_mode(window_size)
        
        if not cap.isOpened():
            raise ValueError("Video open failed.")
            return
        status = True
        idx = 0
        finsh=False
        before=time.time()
        timer_count=0
        while status:
            print(time.time()-before)
            
                
            start_stamp = time.time()
            status, img_raw = cap.read()
            try:
                img_raw = cv2.cvtColor(img_raw, cv2.COLOR_BGR2RGB)
            except:
                break
            
            read_frame_stamp = time.time()
            if (status):
                result=inference(img_raw)
                if time.time()-before>3:
                    x=threading.Thread(target=thread_music,args=(finsh,self.id,self.place,self.p_id,int(result),))
                    before=time.time()
                cv2.imshow('image', img_raw[:, :, ::-1])
                cv2.waitKey(1)
                inference_stamp = time.time()
                # writer.write(img_raw)
                write_frame_stamp = time.time()
                print(result)
                if full_screen:
                    surf = pygame.display.set_mode(window_size, HWSURFACE | FULLSCREEN | DOUBLEBUF)
                else:
                    surf = pygame.display.set_mode(window_size)
        
                if result> 0:
                        
                        #here send counting datas
                    display_box(surf, "마스크를 착용해 주시기를 바랍니다")
                    try:
                        x.start()
                    except:
                        pass
                    print(finsh)
                    timer_count+=1
                    #request=post_data(self.id,self.place,self.p_id,int(result))
                    #print(request)
                else:
                    display_box(surf, "이번역은 송정공원 역입니다.")
                    timer_count=0
                                
                if timer_count>100:
                    #here put report function
                    pass
                print("timer_count:",timer_count)
                print("%d of %d" % (idx, total_frames))
                print("read_frame:%f, infer time:%f, write time:%f" % (read_frame_stamp - start_stamp,
                                                                    inference_stamp - read_frame_stamp,
                                                                    write_frame_stamp - inference_stamp))                
        
                
if __name__ == "__main__":
    mask=mask()
    mask.mask_detect()