from playsound import playsound
import simpleaudio as sa

from pydub import AudioSegment
from pydub.playback import play

song = AudioSegment.from_wav("tts.wav")
play(song)

playsound("tts_wave_mask.wav")

"""https://stackoverflow.com/questions/63482555/how-to-control-audio-playback-in-a-raspberry-pi"""
