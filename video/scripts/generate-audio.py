#!/usr/bin/env python3
"""Build coherent adult-female Ani Hamuda audio; no syllable splicing or voice cloning.

Dependencies: kokoro-onnx==0.6.1, onnxruntime, soundfile, numpy,
praat-parselmouth==0.4.7, FFmpeg with rubberband.
Download the documented official Kokoro ONNX v1.0 model and voices from
https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.1
The model is not native Hebrew: complete manually authored IPA phrases are used.
"""
from pathlib import Path
import argparse
import hashlib
import importlib.metadata
import json
import os
import subprocess
import sys
import tempfile

MODEL_ROOT = Path(os.environ.get('KOKORO_ROOT', '/workspace/.tools/kokoro'))
if (MODEL_ROOT/'python').exists():
    sys.path.insert(0,str(MODEL_ROOT/'python'))
import numpy as np
import onnxruntime as ort
ort.disable_telemetry_events()
import soundfile as sf
import parselmouth
from parselmouth.praat import call
from kokoro_onnx import Kokoro

RATE=44100
VOICE='bf_emma'
UNIT_SECONDS=2.05
VOCAL_SECONDS=1.30
REST_SECONDS=.75


def ffmpeg(source,dest,filters='',rate=RATE):
    cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(source)]
    if filters:cmd+=['-af',filters]
    subprocess.run(cmd+['-ar',str(rate),'-ac','1','-c:a','pcm_s16le',str(dest)],check=True)


def fitted(source,dest,seconds,rate=24000):
    info=sf.info(source)
    ffmpeg(source,dest,f'rubberband=tempo={info.duration/seconds:.9f},apad,atrim=duration={seconds:.9f}',rate)


def melody(source,dest,seconds=VOCAL_SECONDS,lala=False):
    sound=parselmouth.Sound(str(source))
    manipulation=call(sound,'To Manipulation',.005,75,400)
    tier=call('Create PitchTier','original low adult melody',0,seconds)
    if lala:
        notes=[(0,220),(.20,220),(.27,196),(.45,196),(.52,174.61),(.70,174.61),(.77,196),(.95,196),(1.02,220),(1.20,220),(1.27,174.61),(1.5,174.61)]
    else:
        notes=[(0,174.61),(.14,174.61),(.21,220),(.38,220),(.44,196),(.59,196),(.66,220),(.86,220),(.94,174.61),(1.30,174.61)]
    for at,hz in notes:call(tier,'Add point',at,hz)
    call([tier,manipulation],'Replace pitch tier')
    sung=call(manipulation,'Get resynthesis (overlap-add)')
    audio=sung.values[0]
    audio*=min(1,.74/max(.001,float(np.max(np.abs(audio)))))
    sf.write(dest,audio,int(sound.sampling_frequency),subtype='PCM_16')


