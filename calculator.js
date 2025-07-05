function toggleCustomInput() {
  const workSelect = document.getElementById("worklength");
  const customInput = document.getElementById("customWorklength");
  customInput.style.display = workSelect.value === "custom" ? "block" : "none";
}

function calculateLeaveTime() {
  const arrival = document.getElementById("arrival").value;
  const overtime = document.getElementById("overtime").value;
  const workSelect = document.getElementById("worklength");
  const customInput = document.getElementById("customWorklength");
  const result = document.getElementById("result");

  if (!arrival) {
    result.textContent = "Please enter the arrival time.";
    return;
  }

  let workLength;
  if (workSelect.value === "custom") {
    workLength = parseFloat(customInput.value);
    if (isNaN(workLength) || workLength <= 0) {
      result.textContent = "Please enter a valid custom work duration.";
      return;
    }
  } else {
    workLength = parseFloat(workSelect.value);
  }

  const [aHour, aMin] = arrival.split(":").map(Number);
  const [oHour, oMin] = overtime.split(":").map(Number);
  const arrivalDate = new Date();
  arrivalDate.setHours(aHour);
  arrivalDate.setMinutes(aMin);
  arrivalDate.setSeconds(0);

  const standardWorkMinutes = workLength * 60;
  const overtimeMinutes = oHour * 60 + oMin;
  const effectiveWorkMinutes = standardWorkMinutes - overtimeMinutes;

  const leaveDate = new Date(arrivalDate.getTime() + effectiveWorkMinutes * 60000);
  const h = String(leaveDate.getHours()).padStart(2, '0');
  const m = String(leaveDate.getMinutes()).padStart(2, '0');

  result.textContent = `You can leave at ${h}:${m}`;
}
