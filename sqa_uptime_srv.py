# Author: Victor Ding

# -*- coding:utf-8 -*-

import tornado.ioloop
import tornado.web
from robot import run
from ruamel.yaml import YAML
import os,time
import sys
import datetime
import telnetlib
import time,os,csv,xlrd,xlwt,json,re
import yaml
import threading


class ROBOT_YAML(YAML):
    def __init__(self):
        YAML.__init__(self)
        self.default_flow_style = False
        self.block_seq_indent = 2
        self.indent = 4
        self.allow_unicode = True
        self.encoding = 'utf-8'

class RobotHandler(tornado.web.RequestHandler):
     def get(self):
         pass

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

class LannerinfoHandler(tornado.web.RequestHandler):
    def get(self):
        pass

class NgpeinfoHandler(tornado.web.RequestHandler):
    def get(self):
        pass

class FW_InfoHandler(tornado.web.RequestHandler):
    def post(self, *args, **kwargs):
        pass

def make_perf_html_file():
    os.system('python get_perf_data(old,cannot delete).py')
    timer = threading.Timer(1200, make_perf_html_file) # run get_perf_data(old,cannot delete).py every 20 minutes
    timer.start()

def make_sys_html_file():
    os.system('python get_sys_data.py')
    timer = threading.Timer(1200, make_sys_html_file) # run get_sys_data(old,cannot delete).py every 20 minutes
    timer.start()


static_path1 = os.path.join(os.path.dirname(__file__), 'static')

settings = dict(static_path = static_path1, debug=True,)
application = tornado.web.Application(
    [(r"/", MainHandler),
     (r"/uptime", MainHandler),
     (r"/lanner", LannerinfoHandler),
     (r"/ngpe", NgpeinfoHandler),
     (r"/fwinfo", FW_InfoHandler),
     (r"/robot", RobotHandler), ], **settings
)

if __name__ == '__main__':
    try:
        make_sys_html_file()
        application.listen(9999)
        tornado.ioloop.IOLoop.instance().start()
    except KeyboardInterrupt:
        print("Bye Bye Bye Bye Bye!!!!!")
        sys.exit(0)