window.addEventListener('scroll',()=>{
      document.querySelectorAll('.animate').forEach(el=>{
        if(el.getBoundingClientRect().top < window.innerHeight - 50){
          el.classList.add('show');
        }
      });
    });

