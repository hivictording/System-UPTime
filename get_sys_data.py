# -*- coding: utf-8 -*-
import telnetlib
import time,os,csv,xlrd,json,paramiko,requests,re
import openpyxl
class Sysdata(object):
    def __init__(self,type):
        self.type = type

    def read_csv_file(self,filename):
        csv_dict = csv.DictReader(open(filename))
        return csv_dict

    def xls_to_csv(self,filename,wsheet):
        wb=xlrd.open_workbook(filename)
        sh=wb.sheet_by_name(wsheet)
        curr_dir=os.getcwd()
        csvfile=curr_dir+'\\tmp.csv'
        a=open(csvfile,'wb')
        wr=csv.writer(a,quoting=csv.QUOTE_ALL)
        for rownum in xrange(sh.nrows):
            wr.writerow(sh.row_values(rownum))
        a.close()

    def read_xls_file(self,filename, worksheet):
        self.xls_to_csv(filename, worksheet)
        curr_dir = os.getcwd()
        cf = curr_dir + '\\tmp.csv'
        xls_data = self.read_csv_file(cf)
        return xls_data

    def get_xls_sheetsname(self,filename):
        wb = openpyxl.load_workbook(filename)
        sheetsname = wb.sheetnames
        new_sheetname = []
        for name in sheetsname:
            s = name.encode('utf-8')
            new_sheetname.append(s)
        return new_sheetname

    def do_telnet(self, host, port, mode):
        telobj = telnetlib.Telnet(host, port, timeout=10)

        telobj.set_debuglevel(2)
        try:
            telobj.read_until('login:')
            telobj.write('root' + '\r')
            telobj.read_until('Password: ')
            telobj.write('123456' + '\r')
            time.sleep(0.3)
            telobj.write('\r')
            telobj.read_some()
            command_res = telobj.read_some()
            # try:
            if 'User:' in command_res:
                # print('----------------------------------------')
                telobj.write('admin' + '\r')
                telobj.read_until('Password:')
                telobj.write('password' + '\r')
                telobj.write('\r')
            elif '#' in command_res:
                for count in range(3):
                    telobj.write('cancel' + '\r')
            elif '->' in command_res:
                telobj.write('exit' + '\r')
                telobj.write('\r')
            elif '--MORE--' in command_res:
                for i in range(3):
                    telobj.write(chr(32))
            elif '[cancel]' in command_res:
                telobj.write('yes' + '\r')
            elif '> ' in command_res:
                telobj.write('\r')

            else:
                telobj.write('\r')
                for i in range(3):
                    telobj.write(chr(32))
            time.sleep(0.1)

            telobj.write('show status' + '\r')
            for count in range(5):
                telobj.write(chr(32))
            telobj.write('\r')
            time.sleep(0.8)
            all_res = telobj.read_very_eager()
            telobj.close()
        except:
            telobj.close()
            all_res = mode + ":" + "console_fail"
        return all_res  # returned " " when console access failed

    def do_ssh_cmd(self,ip,port,cmd,user,psw,mode):
        # t = paramiko.Transport(ip, port)
        try:
            t = paramiko.Transport(ip, port)
            t.connect(username=user, password=psw)
            chan = t.open_session()
            chan.settimeout(timeout=60)
            chan.get_pty()
            chan.invoke_shell()
            chan.send(cmd[0] + '\n')
            for i in range(3):
                chan.send(chr(32)) # tap SPACE to read all lines
            time.sleep(1)
            result = chan.recv(65535)

        except:
            result = mode +":" +"ssh_fail"
        return result


    def do_uptime_interval(self,uptime):
        # 0Days20:18:14
        if 'Days' in uptime:
            uptime_str = uptime.split('Days')
            new_uptime_str = uptime_str[0] +" Days " + uptime_str[-1]
        else:
            uptime_str = uptime.split('Day')
            new_uptime_str = uptime_str[0] + " Day " + uptime_str[-1]
        return new_uptime_str

    def do_api_data(self, api_data):
        # get all fields name
        i = 1
        list_model = []
        for fw_res in api_data:
            all_res = fw_res.replace('\r\n', '')
            all_res = all_res.replace('\r', '')
            all_res = all_res.replace('\n', '')
            all_res = all_res.replace('\\', '')
            all_res = all_res.replace(' ', '')
            mode_firststr = all_res.split('$$$')[0]
            try:
                # get mode name
                res = re.search('"model":"\w+"', all_res)
                str = res.group()
                model = str.split(':"')[-1]
                model = model.split('"')[0]

                if self.type == 'lanner':
                    if mode_firststr == "Root-NSsp15700":
                        model = "Root-NSsp15700"
                    elif mode_firststr == "NSsp15700":
                        model = "NSsp15700"
                    else:
                        model = "Tenant-" + model

                if self.type == 'gen7':
                    if model == "TZ670P":
                        model = "TZ670"

                print('%s:%s,API running time is: %s' % (test_obj.type,model,time.strftime('%Y-%m-%d %H:%M:%S')))
                # get Serial Number
                res = re.search('"serial_number":"\w+', all_res)
                str = res.group()
                serial = str.split('":"')[-1]

                # get current firmware
                res = re.search('"firmware_version":".+\-\w+"', all_res)
                str = res.group()
                firmware = str.split(':"')[-1]
                firmware = firmware.split('"')[0]


                # get uptime
                res = re.search('"up_time":"\w+:\d+:\d+"', all_res)
                str = res.group()
                uptime = str.split(':"')[-1]
                uptime = uptime.split('"')[0]
                uptime = self.do_uptime_interval(uptime)


                # get IP address
                if mode_firststr == "NSv400-2(ha_peer)":
                    res = re.search('"X1".+"X2"', all_res)
                    str1 = res.group()
                    str2 = str1.split('"secondary":"')[-1]
                    ip = str2.split('"}')[0]

                else:
                    res = re.search('ip_address":"\d+[\.\d+]+.+X1\(WAN\)', all_res)
                    str1 = res.group()
                    str2 = str1.split('"ip_address":"')[-1]
                    ip = str2.split('","name"')[0]

                dict_model = {
                    "id": i,
                    "model": model,
                    "serial": serial,
                    "ip": ip,
                    "firmware": firmware,
                    "uptime": uptime
                }
                i += 1
                list_model.append(dict_model)
            except:
                # get data console
                dict_model = {
                    "id": i,
                    "model": mode_firststr,
                    "serial": "got data error(api)",
                    "ip": "got data error(api)",
                    "firmware": "got data error(api)",
                    "uptime": "got data error(api)"
                }
                i += 1
                list_model.append(dict_model)
        return list_model

    def do_console_data(self, console_reult):
        # get all fields name
        i = api_counter + 1
        list_model = []
        for fw_res in console_reult:
            if "console_fail" not in fw_res:
                if "ssh_fail" not in fw_res:
                    all_res = fw_res.replace('\r\n', '')
                    all_res = all_res.replace('\r', '')
                    all_res_ip = all_res
                    all_res = all_res.replace(' ', '')
                    mode_firststr = all_res.split('$$$')[0]
                    try:
                        # get mode name
                        res = re.search('Model:\w+', all_res)
                        str = res.group()
                        str1 = str.split("Model:")[-1]
                        model = str1.split('ProductCode')[0]

                        if self.type == 'lanner':
                            if mode_firststr == "Root-NSsp15700":
                                model = "Root-NSsp15700"
                            elif mode_firststr == "NSsp15700":
                                model = "NSsp15700"
                            else:
                                model = "Tenant-" + model

                        if self.type == 'gen7':
                            if model == "TZ670P":
                                model = "TZ670"

                        print('%s:%s,Cosole running time is: %s' % (test_obj.type, model, time.strftime('%Y-%m-%d %H:%M:%S')))

                        # get Serial Number
                        res = re.search('SerialNumber:\w+', all_res)
                        str = res.group()
                        str = str.split('AuthenticationCode')[0]
                        serial = str.split(':')[-1]

                        # get current firmware
                        res = re.search('FirmwareVersion:[A-Za-z]+[\w.]+[-\w]+', all_res)
                        str = res.group()
                        str = str.split(':')[-1]

                        if 'ROMVersion' in str:
                            firmware = str.split('ROMVersion')[0]
                        elif 'SystemTime' in str:
                            firmware = str.split('SystemTime')[0]
                        elif 'AppsVersion' in str:
                            firmware = str.split('AppsVersion')[0]
                        else:
                            firmware = str.split('CPUs')[0]

                        # get uptime
                        res = re.search('UpTime:[\w]+[:\d]+', all_res)
                        str = res.group()
                        uptime = str.split('UpTime:')
                        uptime = uptime[-1]
                        uptime = self.do_uptime_interval(uptime)

                        # get IP address,
                        if mode_firststr == "NSv400-2(ha_peer)":
                            ip = ip_HA
                        else:
                            res = re.search('X1\(WAN\)\s+[\d.]+', all_res_ip)
                            str1 = res.group()
                            str1 = str1.replace(' ','')
                            ip = str1.split('X1(WAN)')[-1]

                        dict_model = {
                            "id": i,
                            "model": model,
                            "serial": serial,
                            "ip": ip,
                            "firmware": firmware,
                            "uptime": uptime
                        }
                        i += 1
                        list_model.append(dict_model)
                    except:
                        dict_model = {
                            "id": i,
                            "model": mode_firststr,  # still get model name when get error data
                            "serial": "got data error(console)",
                            "ip": "got data error(console)",
                            "firmware": "got data error(console)",
                            "uptime": "got data error(console)"
                        }
                        i += 1
                        list_model.append(dict_model)

                elif "ssh_fail" in fw_res:
                    ssh_mode = fw_res.split("$$$")[0]

                    dict_model = {
                        "id": i,
                        "model": ssh_mode,
                        "serial": "ssh connect failed",
                        "ip": "ssh connect failed",
                        "firmware": "ssh connect failed",
                        "uptime": "ssh connect failed"
                    }
                    i += 1
                    list_model.append(dict_model)
            else:
                cosole_mode = fw_res.split("$$$")[0]
                dict_model = {
                    "id": i,
                    "model": cosole_mode,
                    "serial": "Console access failed",
                    "ip": "Console access failed",
                    "firmware": "Console access failed",
                    "uptime": "Console access failed"
                }
                i += 1
                list_model.append(dict_model)
        return list_model

    def do_transfer_data_html(self,all_model_list):
        #Saving data as perf.txt and sys.txt
        if self.type == 'gen7':
            file_path = "./static/data/gen7.txt"
        elif self.type == 'lanner':
            file_path = "./static/data/lanner.txt"
        elif self.type == 'ngpe':
            file_path = "./static/data/ngpe.txt"
        with open(file_path, 'w') as tf:
            tf.write(str(all_model_list))
        # # Saving a new JS file
        in_path = './static/js/temp.js'
        out_path = './static/js/js.js'
        file_in = open(in_path, 'r')
        file_out = open(out_path, 'w')
        file_content = file_in.read()
        with open("./static/data/gen7.txt", 'r') as fp_gen7,open("./static/data/lanner.txt", 'r') as fp_lanner,open("./static/data/ngpe.txt", 'r') as fp_ngpe:
            for content in fp_gen7:
                file_content = file_content.replace('var gen7_data = []', 'var gen7_data =' + content)
            for content in fp_lanner:
                file_content = file_content.replace('var lanner_data = []', 'var lanner_data =' + content)
            for content in fp_ngpe:
                file_content = file_content.replace('var ngpe_data = []', 'var ngpe_data =' + content)

        file_out.write(file_content)
        file_in.close()
        file_out.close()

    def api_login(self,ip_addr):
        requests.packages.urllib3.disable_warnings()
        url = "https://" + ip_addr +"/api/sonicos/auth"
        # url = "https://10.7.20.109/api/sonicos/auth"
        data = {
            'override': True
        }
        headers = {
            'Accept': 'application/json',
            'Accept-Encoding': 'application/json',
         }
        r =requests.post(url=url,auth=(username,password),data=json.dumps(data), headers=headers, verify=False)
        return r.status_code

    def api_logout(self,ip_addr):
        requests.packages.urllib3.disable_warnings()
        url = "https://" + ip_addr + "/api/sonicos/auth"
        headers = {
            'Accept': 'application/json',
            'Accept-Encoding': 'application/json',
        }
        requests.delete(url,headers = headers,verify = False)

    def get_fw_info(self,ip_addr):
        requests.packages.urllib3.disable_warnings()
        # url = 'https://' + ip_addr + '/api/sonicos/reporting/system'  # for gen6
        url = 'https://' + ip_addr + '/api/sonicos/reporting/status/system'  # for gen7
        headers = {
            'Accept-Encoding': 'application/json',
        }
        r = requests.get(url, headers = headers, verify = False)
        res =json.dumps(r.json()).encode('utf-8')
        return (res)

    def get_ip_info(self,ip_addr,type):
        requests.packages.urllib3.disable_warnings()
        # url = 'https://' + ip_addr + '/api/sonicos/reporting/interfaces/ip' # for gen6
        if type == "NSv400-2(ha_peer)":
            url = 'https://' + ip_addr + '/api/sonicos/high-availability/monitoring/ipv4'  # for gen7 High-availability
        else:
            url = 'https://' + ip_addr + '/api/sonicos/reporting/status/interfaces' # for gen7
        headers = {
            # 'Accept-Encoding': 'application/json',# the header is for Gen6
            'Content-Type': 'application/json',
        }
        r = requests.get(url, headers=headers, verify=False)
        res = json.dumps(r.json()).encode('utf-8')
        return (res)

    def get_api_data(self,hostIP,type):
        # get firewall info and ip info
        data_info = test_obj.get_fw_info(hostIP) + test_obj.get_ip_info(hostIP,type)
        return data_info

    def get_cosole_data(self,console_server,console_port,mode_type,hostIP):
        if self.type == "gen7":
            if mode_type == "TZ370-sys":
                mode_type = mode_type.split('-')[0]
                host = readxls_res_list[0]['HOST_IP']
                res = test_obj.do_ssh_cmd(host, port, commands, username, password, mode_type)
            else:
                mode_type = mode_type.split('-')[0]
                res = test_obj.do_telnet(console_server, console_port, mode_type)
        elif self.type == "lanner":
            if "NSsp15700" in mode_type:
                res = test_obj.do_telnet(console_server, console_port, mode_type)
            else:
                mode_type = mode_type.split('-')[0]
                host = readxls_res_list[0]['HOST_IP']
                res = test_obj.do_ssh_cmd(host, port, commands, username, password, mode_type)
        elif self.type == "ngpe":
            mode_type = mode_type.split('-')[0]
            host = readxls_res_list[0]['HOST_IP']
            res = test_obj.do_ssh_cmd(host, port, commands, username, password, mode_type)
        return res

