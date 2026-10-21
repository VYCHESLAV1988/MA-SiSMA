#!/usr/bin/env python3
"""Create staged native Hebrew/Russian neural voice auditions with edge-tts.

No API key or paid account. Internet access to speech.platform.bing.com is needed.
Outputs stay separate from production audio; no speech speedup or pitch replacement.
"""
from pathlib import Path
import argparse
import asyncio
import json
import os
import ssl
import subprocess
import sys
import tempfile

CLIENT_ROOT = Path(os.environ.get('EDGE_TTS_ROOT', '/workspace/.tools/edge-tts/python'))
if CLIENT_ROOT.is_dir():
    sys.path.insert(0, str(CLIENT_ROOT))
try:
    import edge_tts
    import edge_tts.communicate
    import edge_tts.voices
except ImportError:
    raise SystemExit('Install scripts/requirements-free-voices.txt into EDGE_TTS_ROOT first.')

PROJECT = Path(__file__).resolve().parents[1]
FEMALE = 'he-IL-HilaNeural'
MALE = 'he-IL-AvriNeural'
RUSSIAN = 'ru-RU-SvetlanaNeural'
REST = 0.75


def configure_trust():
    # Preserve certifi verification and append the platform's existing CA trust.
    for module in (edge_tts.communicate, edge_tts.voices):
        context = module._SSL_CTX
        context.load_default_certs()
        for name in ('SSL_CERT_FILE', 'REQUESTS_CA_BUNDLE'):
            value = os.environ.get(name)
            if value and Path(value).is_file():
                context.load_verify_locations(cafile=value)
        assert context.check_hostname and context.verify_mode == ssl.CERT_REQUIRED


def proxy():
    return os.environ.get('HTTPS_PROXY') or os.environ.get('https_proxy')


def duration(path):
    output = subprocess.check_output([
        'ffprobe', '-v', 'error', '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1', str(path),
    ], text=True)
    return float(output)


def join_phrases(phrases, target):
    command = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y']
    filters = []
    for index, phrase in enumerate(phrases):
        command += ['-i', str(phrase)]
        filters.append(f'[{index}:a]aresample=44100,aformat=channel_layouts=mono,'
                       f'apad=pad_dur={REST}[p{index}]')
    filters.append(''.join(f'[p{i}]' for i in range(len(phrases))) +
                   f'concat=n={len(phrases)}:v=0:a=1[joined]')
    subprocess.run(command + ['-filter_complex', ';'.join(filters), '-map', '[joined]',
                             '-c:a', 'pcm_s16le', str(target)], check=True)


async def generate(args):
    configure_trust()
    catalog = await edge_tts.list_voices(proxy=proxy())
    voices = {voice['ShortName']: voice for voice in catalog}
    required = (FEMALE, MALE, RUSSIAN)
    for name in required:
        if name not in voices:
            raise RuntimeError(f'Voice not in current Microsoft catalog: {name}')
    if args.catalog:
        print(json.dumps([voices[name] for name in required], ensure_ascii=False, indent=2))
        return
    args.output.mkdir(parents=True, exist_ok=True)
    manifest = {'provider': 'Microsoft Read Aloud through edge-tts',
                'synthetic': True, 'rest_seconds': REST, 'clips': []}
    with tempfile.TemporaryDirectory(prefix='native-voice-audition-') as temporary:
        temporary = Path(temporary)

        async def spoken(name, text, voice, rate='-5%'):
            destination = temporary / name
            client = edge_tts.Communicate(text, voice=voice, rate=rate,
                                          pitch='+0Hz', proxy=proxy())
            await client.save(str(destination))
            if destination.stat().st_size < 100:
                raise RuntimeError(f'Empty audio: {name}')
            return destination

        phrases = []
        for index, text in enumerate(('אני חמודה!', 'אני חמודה.', 'אני חמודה!')):
            phrases.append(await spoken(f'girl-{index}.mp3', text, FEMALE))
        girl = args.output / 'female-hebrew-with-pauses.wav'
        join_phrases(phrases, girl)
        manifest['clips'].append({'file': girl.name, 'voice': FEMALE,
                                  'text': 'אני חמודה | אני חמודה | אני חמודה',
                                  'seconds': duration(girl)})
        for name, text, voice, rate in (
            ('male-guard-hebrew.mp3', 'מה הסיסמה?', MALE, '-3%'),
            ('female-russian-password.mp3', 'пиздец котёнку.', RUSSIAN, '-5%'),
        ):
            source = await spoken(name, text, voice, rate)
            destination = args.output / name
            destination.write_bytes(source.read_bytes())
            manifest['clips'].append({'file': name, 'voice': voice, 'text': text,
                                      'seconds': duration(destination)})
    (args.output / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False,
                                                        indent=2) + '\n')
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--catalog', action='store_true')
    parser.add_argument('--output', type=Path, default=PROJECT / 'out/native-voice-auditions')
    args = parser.parse_args()
    try:
        asyncio.run(generate(args))
    except Exception as error:
        raise SystemExit(f'Voice generation failed: {error}') from error


if __name__ == '__main__':
    main()
