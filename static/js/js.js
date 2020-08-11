// Data from Backend

let allData = [
  {
    type: "gen7",
    testbed: "traffic",
    uptime: "7 Days 23:24:53",
    ip: "10.7.5.37",
    firmware: "SonicOSEnhanced7.0.0-P296",
    model: "TZ370W",
    serial: "2CB8ED3D8574",
  },
  {
    type: "gen7",
    testbed: "traffic",
    uptime: "12 Days 01:31:31",
    ip: "10.7.5.47",
    firmware: "SonicOSEnhanced7.0.0.0-68v-42-P271-5e75ead9",
    model: "TZ470",
    serial: "2CB8ED695294",
  },
  {
    type: "gen7",
    testbed: "traffic",
    uptime: "9 Days 21:58:21",
    ip: "10.7.5.58",
    firmware: "SonicOSEnhanced7.0.0-P296",
    model: "TZ570",
    serial: "2CB8ED6D7608",
  },
  {
    type: "gen7",
    testbed: "traffic",
    uptime: "13 Days 19:18:09",
    ip: "10.7.5.57",
    firmware: "SonicOSEnhanced7.0.0.0-68v-42-b10faad9",
    model: "TZ570P",
    serial: "2CB8ED694C18",
  },
  {
    type: "gen7",
    testbed: "traffic",
    uptime: "18 Days 21:04:07",
    ip: "10.7.5.68",
    firmware: "SonicOSEnhanced7.0.0.0-66v-42-b10faad9",
    model: "TZ670",
    serial: "2CB8ED694E70",
  },
  {
    type: "gen7",
    testbed: "traffic",
    uptime: "1 Day 21:50:28",
    ip: "10.7.5.59",
    firmware: "SonicOSEnhanced7.0.0-P330",
    model: "TZ570",
    serial: "2CB8ED6941B4",
  },
  {
    type: "gen7",
    testbed: "traffic",
    uptime: "9 Days 19:08:36",
    ip: "10.7.5.67",
    firmware: "SonicOSEnhanced7.0.0.0-66v-42-P261-9d7f4d7f",
    model: "TZ670",
    serial: "2CB8ED694AEC",
  },
  {
    type: "nssp",
    testbed: "traffic",
    uptime: "0 Days 23:35:27",
    ip: "10.7.20.89",
    firmware: "SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e",
    model: "Root-NSsp15700",
    serial: "2CB8ED5EC9C0",
  },
  {
    type: "nssp",
    testbed: "traffic",
    uptime: "0 Days 23:11:27",
    ip: "10.7.20.109",
    firmware: "SonicOSEnhanced7.0.0-b10faad9",
    model: "NSsp15700",
    serial: "2CB8ED5ECA40",
  },
  {
    type: "nssp",
    testbed: "traffic",
    uptime: "0 Days 23:31:25",
    ip: "10.7.201.1",
    firmware: "SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e",
    model: "Tenant-NSvt4",
    serial: "0040103BB44F",
  },
  {
    type: "nssp",
    testbed: "traffic",
    uptime: "0 Days 23:26:52",
    ip: "10.7.201.65",
    firmware: "SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e",
    model: "Tenant-NSvt4",
    serial: "0040103BB45F",
  },
  {
    type: "nssp",
    testbed: "traffic",
    uptime: "0 Days 23:31:31",
    ip: "10.7.201.129",
    firmware: "SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e",
    model: "Tenant-NSvt4",
    serial: "0040103BB48F",
  },
  {
    type: "nssp",
    testbed: "traffic",
    uptime: "0 Days 23:31:03",
    ip: "10.7.201.193",
    firmware: "SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e",
    model: "Tenant-NSvt4",
    serial: "0040103BB49F",
  },
  {
    type: "nssp",
    testbed: "traffic",
    uptime: "0 Days 23:32:35",
    ip: "10.7.202.1",
    firmware: "SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e",
    model: "Tenant-NSvt2",
    serial: "0040103BB46F",
  },
  {
    type: "nssp",
    testbed: "traffic",
    uptime: "0 Days 23:31:36",
    ip: "10.7.202.65",
    firmware: "SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e",
    model: "Tenant-NSvt2",
    serial: "0040103BB47F",
  },
  {
    type: "nssp",
    testbed: "traffic",
    uptime: "0 Days 23:32:40",
    ip: "10.7.202.129",
    firmware: "SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e",
    model: "Tenant-NSvt2",
    serial: "0040103BB4AF",
  },
  {
    type: "nssp",
    testbed: "traffic",
    uptime: "0 Days 23:32:09",
    ip: "10.7.202.193",
    firmware: "SonicOSEnhanced7.0.0.0-68v-42-172-fe33ca0e",
    model: "Tenant-NSvt2",
    serial: "0040103BB4BF",
  },
  {
    type: "ngpe",
    testbed: "traffic",
    uptime: "20 Days 23:31:03",
    ip: "10.7.5.70",
    firmware: "SonicOSEnhanced7.0.0.0-60v-42v-U39-915-0adc29f3",
    model: "NSv400",
    serial: "00401034E0C1",
  },
  {
    type: "ngpe",
    testbed: "traffic",
    uptime: "20 Days 23:25:09",
    ip: "10.7.5.71",
    firmware: "SonicOSEnhanced7.0.0.0-60v-42-U38-905-395bb7b9",
    model: "NSv400",
    serial: "00401034E93A",
  },
  {
    type: "ngpe",
    testbed: "traffic",
    uptime: "21 Days 21:22:41",
    ip: "10.7.5.72",
    firmware: "SonicOSEnhanced7.0.0.0-60v-42v-U39_1-920-e6748b6",
    model: "NSv200",
    serial: "00401034E493",
  },
  {
    type: "ngpe",
    testbed: "traffic",
    uptime: "0 Days 17:50:48",
    ip: "10.7.5.180",
    firmware: "SonicOSEnhanced7.0.0-937-d75e6855",
    model: "NSv400",
    serial: "00401034E975",
  },
  {
    type: "ngpe",
    testbed: "traffic",
    uptime: "0 Days 21:07:37",
    ip: "10.7.5.181",
    firmware: "SonicOSEnhanced7.0.0-937-d75e6855",
    model: "NSv400",
    serial: "00401034E976",
  },
];

