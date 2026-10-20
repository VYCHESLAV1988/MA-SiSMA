#!/usr/bin/env python3
"""Serve a completed MP4 with byte ranges for native-browser seeking."""
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
from pathlib import Path
import re

class RangeHandler(SimpleHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'

    def send_head(self):
        self.range_remaining = None
        path = Path(self.translate_path(self.path)).resolve()
        if not path.is_relative_to(Path(self.directory).resolve()):
            self.send_error(403, 'Outside static root'); return None
        if not path.is_file():
            return super().send_head()
        f = path.open('rb')
        info = os.fstat(f.fileno())
        size = info.st_size
        start, end = 0, size-1
        requested = self.headers.get('Range')
        if requested:
            match = re.fullmatch(r'bytes=(\d*)-(\d*)', requested.strip())
            if not match or not any(match.groups()):
                f.close(); self.send_error(416, 'Unsupported byte range'); return None
            a, b = match.groups()
            if not a:
                start = max(0, size-int(b))
            else:
                start = int(a)
                if b: end = min(end, int(b))
            if start > end or start >= size:
                f.close(); self.send_response(416)
                self.send_header('Content-Range', f'bytes */{size}')
                self.send_header('Content-Length','0')
                self.end_headers(); return None
            self.send_response(206)
            self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        else:
            self.send_response(200)
        self.send_header('Content-Type', self.guess_type(str(path)))
        self.send_header('Content-Length', str(end-start+1))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Last-Modified', self.date_time_string(info.st_mtime))
        self.end_headers()
        f.seek(start)
        self.range_remaining = end-start+1
        return f

    def copyfile(self, source, outputfile):
        if self.range_remaining is None:
            return super().copyfile(source, outputfile)
        remaining = self.range_remaining
        try:
            while remaining:
                block = source.read(min(1024*1024, remaining))
                if not block: break
                outputfile.write(block)
                remaining -= len(block)
        except (BrokenPipeError, ConnectionResetError):
            pass

if __name__ == '__main__':
    p=argparse.ArgumentParser()
    p.add_argument('--port',type=int,default=3334)
    p.add_argument('--directory',default=str(Path(__file__).resolve().parents[1] / 'out'))
    args=p.parse_args()
    from functools import partial
    server=ThreadingHTTPServer(('0.0.0.0',args.port),partial(RangeHandler,directory=args.directory))
    server.serve_forever()
