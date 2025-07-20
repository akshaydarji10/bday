const messages = [
  "Wishing you endless happiness and love 💖",
  "Your smile lights up every room you enter ✨",
  "Hope this year brings you your heart's desires 🎂"
];

let currentMsg = 0;

function goToGifts() {
  const name = document.getElementById("username").value;
  if (name.trim() === "") {
    alert("Please enter a name.");
    return;
  }
  document.getElementById("nameScreen").classList.add("hidden");
  document.getElementById("giftScreen").classList.remove("hidden");
  document.getElementById("greeting").textContent = `Happy Birthday ${name}!!`;
}

function showGiftFirst() {
	document.getElementById("FirstGiftBox").classList.add("hidden");
	document.getElementById("nameScreen").classList.remove("hidden");
}

function revealMessage(giftEl, index) {
  if (giftEl.classList.contains("opened")) return;

  giftEl.classList.add("opened");
  document.getElementById("messageBox").textContent = messages[index];
  document.getElementById("messageBox").style.animation = "fadeIn 1s";

  currentMsg++;
  if (currentMsg === messages.length) {
    setTimeout(() => {
      document.getElementById("albumBtn").classList.remove("hidden");
    }, 1000);
  }
}

function goToNextGift() {
	document.getElementById("GiftbdaySurprise1").classList.add("hidden");
	document.getElementById("GiftbdaySurpriseText").classList.remove("hidden");
}

function goToNextGift2() {
	document.getElementById("GiftbdaySurpriseText").classList.add("hidden");
	document.getElementById("GiftbdaySurprise2").classList.remove("hidden");
}

function showAlbum() {
  document.getElementById("giftScreen").classList.add("hidden");
  //document.getElementById("drag-container").classList.remove("hidden");
  //ShowAllSlider();
  //const name = document.getElementById("username").value;
  //document.getElementById("bdayInnerText").textContent = `Happy Birthday ${name}`;
  window.location.href = "rotate.html";
}

function ShowAllSlider() {
	
// You can change global variables here:
      var radius = 240; // how big of the radius
      var autoRotate = true; // auto rotate or not
      var rotateSpeed = -60; // unit: seconds/360 degrees
      var imgWidth = 120; // width of images (unit: px)
      var imgHeight = 170; // height of images (unit: px)

      // ===================== start =======================
      setTimeout(init, 500);

      var odrag = document.getElementById("drag-container");
      var ospin = document.getElementById("spin-container");
      var aImg = ospin.getElementsByTagName("img");
      var aVid = ospin.getElementsByTagName("video");
      var aEle = [...aImg, ...aVid]; // combine 2 arrays

      // Size of images
      ospin.style.width = imgWidth + "px";
      ospin.style.height = imgHeight + "px";

      // Size of ground - depend on radius
      var ground = document.getElementById("ground");
      ground.style.width = radius * 3 + "px";
      ground.style.height = radius * 3 + "px";

      function init(delayTime) {
        for (var i = 0; i < aEle.length; i++) {
          aEle[i].style.transform =
            "rotateY(" +
            i * (360 / aEle.length) +
            "deg) translateZ(" +
            radius +
            "px)";
          aEle[i].style.transition = "transform 1s";
          aEle[i].style.transitionDelay =
            delayTime || (aEle.length - i) / 4 + "s";
        }
      }

      function applyTranform(obj) {
        // Constrain the angle of camera (between 0 and 180)
        if (tY > 180) tY = 180;
        if (tY < 0) tY = 0;

        // Apply the angle
        obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
      }

      function playSpin(yes) {
        ospin.style.animationPlayState = yes ? "running" : "paused";
      }

      var sX,
        sY,
        nX,
        nY,
        desX = 0,
        desY = 0,
        tX = 0,
        tY = 10;

      // auto spin
      if (autoRotate) {
        var animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
        ospin.style.animation = `${animationName} ${Math.abs(
          rotateSpeed
        )}s infinite linear`;
      }


	// setup events
	document.onpointerdown = function(e) {
	clearInterval(odrag.timer);
	e = e || window.event;
	var sX = e.clientX,
	  sY = e.clientY;

	this.onpointermove = function(e) {
	  e = e || window.event;
	  var nX = e.clientX,
		nY = e.clientY;
	  desX = nX - sX;
	  desY = nY - sY;
	  tX += desX * 0.1;
	  tY += desY * 0.1;
	  applyTranform(odrag);
	  sX = nX;
	  sY = nY;
	};

	this.onpointerup = function(e) {
	  odrag.timer = setInterval(function() {
		desX *= 0.95;
		desY *= 0.95;
		tX += desX * 0.1;
		tY += desY * 0.1;
		applyTranform(odrag);
		playSpin(false);
		if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
		  clearInterval(odrag.timer);
		  playSpin(true);
		}
	  }, 17);
	  this.onpointermove = this.onpointerup = null;
	};

	return false;
	};

	document.onmousewheel = function(e) {
	e = e || window.event;
	var d = e.wheelDelta / 20 || -e.detail;
	radius += d;
	init(1);
	};
}