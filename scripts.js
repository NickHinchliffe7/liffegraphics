/* LIFFE */

/* OFFSCREEN MENU TOGGLE */
// (function mobileMenu() {
//   if (document.querySelector('.menu-icon')) {
//     let menuIcon = document.querySelector('.menu-icon')
//     menuIcon.addEventListener('click', function() {
//       document.body.classList.toggle('menu-active')
//     })
//   }
  
// })();


/* PORTFOLIO */
(function() {
  if (document.querySelector('.portfolio') && document.querySelector('.project-display')) {

    let projects = document.querySelectorAll('.project')
    let projDisplay = document.querySelector('.project-display')
    let projClose = document.querySelector('.project-display-close')
    let projFeatured = document.querySelector('.project-featured')
    let projList = document.querySelector('.project-list')
    let list = ``


    for (let i = 0; i < projects.length; i++) {
      let project = projects[i]     
      let thumb = project.querySelector('.project-thumbnail img').getAttribute('src')
      let image = project.querySelector('.project-image img').getAttribute('src')
      let caption = ``
      if (project.querySelector('.project-caption')) {
        caption = project.querySelector('.project-caption').textContent
      }
      list += `<div class="project-list-item" style="background-image: url(${thumb});" data-src="${image}" data-caption="${caption}"></div>`

      project.addEventListener('click', function() {
        document.body.classList.add('project-active')
          projFeatured.innerHTML = `<div><img src=${image} alt=""><div class="caption">${caption}</div></div>`
          
          highlightActiveListItem()
      });
    }

    projClose.addEventListener('click', function() {
      document.body.classList.remove('project-active')
    })

    projList.innerHTML = list
    let sideBar = document.querySelectorAll('.project-list-item')
    for (let j = 0; j < sideBar.length; j++) {
      let item = sideBar[j]
      let itemSrc = item.getAttribute('data-src')
      let itemCap = item.getAttribute('data-caption')
      item.addEventListener('click', function() {
        projFeatured.innerHTML = `<div><img src=${itemSrc} alt=""><div class="caption">${itemCap}</div></div>`
        highlightActiveListItem()
      })
    }

  }

  function highlightActiveListItem() {

    let projList = document.querySelector('.project-list')

    if (projList.querySelector('.project-list-active')) {
      projList.querySelector('.project-list-active').classList.remove('project-list-active')
    }
  
    let sideBar = document.querySelectorAll('.project-list-item')
    let activeSrc = document.querySelector('.project-featured img').getAttribute('src')

    console.log(sideBar)
    console.log(activeSrc)
  
    for (let i = 0; i < sideBar.length; i++) {
      if (sideBar[i].getAttribute('data-src') === activeSrc) {
        sideBar[i].classList.add('project-list-active')
      }
    }
    
  }

})();


