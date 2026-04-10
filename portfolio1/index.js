function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card-hover");

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("hovered");
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card'); // Sélectionner toutes les cartes

    function checkVisibility() {
        const windowHeight = window.innerHeight;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            // Vérifier si la carte est visible dans la fenêtre
            if (cardTop < windowHeight && cardTop > 0) {
                card.querySelector('.card__link').classList.add('visible'); // Ajouter la classe pour déclencher l'animation du bouton
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Vérifier la visibilité au chargement de la page
});














document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.custom-cursor');
  
  // Mouvement de base
  document.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
      });
  });

  // Changement au survol des éléments interactifs
  const interactiveElements = document.querySelectorAll('button, a, input, .interactive');
  interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
          cursor.style.backgroundImage = "url('./img/etoile.gif')";
      });
      
      element.addEventListener('mouseleave', () => {
          cursor.style.backgroundImage = "url('./img/etoile2.gif')";
      });
  });

  // Changement au clic
  document.addEventListener('mousedown', () => {
      cursor.style.backgroundImage = "url('./img/etoile4.gif')";
  });
  
  document.addEventListener('mouseup', () => {
      cursor.style.backgroundImage = "url('./img/etoile2.gif')";
  });
});










document.addEventListener('DOMContentLoaded', () => {
    const scrollingDivs = document.querySelectorAll('.messagedefilant div');
    
    scrollingDivs.forEach(div => {
        div.addEventListener('mouseenter', () => {
            div.style.animationPlayState = 'paused';
        });
        
        div.addEventListener('mouseleave', () => {
            div.style.animationPlayState = 'running';
        });
    });
});
