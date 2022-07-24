let colorLi = document.querySelectorAll(".list_links li");
let landing = document.querySelector(".landing");
let icon = document.querySelector('.icon i');
let menu = document.querySelector('.menu');
let backgroundEl = document.querySelectorAll('.choix span');

//Start Color local storage
let mainColor = localStorage.getItem('color_option');

if(mainColor !== null) {
   document.documentElement.style.setProperty('--main-color', mainColor);

   colorLi.forEach(el => {
      if(el.dataset.color === mainColor) {
          el.classList.add('active');
      } else {
         el.classList.remove('active');
      }
   })
}

colorLi.forEach(li => {
   li.addEventListener("click", (e) => {
      document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
      localStorage.setItem('color_option', e.target.dataset.color);

     toogleChange(e);

   })
})
//End Color Local Storage

//Start Background option
let backOption = true;
let backInterval;

let backlocal = localStorage.getItem('option_back');

if(backlocal !== null) {
   if(backlocal === 'true') {
      backOption = true;
   } else {
      backOption = false;
   }

   backgroundEl.forEach(ele => {
         ele.classList.remove('active');
      });
      
      if(backlocal === 'true') {
         document.querySelector('.choix .yes').classList.add('active');
      } else {
         document.querySelector('.choix .no').classList.add('active');
      }

}

backgroundEl.forEach(span => {
   span.addEventListener('click', (e) => {
      
       toogleChange(e);
       
       if(e.target.dataset.background === "yes") {
          backOption = true;
          normImg();
          
          localStorage.setItem('option_back', true);

       } else {
          backOption = false;
          clearInterval(backInterval);

           localStorage.setItem('option_back', false);

       }
       
   })
})
//End Background Option

//Start Rondom imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function normImg() {
   if(backOption === true) {
      backInterval = setInterval(() => {
        let randomNum = Math.floor(Math.random() * imgsArray.length);
   //console.log(randomNum);
        landing.style.backgroundImage = `url(../imgs/${imgsArray[randomNum]})`;
      }, 3000);
 }
}

function toogleChange(event) {
      event.target.parentElement.querySelectorAll('.active').forEach(el => {
         el.classList.remove('active');
      })
      event.target.classList.add('active');
     
}
//End Rondom imgs

//Start Change Imgs
let imgChange = document.querySelectorAll('.box_images img');

imgChange.forEach(img => {
   img.addEventListener('click', (e) => {
      clearInterval(backInterval);
      landing.style.backgroundImage = `url(../imgs/${e.target.src.slice(27)})`;
   })
})
//End Change Imgs

//tart Setting Icon
icon.addEventListener('click', (e) => {
   e.stopPropagation();

   menu.classList.toggle('open');
   icon.classList.toggle('fa-spin');
})
//End Setting Icon

//section skills
let sectionSkills = document.querySelector('.skills');

window.onscroll = () => {
   let skillsTop = sectionSkills.offsetTop;
   //console.log(skillsTop);

   let skillsHeight = sectionSkills.offsetHeight;
   //console.log(skillsHeight);

   let windowHeight = this.innerHeight;
   //console.log(windowHeight);

   let windowScrollTop = this.pageYOffset;
   //console.log(windowScrollTop);

   if(windowScrollTop > (skillsTop + skillsHeight - windowHeight)) {
      let allSkills = document.querySelectorAll('.skill_box .skill_progress span');
      allSkills.forEach(skill => {
         skill.style.width = skill.dataset.progress;
      })
   }
}
//End Section skills

