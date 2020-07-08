function create_table(trans_data) {
          var oTab = document.getElementById('antzone');
          var data = trans_data;
          var oTbody = oTab.tBodies[0];
          for (var index = 0; index < data.length; index++) {
            var oTr = document.createElement('tr');
            oTbody.appendChild(oTr);

            var oTd = document.createElement('td');
            oTd.innerHTML = data[index].id;
            oTr.appendChild(oTd);

            oTd = document.createElement('td');
            oTd.innerHTML = data[index].model;
            oTr.appendChild(oTd);

            oTd = document.createElement('td');
            oTd.innerHTML = data[index].serial;
            oTr.appendChild(oTd);

            oTd = document.createElement('td');
            oTd.innerHTML = data[index].ip;
            oTr.appendChild(oTd);

            oTd = document.createElement('td');
            oTd.innerHTML = data[index].firmware;
            oTr.appendChild(oTd);

            oTd = document.createElement('td');
            oTd.innerHTML = data[index].uptime;
            oTr.appendChild(oTd);

            var oA = document.createElement('a');
            oA.href = "javascript:;";
            oTd.appendChild(oA);
            oA.onclick = function () {
              oTbody.removeChild(this.parentNode.parentNode);
            }
          }
        }

function show_gen7_table(){
     del_button_background_color('b_lanner');
     del_button_background_color('b_upe');
     add_button_background_color('b_gen7');
     refresh_js();
     del_tab();
     var gen7_data =[{'uptime': '7 Days 23:24:53', 'ip': '10.7.5.37', 'firmware': 'SonicOSEnhanced7.0.0-P296', 'model': 'TZ370W', 'id': 1, 'serial': '2CB8ED3D8574'}, {'uptime': '12 Days 01:31:31', 'ip': '10.7.5.47', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-P271-5e75ead9', 'model': 'TZ470', 'id': 2, 'serial': '2CB8ED695294'}, {'uptime': '9 Days 21:58:21', 'ip': '10.7.5.58', 'firmware': 'SonicOSEnhanced7.0.0-P296', 'model': 'TZ570', 'id': 3, 'serial': '2CB8ED6D7608'}, {'uptime': '13 Days 19:18:09', 'ip': '10.7.5.57', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-b10faad9', 'model': 'TZ570P', 'id': 4, 'serial': '2CB8ED694C18'}, {'uptime': '18 Days 21:04:07', 'ip': '10.7.5.68', 'firmware': 'SonicOSEnhanced7.0.0.0-66v-42-b10faad9', 'model': 'TZ670', 'id': 5, 'serial': '2CB8ED694E70'}, {'uptime': '1 Day 21:50:28', 'ip': '10.7.5.59', 'firmware': 'SonicOSEnhanced7.0.0-P330', 'model': 'TZ570', 'id': 6, 'serial': '2CB8ED6941B4'}, {'uptime': '9 Days 19:08:36', 'ip': '10.7.5.67', 'firmware': 'SonicOSEnhanced7.0.0.0-66v-42-P261-9d7f4d7f', 'model': 'TZ670', 'id': 7, 'serial': '2CB8ED694AEC'}];
     create_table(gen7_data);
     }

