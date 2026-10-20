#!/usr/bin/env python3
"""Original 77-second quiet plucked score and comic SFX for Ani Hamuda.

Offline synthesis only. Requires Python 3 and NumPy.
The accompaniment ducks around dialogue punchlines; peaks stay below -16 dBFS.
"""
from pathlib import Path
import math
import os
import wave
import numpy as np

RATE = 44100
DURATION = 77.0
ROOT = Path(__file__).resolve().parents[1]
OUT = Path(os.environ.get('HAMUDA_AMBIENCE_OUT', str(ROOT / 'public/audio/ambience.wav')))
RNG = np.random.default_rng(20261020)
SIZE = round(RATE * DURATION)
MUSIC = np.zeros(SIZE, dtype=np.float64)
SFX = np.zeros(SIZE, dtype=np.float64)


def add(track, sound, at, level=1):
    offset = round(at * RATE)
    end = min(SIZE, offset + len(sound))
    if offset < SIZE and end > offset:
        track[offset:end] += sound[:end-offset] * level


def pluck(frequency, length=.48):
    t = np.arange(round(length * RATE)) / RATE
    attack = 1 - np.exp(-t * 900)
    envelope = attack * np.exp(-t * 10)
    body = sum((1 / h**1.9) * np.sin(2*math.pi*frequency*h*t + .08*h) * np.exp(-t * h * 1.8)
               for h in range(1, 7))
    sound = envelope * body
    # Soft second body resonance gives a wooden, rather than sine-wave, timbre.
    sound += .12 * np.sin(2*math.pi*frequency*.501*t) * attack * np.exp(-t*17)
    return sound / max(1, np.max(np.abs(sound)))


def midi(note):
    return 440 * 2**((note-69)/12)


def window(length, attack=.015, release=.04):
    samples = round(length*RATE)
    env = np.ones(samples)
    a = min(samples, round(attack*RATE))
    r = min(samples-a, round(release*RATE))
    if a: env[:a] = np.linspace(0, 1, a)**1.3
    if r: env[-r:] = np.linspace(1, 0, r)**1.3
    return env


def jangle(at):
    # A little jumble of metal rings, deliberately quieter than the spoken voice.
    for i in range(11):
        length = .14 + RNG.random()*.12
        t = np.arange(round(length*RATE))/RATE
        freq = RNG.uniform(1500, 3700)
        ring = (np.sin(2*np.pi*freq*t) + .45*np.sin(2*np.pi*freq*1.47*t))
        ring *= np.exp(-t*RNG.uniform(19, 29)) * (1-np.exp(-t*1700))
        add(SFX, ring, at + i*.042 + RNG.random()*.014, .014)


def whoosh(at):
    length = .68
    t = np.arange(round(length*RATE))/RATE
    noise = RNG.normal(0, 1, len(t))
    # One short moving car pass: low-pass the noise and shape its passing envelope.
    noise = np.convolve(noise, np.ones(18)/18, mode='same')
    env = np.sin(np.pi*np.minimum(t/length, 1))**1.4
    tone = np.sin(2*np.pi*(220*t - 70*t*t/length)) * .12
    add(SFX, (noise + tone)*env, at, .12)


def horn(at):
    length = .30
    t = np.arange(round(length*RATE))/RATE
    sound = (np.sin(2*np.pi*350*t) + .72*np.sin(2*np.pi*440*t) + .18*np.sin(2*np.pi*700*t))
    add(SFX, sound*window(length, .02, .07), at, .041)


def intercom(at):
    length = .34
    t = np.arange(round(length*RATE))/RATE
    tone = .7*np.sin(2*np.pi*140*t) + .24*np.sin(2*np.pi*420*t)
    tone *= (.55 + .45*np.sin(2*np.pi*21*t)) * window(length, .015, .04)
    add(SFX, tone, at, .040)


def unlock(at):
    length = .24
    t = np.arange(round(length*RATE))/RATE
    noise = RNG.normal(0, 1, len(t))
    noise = np.convolve(noise, np.ones(5)/5, mode='same')
    click = noise * np.exp(-t*42) * (1-np.exp(-t*900))
    clunk = np.sin(2*np.pi*(190*t-100*t*t)) * np.exp(-t*26)
    add(SFX, click*.060 + clunk*.045, at)
    add(SFX, click*.035, at+.12)


# Quiet syncopated plucks: D minor / Bb / F / C, with no quoted existing tune.
beat = 60/112
progression = [(50, 57, 62, 65), (46, 53, 58, 62), (48, 55, 60, 64), (45, 52, 57, 60)]
bar = 0
while bar*4*beat < DURATION:
    start = bar*4*beat
    chord = progression[bar % len(progression)]
    for eighth in range(8):
        at = start + eighth*beat/2
        note = chord[[0,2,1,3,0,2,1,3][eighth]]
        level = .011 if eighth % 2 else .015
        add(MUSIC, pluck(midi(note)), at, level)
    # Muted low tick on the offbeat, a tiny wooden percussion gesture.
    for off in [1, 3]:
        t=np.arange(round(.065*RATE))/RATE
        tick=(RNG.normal(0,1,len(t))*.22 + np.sin(2*np.pi*120*t)) * np.exp(-t*80)
        add(MUSIC,tick,start+off*beat,.005)
    bar += 1

# Deliberate pauses make the keys, angry line, shouted question and Russian password land.
time = np.arange(SIZE)/RATE
level = np.ones(SIZE)
pauses = [(8.15, 9.20, .08), (17.10, 22.10, .12), (32.80, 34.80, .28),
          (49.20, 52.20, .05), (52.70, 55.30, 0), (55.80, 60.00, .18), (73.1, 76.5, .05)]
for start, end, floor in pauses:
    ramp = .16
    mask = np.clip((time-start)/ramp, 0, 1) * np.clip((end-time)/ramp, 0, 1)
    level *= 1 - mask*(1-floor)
level *= np.minimum(time/.8,1) * np.minimum((DURATION-time)/1.2,1)
MUSIC *= level

jangle(8.8)
jangle(11.7)
jangle(64.3)
whoosh(14.5)
horn(15.3)
intercom(32.7)
# Tiny button click before the guard's first question.
unlock(32.9)
for at, note in [(57.4,74),(57.56,77),(57.73,81)]:
    add(SFX, pluck(midi(note),.65), at, .030)
unlock(59.5)
unlock(71.8)

# No limiter pumping; just a fixed low gain if simultaneous transients need it.
mix = MUSIC + SFX
peak = float(np.max(np.abs(mix)))
if peak > .15:
    mix *= .15 / peak
OUT.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(OUT),'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE)
    w.writeframes((np.clip(mix,-1,1)*32767).astype('<i2').tobytes())
rms = math.sqrt(float(np.mean(mix**2)))
print(f'{OUT}: {DURATION:.1f}s, 44.1kHz mono, peak {20*math.log10(max(np.max(np.abs(mix)),1e-12)):.1f} dBFS, RMS {20*math.log10(max(rms,1e-12)):.1f} dBFS')
