import pygame, pygame.font, pygame.event, pygame.draw, string
from pygame.locals import *
import time

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

if __name__ == "__main__":
    # Graphics initialization
    full_screen = True    
    window_size = (1920, 1080)
    pygame.init()      
    if full_screen:
        surf = pygame.display.set_mode(window_size, HWSURFACE | FULLSCREEN | DOUBLEBUF)
    else:
        surf = pygame.display.set_mode(window_size)

    # Create a display box
    first=time.time()
    while True:
        print(time.time()-first)
        if time.time()-first>2:
            display_box(surf, "이번역은 송정공원 역입니다.")
            first=time.time()
        else:
            display_box(surf, "please put on your mask")
        inkey = get_key()
        if inkey == K_RETURN or inkey == K_KP_ENTER:
            break
        pygame.display.flip()