//Start Section galery
let galeryImg = document.querySelectorAll('.box_galery img');
galeryImg.forEach(img => {
   img.addEventListener('click', (e) => {
      let popup_overlay = document.createElement('div');
      popup_overlay.className = 'popup_overlay';
      document.body.appendChild(popup_overlay);

      let popup_box = document.createElement('div');
      popup_box.className = 'popup_box';

      let popup_title = document.createElement('h3');
      popup_title.className = 'popup_title';
      let popup_title_text = document.createTextNode(img.alt);
      popup_title.appendChild(popup_title_text);

      popup_box.appendChild(popup_title);

      let image = document.createElement('img');
      image.src = img.src;

      popup_box.appendChild(image);

      document.body.appendChild(popup_box);

      let popup_close = document.createElement('button');
      popup_close.className = 'popup_close';
      let popup_close_text = document.createTextNode('X');
      popup_close.appendChild(popup_close_text);

      popup_box.appendChild(popup_close);
   })
})

document.addEventListener('click', (e) => {
   if(e.target.className === 'popup_close') {
        e.target.parentElement.remove();
        document.querySelector('.popup_overlay').remove();
   }
})

//End Section Galery

//Start bullets
let bullets = document.querySelectorAll('.bullets .bullet');

bullets.forEach(bullet => {
   bullet.addEventListener('click', (e) => {
      e.target.classList.toggle('open');
   })
})
//End Bullets

//Start Section
let allLinks = document.querySelectorAll('.links li a');
let allBullets = document.querySelectorAll('.bullets .bullet a');

function GoSection(elements) {
   elements.forEach(element => {
      element.addEventListener('click', (e) => {
         e.preventDefault();
         document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
         });
      })
   })
}

GoSection(allLinks);
GoSection(allBullets);
//End Section

//Start Show Hide Bullets
let toggleBullet = document.querySelectorAll('.toggle_bullet span');
let bulletsContainer = document.querySelector('.bullets');

let displayStorage = localStorage.getItem('option_display');

if(displayStorage !== null) {
    if(displayStorage === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector('.toggle_bullet .show').classList.add('active');
    } else {
       bulletsContainer.style.display = 'none';
       document.querySelector('.toggle_bullet .hide').classList.add('active');
    }
}

toggleBullet.forEach(span => {
   span.addEventListener('click', (e) => {
      if(e.target.dataset.display === 'show') {
        bulletsContainer.style.display = 'block';

        localStorage.setItem('option_display', 'block');
      } else {
          bulletsContainer.style.display = 'none';

          localStorage.setItem('option_display', 'none');
      }

      toogleChange(e);
   })
})
//End Show Hide Bullets

//Start Reload Button
document.querySelector('.reload').onclick = function () {
   
   localStorage.clear();
   
   window.location.reload();
}
//End Reload Button

//Toggle menu
let toggleMenu = document.querySelector('.toggle_menu');
let openLinks = document.querySelector('.links');

toggleMenu.onclick = function (e) {
   e.stopPropagation();

   openLinks.classList.toggle('open_menu');
   if(openLinks.classList.contains('open_menu')) {
      toggleMenu.classList.add('open_fleche');      
   } else {
      toggleMenu.classList.remove('open_fleche');
   }
}

document.addEventListener('click', (e) => {
   e.stopPropagation();

   if(e.target !== toggleMenu && e.target !== openLinks) {
      if(openLinks.classList.contains('open_menu' && toggleMenu.classList.contains('open_fleche'))) {}
        openLinks.classList.remove('open_menu');
        toggleMenu.classList.remove('open_fleche');
   }
})

//Start Change Position Header
let changeHeader = document.querySelectorAll('.position span');
let header = document.querySelector('.landing .head')

let positionStorage = localStorage.getItem('option_position');
if(positionStorage !== null) {
  if(positionStorage === 'fixed') {
     header.classList.add('pos_fixed');
     document.querySelector('.position .fixed').classList.add('active');
  } else {
     header.classList.remove('pos_fixed');
     document.querySelector('.position .relative').classList.add('active');
  }

}

changeHeader.forEach(head => {
    head.addEventListener('click', (e) => {
      if(e.target.classList.contains('fixed')) {
         header.classList.add('pos_fixed');
         localStorage.setItem('option_position', 'fixed');
      } else {
         header.classList.remove('pos_fixed');
         localStorage.setItem('option_position', 'relative');
      }

      toogleChange(e);
    })
})
//End Change Position Header