if __name__ == '__main__':
    print('------------------------------START:%s-----------------------------'%time.strftime('%Y-%m-%d %H:%M:%S'))
    gen7_obj = Sysdata('gen7')
    lanner_obj = Sysdata('lanner')
    ngpe_obj = Sysdata('ngpe')
    username = 'admin'
    password = 'password'
    finish = '>'
    commands = ['show status']
    port = 22
    xls_file_path = ''
    for test_obj in [gen7_obj,lanner_obj,ngpe_obj]:
    # for test_obj in [lanner_obj]:
        api_get_info = []
        console_get_info = []
        if test_obj.type == 'gen7':
            xls_file_path = './topology_gen7.xlsx'
            modetype_list = test_obj.get_xls_sheetsname(xls_file_path)
        elif test_obj.type == 'lanner':
            xls_file_path = './topology_lanner.xlsx'
            modetype_list = test_obj.get_xls_sheetsname(xls_file_path)
        else:
            xls_file_path = './topology_ngpe.xlsx'
            modetype_list = test_obj.get_xls_sheetsname(xls_file_path)

        api_counter = 0
        console_counter = 0
        cosole_box_list = []
        # get fw counts from api and get fw counts from console
        for mode_type in modetype_list:
            readxls_res = test_obj.read_xls_file(xls_file_path,mode_type)
            readxls_res_list = list(readxls_res)
            console_server = readxls_res_list[0]['CONSOLE_SERVER']
            console_port = readxls_res_list[0]['CONSOLE_TELNETPORT']  # the result type is string, e.g '2031.0'
            console_port_new = int(
                console_port[0] + console_port[1] + console_port[2] + console_port[3])  # get port number
            hostIP = readxls_res_list[0]['HOST_IP']
            if mode_type == "NSv400-2(ha_peer)":
                ip_HA = hostIP

            try:# login
                status = test_obj.api_login(hostIP)
                if status == 200:
                    api_counter = api_counter + 1
                    # get data via API
                    data = test_obj.get_api_data(hostIP, mode_type)
                    api_get_info.append(mode_type + "$$$" + data)
                    if console_counter == 0:
                        console_data = []
                    # test_obj.api_logout(hostIP)
                else:
                    console_counter = console_counter + 1
                    cosole_box_list.append(mode_type)
                    # get data via console
                    data = test_obj.get_cosole_data(console_server, console_port_new, mode_type, hostIP)
                    console_get_info.append(mode_type + "$$$" + data)
                    if api_counter == 0:
                        api_data = []
            except:
                console_counter = console_counter + 1
                cosole_box_list.append(mode_type)
                # get data via console
                data = test_obj.get_cosole_data(console_server, console_port_new, mode_type, hostIP)
                console_get_info.append(mode_type + "$$$" + data)
                if api_counter == 0:
                    api_data = []

        if api_counter != 0:
            api_data = test_obj.do_api_data(api_get_info)
            print('%s:FW number via API is %d' % (test_obj.type,api_counter))
            print('********API********')
        if console_counter != 0:
            console_data = test_obj.do_console_data(console_get_info)
            print('%s:FW number via console is %d' % (test_obj.type,console_counter))
            print('********Console********')

        result = api_data + console_data
        test_obj.do_transfer_data_html(result)
    print('-------------------------------END:%s------------------------------'%time.strftime('%Y-%m-%d %H:%M:%S'))