def wav(path,audio):
    sf.write(path,np.asarray(audio),RATE,subtype='PCM_16')


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--output',type=Path,default=Path(__file__).resolve().parents[1]/'public/audio')
    args=parser.parse_args()
    output=args.output.resolve();output.mkdir(parents=True,exist_ok=True)
    for filename in ['kokoro-v1.0.onnx', 'voices-v1.0.bin']:
        if not (MODEL_ROOT/filename).is_file():
            raise SystemExit(f'Offline model missing: {MODEL_ROOT/filename}. No download attempted.')
    options=ort.SessionOptions();options.intra_op_num_threads=4;options.inter_op_num_threads=1
    session=ort.InferenceSession(str(MODEL_ROOT/'kokoro-v1.0.onnx'),sess_options=options,providers=['CPUExecutionProvider'])
    engine=Kokoro.from_session(session,str(MODEL_ROOT/'voices-v1.0.bin'))
    manifest={'engine':'Kokoro ONNX','engine_version':importlib.metadata.version('kokoro-onnx'),
      'voice':VOICE,'model_native_hebrew':False,
      'pronunciation':'Manually authored complete IPA utterances; all phonemes checked against model vocabulary.',
      'singing':'Original continuous low-register 174.61–220 Hz tune applied with Praat overlap-add to full neural phrases; no syllable splicing.',
      'phrase_seconds':VOCAL_SECONDS,'real_vocal_rest_seconds':REST_SECONDS,
      'identity':'Synthetic adult female voice; no photo subject voice cloning.',
      'model_source':'https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.1',
      'model_sha256':hashlib.sha256((MODEL_ROOT/'kokoro-v1.0.onnx').read_bytes()).hexdigest(),
      'clips':[]}
    with tempfile.TemporaryDirectory(prefix='hamuda-neural-') as tmp:
        tmp=Path(tmp)
        def synth(name,text,phonemes,speed=.94):
            unknown=set(phonemes)-set(engine.tokenizer.vocab)
            if unknown:raise ValueError(f'Unsupported phonemes for {name}: {unknown}')
            audio,sr=engine.create(phonemes,voice=VOICE,speed=speed,is_phonemes=True)
            dest=tmp/f'{name}-raw.wav';sf.write(dest,audio,sr,subtype='PCM_16')
            return dest
        def sung(name,text,phonemes,seconds=1.3,lala=False):
            raw=synth(name,text,phonemes)
            fit=tmp/f'{name}-fit.wav';fitted(raw,fit,seconds)
            tune=tmp/f'{name}-sung.wav';melody(fit,tune,seconds,lala)
            final=tmp/f'{name}-44100.wav';ffmpeg(tune,final,'highpass=f=70,lowpass=f=9500')
            audio,sr=sf.read(final);assert sr==RATE
            target=round(seconds*RATE)
            return np.pad(audio,(0,max(0,target-len(audio))))[:target]
        hamuda=sung('hamuda','אני חמודה','ɑˈni xɑmuˈdɑ.')
        ayefa=sung('ayefa','אני עייפה','ɑˈni ɑjeˈfɑ.')
        lala=sung('lala','לה לה לה, לה לה לה!','lɑ lɑ lɑ, lɑ lɑ lɑ!',1.5,True)
        rest=np.zeros(round(REST_SECONDS*RATE))
        hamuda_unit=np.concatenate([hamuda,rest])
        ayefa_unit=np.concatenate([ayefa,rest])
        song3=np.tile(hamuda_unit,3)
        songs=[('01-song.wav',song3,'אני חמודה | אני חמודה | אני חמודה'),
          ('04-song-lala.wav',np.concatenate([song3,lala]),'אני חמודה | אני חמודה | אני חמודה | לה לה לה, לה לה לה'),
          ('06-song6.wav',np.tile(hamuda_unit,6),' | '.join(['אני חמודה']*6)),
          ('10-final.wav',np.concatenate([hamuda_unit,hamuda_unit,ayefa_unit]),'אני חמודה | אני חמודה | אני עייפה')]
        for name,audio,text in songs:
            wav(output/name,audio)
            manifest['clips'].append({'file':name,'text':text,'seconds':round(len(audio)/RATE,6),'kind':'coherent neural singing','voice':VOICE})
        speech=[
          ('02-keys.wav','אוף, איפה המפתחות שלי? אוף!','uf! ˈefo hɑmɑfteˈxot ʃeˈli? uf!',.97,3.218),
          ('03-traffic.wav','היי, מטומטם! הלוואי שתישאר בלי נייר טואלט!','hej, metumˈtɑm! hɑlɑˈvɑj ʃetiʃɑˈeʁ bli niˈjɑʁ tuɑˈlet!',1.04,3.859),
          ('08-password.wav','пиздец котёнку','pʲɪzˈdʲets kɑˈtʲonkʊ.',1.0,1.456),
          ('11-office-shout.wav','אוף! אני עייפה!','uf! ɑˈni ɑjeˈfɑ!',.90,2.35),
        ]
        for name,text,phonemes,speed,seconds in speech:
            raw=synth(name,text,phonemes,speed)
            info=sf.info(raw)
            # Never truncate a word. Speed adjustment only when needed, then pad a real tail rest.
            filters='highpass=f=70,lowpass=f=9500'
            if info.duration>seconds:
                filters+=f',rubberband=tempo={info.duration/seconds:.9f}'
            if name=='11-office-shout.wav':
                # More vocal presence for the shout; do not raise the voice pitch.
                filters+=',acompressor=threshold=0.12:ratio=2:attack=8:release=100:makeup=1.4,volume=1.15'
            else:
                filters+=',volume=1.15'
            filters+=f',alimiter=limit=0.88:level=false,apad,atrim=duration={seconds}'
            ffmpeg(raw,output/name,filters)
            manifest['clips'].append({'file':name,'text':text,'phonemes':phonemes,'seconds':sf.info(output/name).duration,'kind':'coherent neural speech','voice':VOICE})
    manifest['clips'].sort(key=lambda x:x['file'])
    (output/'audio-manifest-neural.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    existing_path=output/'audio-manifest.json'
    if existing_path.exists():
        existing=json.loads(existing_path.read_text())
        guards=[clip for clip in existing.get('clips',[]) if clip['file'] in ['05-guard1.wav','07-guard2.wav','09-accepted.wav']]
        manifest['clips']=sorted(manifest['clips']+guards,key=lambda clip:clip['file'])
    manifest['guard_voice']='Local eSpeak NG he+m3, filtered as intercom; existing guard files retained.'
    existing_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    for clip in manifest['clips']:print(clip['file'],clip['seconds'],clip['text'],flush=True)

if __name__=='__main__':main()
