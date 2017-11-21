
//get modal element
var profileModal = document.getElementById('editProfileModal');


//get modal button 
var profileModalBtn = document.getElementById('editProfileBtn');

//get close button
var closeBtn = document.getElementsByClassName('closeBtn')[0];

//Listen for open click
editProfileBtn.addEventListener('click', openProfileModal);

//Listen for close click 
closeBtn.addEventListener('click', closeModal);


//listen for outside click
window.addEventListener('click', outsideClick);

//function to open modal
function openProfileModal(){
  profileModal.style.display = 'flex';
} 


//function to close modal 


function closeModal(){
  if(e.target == profileModal) {
profileModal.style.display = 'none';
 }
}


//function to close modal if outside click
function outsideClick(e){
if(e.target == profileModal) {
profileModal.style.display = 'none';
 }
}