let uptimeCenter = document.querySelector(".uptime-center");
let btnContainer = document.querySelector(".btn-container");

// After DOM get loaded
window.addEventListener("DOMContentLoaded", () => {
  // AUTO generate buttons based on firewall type
  let typeSet = new Set().add("all");
  allData
    .map((data) => data.type)
    .reduce((result, next) => result.add(next), typeSet);

  btnContainer.innerHTML = Array.from(typeSet)
    .map(
      (type) => `
     <a href="#" class="btn blue-button" data-type=${type}>${type}</a>`
    )
    .join("");

  // button click event
  const buttons = btnContainer.querySelectorAll(".btn");
  buttons.forEach((button) =>
    button.addEventListener("click", function () {
      // activate the current button and deactivate the other buttons
      this.classList.add("link-active");
      for (let child of this.parentNode.children) {
        if (child !== this) {
          child.classList.remove("link-active");
        }
      }

      // show related data
      uptimeCenter.innerHTML = showData(
        this.dataset.type === "all"
          ? allData
          : allData.filter((item) => item.type === this.dataset.type)
      );
    })
  );

  // Load default data (first button)
  uptimeCenter.innerHTML = showData(
    allData.filter((item) => item.type === buttons[1].dataset.type)
  );

  Array.from(buttons)
    .filter((button) => button.dataset.type === buttons[1].dataset.type)[0]
    .classList.add("link-active");
});

// Return HTML based on data
function showData(data) {
  return data
    .map(
      (item) =>
        `<tr>
          <th scope="row">${data.indexOf(item) + 1}</th>
          <td>${item.model}</td>
          <td>${item.serial}</td>
          <td>${item.ip}</td>
          <td>${item.firmware}</td>
          <td>${item.uptime}</td>
     </tr>`
    )
    .join("");
}
