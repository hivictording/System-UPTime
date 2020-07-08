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
     var gen7_data = [];
     create_table(gen7_data);
     }

function show_lanner_table(){
     del_button_background_color('b_gen7');
     del_button_background_color('b_upe');
     add_button_background_color('b_lanner');
     refresh_js();
     del_tab();
     var lanner_data = [];
     create_table(lanner_data);
     }

function show_ngpe_table(){
     del_button_background_color('b_gen7');
     del_button_background_color('b_lanner');
     add_button_background_color('b_upe');
     refresh_js();
     del_tab();
     var ngpe_data = [];
     create_table(ngpe_data);
     }
window.onload = function(){
     add_button_background_color('b_gen7');
     del_tab();
     var gen7_data = [];
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