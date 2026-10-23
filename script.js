// Tableau pour stocker les chemins des 36 photos de Grèce
let photosGrece = [];
for (let i = 1; i <= 36; i++) {
    photosGrece.push(`Grèce/Grece-${i}.JPG`); // Adapte en .jpg si besoin
}

let currentIndex = 0;

// Générer les miniatures dans la barre du bas au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const thumbsContainer = document.getElementById('lightbox-thumbnails');
    if (thumbsContainer) {
        photosGrece.forEach((photo, index) => {
            const thumb = document.createElement('img');
            thumb.src = photo;
            thumb.alt = `Miniature ${index + 1}`;
            thumb.className = 'lightbox-thumb';
            thumb.addEventListener('click', () => {
                currentIndex = index;
                afficherLightbox();
            });
            thumbsContainer.appendChild(thumb);
        });
    }
});

// Fonction déclenchée au clic sur la tuile "Grèce"
function ouvrirEvenement(nomEvenement) {
    if (nomEvenement === 'Grèce') {
        currentIndex = 0;
        afficherLightbox();
    }
}

// Affiche la lightbox, met à jour l'image, le compteur et la miniature active
function afficherLightbox() {
    const lightbox = document.getElementById('lightbox');
    const imgElement = document.getElementById('lightbox-img');
    const counterElement = document.getElementById('lightbox-counter');

    imgElement.src = photosGrece[currentIndex];
    counterElement.innerText = `${currentIndex + 1} / ${photosGrece.length}`;
    lightbox.style.display = 'flex';

    // Mettre à jour les miniatures (classe active + scroll auto vers la photo active)
    const thumbs = document.querySelectorAll('.lightbox-thumb');
    thumbs.forEach((thumb, index) => {
        if (index === currentIndex) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Change de photo avec les flèches (-1 pour précédent, +1 pour suivant)
function changerPhoto(direction) {
    currentIndex += direction;

    if (currentIndex >= photosGrece.length) {
        currentIndex = 0;
    }
    if (currentIndex < 0) {
        currentIndex = photosGrece.length - 1;
    }

    afficherLightbox();
}

// Fermeture de la lightbox via la croix
document.getElementById('lightbox-close').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
});

// Fermeture si on clique en dehors de l'image (sur le fond noir, mais pas sur la barre de miniatures)
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        document.getElementById('lightbox').style.display = 'none';
    }
});

// Navigation au clavier (Flèches gauche/droite et Échap pour fermer)
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') changerPhoto(1);
        if (e.key === 'ArrowLeft') changerPhoto(-1);
        if (e.key === 'Escape') lightbox.style.display = 'none';
    }
});

// Fonction pour fermer la lightbox
function fermerLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}