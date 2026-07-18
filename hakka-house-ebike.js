// 2026-04-08:
window.addEventListener("load", (event) => {
   writeTtl();
});


// added 2026-04-08, updated 2026-07-18:
function showDialogCard(idDialog){

   const myDialog = document.querySelector(`#${idDialog}`);
   
   // Check if element exists to prevent null errors
   if (myDialog) {
      myDialog.showModal();
   } else {
      console.error(`#${idDialog} not found`);
   }
}


// from 2021-10-23 vending machine v1.0: display text across screen to welcome user
//2026-04-08 updated with gemini: 
// let msg = '欢迎到新鲜小吃机！';
let msg = "欢迎李大猪福田客家新鲜小吃无人机🐷！"

let msgLen = msg.length;
let tPlace = 0;
let runCount = 0;
const maxRuns = 3;

function writeTtl() {

    if (tPlace < msgLen) {
        // Handle spaces and characters
        ttlSpan.innerText += msg.charAt(tPlace);
        tPlace++;
        setTimeout(writeTtl, 300);
    } else {
        // Text is fully displayed
        runCount++;
        if (runCount <= maxRuns) {
            setTimeout(slideOff, 5000); // Wait 5s
        }
    }
}

function slideOff() {
    // Apply smooth transition
    ttlSpan.style.transition = "transform 10s linear";
    ttlSpan.style.transform = "translateX(-100vw)";

    // After 10s transition completes
    setTimeout(() => {
        // Reset position and text for the next loop
        ttlSpan.style.transition = "none";
        ttlSpan.style.transform = "translateX(0)";
        ttlSpan.innerText = "";
        tPlace = 0;
        
        if (runCount < maxRuns) {
            writeTtl();
        }
        else {
            // Final run: reset count so writeTtl doesn't trigger slideOff again
            runCount++; 
            writeTtl();
            // alert("Final display complete!");
        }

    }, 4000);
}
 
// 2026-04-12: gemini: tilt solar panel east-west direction
function tiltSolarPanel(){

   const solarPanel = document.querySelector('.roof-solar-panel-ebike-station-EBIKE');
   // const btn = document.getElementById('btnTiltSolarPanel');
   let currentRotation = 0;

   // btn.onclick = function() {
      // Add n degrees to the current rotation
      currentRotation += 3;
      // Apply the rotation via CSS transform property
      solarPanel.style.transform = `rotate(${currentRotation}deg)`;
   // };
}

/* 2026-04-12: gemini: rotate solar panel */
function rotatePanel() {
   const group = document.getElementById('solarGroup');
   group.classList.toggle('rotated');
}

// 2026-05-03: perplexity ai / gemini: play mp3 tracks
// #### js code needs to run after html code or else can't find audio tag ####
function toggleAudio(file, btn, txt) {

   const audio = document.getElementById("myAudio");
   const rotatingText = document.querySelector(".audio-rotating-text");
   const textPath = document.getElementById("rotatingTextPath");

   // Reset ALL buttons to original icons
   document.querySelectorAll('button[data-icon]').forEach(otherBtn => {
      otherBtn.innerHTML = otherBtn.getAttribute('data-icon');
   });

   // Set the source if it's not already set or if it's a different file
   const isNewTrack = file && audio.getAttribute("src") !== file;

   if (isNewTrack) {

      audio.src = file;
      textPath.textContent = txt;
      audio.play();
      btn.innerHTML = "🔲";
      rotatingText.classList.add("playing");

   } else {
      if (audio.paused) {

         audio.play();
         btn.innerHTML = "🔲";
         textPath.textContent = txt;
         rotatingText.classList.add("playing");

      } else {
         audio.pause();
         audio.currentTime = 0;
         
         //Change text back when manually stopped
         textPath.textContent = "。益 。pick a ⋆｡♪"; 
         
         //stop animation
         rotatingText.classList.remove("playing");
      }
   }
}


// 2026-05-03: gemini: This function runs automatically when the music ends
function resetAudio(audioElement) {

   const rotatingText = document.querySelector(".audio-rotating-text");
   const textPath = document.getElementById("rotatingTextPath");

   // Reset all buttons to original icons
   document.querySelectorAll('button[data-icon]').forEach(btn => {
      btn.innerHTML = btn.getAttribute('data-icon');
   });

   //change text back when music ends naturally
   textPath.textContent = "。益 。pick a ⋆｡♪"; 

   // Stop animation when finished
   rotatingText.classList.remove("playing");
}


// 2026-04-08:
function closeDialog(e) {
   // Finds the nearest parent <dialog> and closes it
   e.target.closest('dialog').close();
}

// 2026-05-20: gemini: stop youtube short from playing when close dialog
function closeVideoDialog() {
  // 1. Get the dialog element
  const dialog = document.getElementById('videoDialog');
  
  // 2. Get the iframe element
  const iframe = document.getElementById('shortPlayer');
  
  // 3. Hide the dialog UI
  dialog.style.display = 'none';
  
  // 4. Reset the src attribute to instantly kill the video audio
  const currentSrc = iframe.src;
  iframe.src = '';
  iframe.src = currentSrc;
}


// 2026-05-20: gemini: play youtube short in popup window
function openYoutubeShortPopup(myshortURL) {
   
   // Added autoplay=1 and mute=1 to the URL parameters
   //   const videoUrl = "https://www.youtube.com/shorts/39gDDdw9S7Q";
   const videoUrl = myshortURL;

   // Window dimensions for a vertical mobile aspect ratio
   const width = 450;
   const height = 800;

   // Center the window on the screen
   const left = (window.screen.width / 2) - (width / 2);
   const top = (window.screen.height / 2) - (height / 2);

   // Open the popup window
   window.open(
      videoUrl, 
      "YouTubeShort", 
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
   );
}


// 2026-07-11:
function showCompostSpeechBubble(){
   const mySpeechBubble = document.querySelector('#speechBubbleCompost');
   // Check if element exists to prevent null errors
   if (mySpeechBubble) {
      mySpeechBubble.style.display='grid';

      // Hide the bubble automatically after 50 seconds (50000ms) to match css total display animation duration
      setTimeout(() => {
         mySpeechBubble.style.display = 'none';
      }, 49000);

   } else {
      console.error("#mySpeechBubble not found");
   }
}
