import sys
import cv2
import os
import io
import time
import threading
try:
    from greenlet import getcurrent as get_ident
except ImportError: 
    try:
        from thread import get_ident
    except ImportError:
        from _thread import get_ident 
sys.path.append('/home/pi/HSDL-Solution/mask_detect/')
from tensorflow_infer import inference

#BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class CameraEvent(object):
    """An Event-like class that signals all active clients when a new frame is
    available.
    """
    
    def __init__(self):
         self.events = {}

    def wait(self):
        """Invoked from each client's thread to wait for the next frame."""
        ident = get_ident()
        if ident not in self.events:
            # this is a new client
            # add an entry for it in the self.events dict
            # each entry has two elements, a threading.Event() and a timestamp
            
            self.events[ident] = [threading.Event(), time.time()]
        return self.events[ident][0].wait()

    def set(self):
        """Invoked by the camera thread when a new frame is available."""
        now = time.time()
        remove = None
        for ident, event in self.events.items():
            if not event[0].isSet():
                # if this client's event is not set, then set it
                # also update the last set timestamp to now
                event[0].set()
                event[1] = now
            else:
                # if the client's event is already set, it means the client
                # did not process a previous frame
                # if the event stays set for more than 5 seconds, then assume
                # the client is gone and remove it
                if now - event[1] > 5:
                    remove = ident
        if remove:
            del self.events[remove]

    def clear(self):
        """Invoked from each client's thread after a frame was processed."""
        self.events[get_ident()][0].clear()                                                                 

class Camera(object):
    thread = None  # background thread that reads frames from camera
    frame = None  # current frame is stored here by background thread
    last_access=0
    event=CameraEvent()
    def __init__(self):
    	if Camera.thread is None:   
            Camera.last_access=time.time()
            Camera.thread=threading.Thread(target=self.thread)
            Camera.thread.start()

            while self.get_frame() is None:
                time.sleep(0)

    def frame(self):
        lee=0
        ldh=0
	
        self.video_path=0
        #self.video_path="/home/pi/HSDL-Solution/test_video_c.mp4"
        
        self.frames=[]
        #self.peopleImageFolder="C:/Users/Lee/Desktop/a/people/"
        #people=os.listdir(self.peopleImageFolder)

        
        '''name=[]
        for p in people:

            name.append(p[:-4])

        people=[self.peopleImageFolder+i for i in people]
        count={}
        for i in name:
            count[i]=0
        print(people)
        people_count=0'''
        #for live streaming
        stream=io.BytesIO()
        
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
                inference(img_raw)
                #print(len(outinfo))
                '''people_count=len(outinfo)
                for info in outinfo:
                    print(info)
                    if(info[-1]!=''):
                        count[info[-1]]=count[info[-1]]+1'''
                
                #out.write(img_raw[:, :, ::-1])
                self.frames.append(cv2.imencode('.jpg', img_raw[:, :, ::-1])[1].tobytes())
                cv2.waitKey(1)
                yield cv2.imencode('.jpg',img_raw[:,:,::-1])[1].tobytes()
                inference_stamp = time.time()
                # writer.write(img_raw)
                write_frame_stamp = time.time()
                idx += 1
                print("%d of %d" % (idx, total_frames))
                print("read_frame:%f, infer time:%f, write time:%f" % (read_frame_stamp - start_stamp,
                                                                    inference_stamp - read_frame_stamp,
                                                                    write_frame_stamp - inference_stamp))                
        '''for i in count.keys():
            if(count[i]>0):
                print(i,end=" ")'''

        print('-----------------------------------------------------------------')

    def get_frame(self):
        Camera.last_access=time.time()
        Camera.event.wait()
        Camera.event.clear()  
        len(self.frames)    
       
        return  self.frames

    @classmethod
    def _thread(cls):
        print('Starting camera thread.')
        frames_iterator=cls.frames()
        for frame in frames_iterator:
            Camera.frames=frame
            Camera.event.set()
            time.sleep(0)

            if time.time()-Camera.last_access>100:
                frames_iterator.close()
                print('stopping')
                break
	
        Camera.thread=None
       
#play_vid('C:/Users/Lee/Desktop/a/testvideo.mp4')