function show_lanner_table(){
     del_button_background_color('b_gen7');
     del_button_background_color('b_upe');
     add_button_background_color('b_lanner');
     refresh_js();
     del_tab();
     var lanner_data =[{'uptime': '0 Days 23:35:27', 'ip': '10.7.20.89', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e', 'model': 'Root-NSsp15700', 'id': 1, 'serial': '2CB8ED5EC9C0'}, {'uptime': '0 Days 23:11:27', 'ip': '10.7.20.109', 'firmware': 'SonicOSEnhanced7.0.0-b10faad9', 'model': 'NSsp15700', 'id': 2, 'serial': '2CB8ED5ECA40'}, {'uptime': '0 Days 23:31:25', 'ip': '10.7.201.1', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e', 'model': 'Tenant-NSvt4', 'id': 3, 'serial': '0040103BB44F'}, {'uptime': '0 Days 23:26:52', 'ip': '10.7.201.65', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e', 'model': 'Tenant-NSvt4', 'id': 4, 'serial': '0040103BB45F'}, {'uptime': '0 Days 23:31:31', 'ip': '10.7.201.129', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e', 'model': 'Tenant-NSvt4', 'id': 5, 'serial': '0040103BB48F'}, {'uptime': '0 Days 23:31:03', 'ip': '10.7.201.193', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e', 'model': 'Tenant-NSvt4', 'id': 6, 'serial': '0040103BB49F'}, {'uptime': '0 Days 23:32:35', 'ip': '10.7.202.1', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e', 'model': 'Tenant-NSvt2', 'id': 7, 'serial': '0040103BB46F'}, {'uptime': '0 Days 23:31:36', 'ip': '10.7.202.65', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e', 'model': 'Tenant-NSvt2', 'id': 8, 'serial': '0040103BB47F'}, {'uptime': '0 Days 23:32:40', 'ip': '10.7.202.129', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e', 'model': 'Tenant-NSvt2', 'id': 9, 'serial': '0040103BB4AF'}, {'uptime': '0 Days 23:32:09', 'ip': '10.7.202.193', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e', 'model': 'Tenant-NSvt2', 'id': 10, 'serial': '0040103BB4BF'}];
     create_table(lanner_data);
     }

function show_ngpe_table(){
     del_button_background_color('b_gen7');
     del_button_background_color('b_lanner');
     add_button_background_color('b_upe');
     refresh_js();
     del_tab();
     var ngpe_data =[{'uptime': '20 Days 23:31:03', 'ip': '10.7.5.70', 'firmware': 'SonicOSEnhanced7.0.0.0-60v-42v-U39-915-0adc29f3', 'model': 'NSv400', 'id': 1, 'serial': '00401034E0C1'}, {'uptime': '20 Days 23:25:09', 'ip': '10.7.5.71', 'firmware': 'SonicOSEnhanced7.0.0.0-60v-42-U38-905-395bb7b9', 'model': 'NSv400', 'id': 2, 'serial': '00401034E93A'}, {'uptime': '22 Days 21:22:41', 'ip': '10.7.5.72', 'firmware': 'SonicOSEnhanced7.0.0.0-60v-42v-U39_1-920-e6748b6', 'model': 'NSv200', 'id': 3, 'serial': '00401034E493'}, {'uptime': '0 Days 17:50:48', 'ip': '10.7.5.180', 'firmware': 'SonicOSEnhanced7.0.0-937-d75e6855', 'model': 'NSv400', 'id': 4, 'serial': '00401034E975'}, {'uptime': '0 Days 21:07:37', 'ip': '10.7.5.181', 'firmware': 'SonicOSEnhanced7.0.0-937-d75e6855', 'model': 'NSv400', 'id': 5, 'serial': '00401034E976'}];
     create_table(ngpe_data);
     }
window.onload = function(){
     add_button_background_color('b_gen7');
     del_tab();
     var gen7_data =[{'uptime': '7 Days 23:24:53', 'ip': '10.7.5.37', 'firmware': 'SonicOSEnhanced7.0.0-P296', 'model': 'TZ370W', 'id': 1, 'serial': '2CB8ED3D8574'}, {'uptime': '12 Days 01:31:31', 'ip': '10.7.5.47', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-P271-5e75ead9', 'model': 'TZ470', 'id': 2, 'serial': '2CB8ED695294'}, {'uptime': '9 Days 21:58:21', 'ip': '10.7.5.58', 'firmware': 'SonicOSEnhanced7.0.0-P296', 'model': 'TZ570', 'id': 3, 'serial': '2CB8ED6D7608'}, {'uptime': '13 Days 19:18:09', 'ip': '10.7.5.57', 'firmware': 'SonicOSEnhanced7.0.0.0-68v-42-b10faad9', 'model': 'TZ570P', 'id': 4, 'serial': '2CB8ED694C18'}, {'uptime': '18 Days 21:04:07', 'ip': '10.7.5.68', 'firmware': 'SonicOSEnhanced7.0.0.0-66v-42-b10faad9', 'model': 'TZ670', 'id': 5, 'serial': '2CB8ED694E70'}, {'uptime': '1 Day 21:50:28', 'ip': '10.7.5.59', 'firmware': 'SonicOSEnhanced7.0.0-P330', 'model': 'TZ570', 'id': 6, 'serial': '2CB8ED6941B4'}, {'uptime': '9 Days 19:08:36', 'ip': '10.7.5.67', 'firmware': 'SonicOSEnhanced7.0.0.0-66v-42-P261-9d7f4d7f', 'model': 'TZ670', 'id': 7, 'serial': '2CB8ED694AEC'}];
     create_table(gen7_data);
     }

function refresh_js(){
    var old_script;
    old_script=document.getElementById("js");
    old_script.parentNode.removeChild(old_script);
    var new_script=document.createElement("script")
    new_script.type="text/javascript";
    new_script.setAttribute("id","js");
    new_script.src="./static/js/js.js";
    document.body.appendChild(new_script);
    }
function del_tab(){
     var tab=document.getElementById('antzone');
     var rows=tab.rows;
     var len=tab.rows.length;
     for(var i=len-1;i >0 ;i--){
             tab.deleteRow(i);
         }
     }
function add_button_background_color(type){
     var test_type;
     test_type = document.getElementById(type);
     test_type.setAttribute("class","btn blue-button link-active");
 }
function del_button_background_color(type){
     var test_type;
     test_type = document.getElementById(type);
     test_type.setAttribute("class","btn blue-button");
 }