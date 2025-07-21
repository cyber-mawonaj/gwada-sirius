import { writable, derived } from 'svelte/store';

// Store pour la langue actuelle
export const currentLanguage = writable('fr');

// Traductions
const translations = {
  fr: {
    // Navigation
    nav_home: 'Accueil',
    nav_about: 'À Propos',
    nav_predictions: 'Prédictions',
    nav_science: 'Science',
    nav_culture: 'Culture',
    nav_observatory: 'Observatoire',
    nav_associations: 'Associations',
    
    // Hero
    hero_title1: 'Sirius',
    hero_title2: 'en Guadeloupe',
    hero_subtitle: 'Wep Ronpet - L\'Ouverture de l\'Année Cosmique',
    hero_description: 'Le rendez-vous millénaire entre Ciel, Science et Culture',
    hero_date: 'Lever héliaque : ',
    hero_date_value: '22 Juillet 2025',
    hero_cta_predictions: 'Découvrir les Prédictions',
    hero_cta_learn: 'En Savoir Plus',
    
    // About
    about_title: 'Le Lever Héliaque de Sirius',
    about_subtitle: 'Un phénomène astronomique millénaire',
    about_intro: 'Le lever héliaque de Sirius est un événement céleste qui a façonné les civilisations depuis des millénaires.',    
    // Features
    feature_astronomy_title: 'Astronomie',
    feature_astronomy_desc: 'Sirius, l\'étoile la plus brillante, guide de navigation céleste',
    feature_culture_title: 'Culture',
    feature_culture_desc: 'De l\'Égypte aux Dogons, un héritage universel',
    feature_spirituality_title: 'Spiritualité',
    feature_spirituality_desc: 'Renaissance, renouveau et connexion cosmique',
    
    // Predictions
    predictions_title: 'Prédictions 2025',
    predictions_subtitle: 'Calculez la date exacte pour votre lieu d\'observation',
    predictions_select_location: 'Sélectionnez votre lieu',
    predictions_results_for: 'Résultats pour',
    predictions_heliacal_rising: 'Lever héliaque',
    predictions_best_observation: 'Meilleure observation',
    predictions_visibility_duration: 'Durée de visibilité',
    predictions_azimuth: 'Azimut au lever',
    predictions_max_altitude: 'Altitude maximale',
    predictions_magnitude: 'Magnitude apparente',
    
    // Science
    science_title: 'La Science du Lever Héliaque',
    science_subtitle: 'Comprendre le phénomène astronomique',
    
    // Culture
    culture_title: 'Héritage Culturel',
    culture_subtitle: 'Sirius à travers les civilisations',
    culture_timeline_title: 'Chronologie du Savoir',
    
    // Observatory
    observatory_title: 'Guide d\'Observation',
    observatory_subtitle: 'Tout pour observer Sirius en Guadeloupe',
    
    // Associations
    associations_title: 'Associations qui fêtent le Wep Ronpet',
    associations_subtitle: 'Découvrez les événements et communautés qui célèbrent le Nouvel An Kamit',
    associations_events_title: 'Événements Wep Ronpet 2025',
    associations_community_title: 'Communauté & Ressources',
    associations_video_title: 'Découvrir le Wep Ronpet',
    associations_event1_title: 'Nouvel An Kamite',
    associations_event1_organizer: 'Afrocentricity International & Famille Muntu • GRATUIT - de 16 ans',
    associations_event1_desc: 'Temps sacré de passage vers une nouvelle rotation cosmique, vécu en harmonie avec les lois de l\'univers. Renouons avec nos racines spirituelles, honorons nos ancêtres, et réalignons nos vies sur les principes de Maât. Cérémonie et rituels, gastronomie kamite, marché artisanal.',
    associations_event2_title: 'Nouvel An Kamit 6262',
    associations_event2_organizer: 'Mouvement Politique Spirituel MUN • Le Lamentin, Martinique',
    associations_event2_desc: 'Célébration avec la Nouvelle Lune au KAY NZINGHA. Cérémonie, rituels, conférences, dîner kamit, soirée dansante pour la puissance et la confiance du pays. De 15h à minuit.',
    associations_link1_title: '14ème Membre',
    associations_link1_desc: 'Site web - Événements',
    associations_link2_title: 'Mouvement Politique Spirituel MUN',
    associations_link2_desc: 'Page Facebook officielle',
    
    // Footer
    footer_copyright: 'Projet réalisé avec ❤️ par',
    footer_and: 'et'
  },
  
  en: {
    // Navigation
    nav_home: 'Home',
    nav_about: 'About',
    nav_predictions: 'Predictions',
    nav_science: 'Science',
    nav_culture: 'Culture',
    nav_observatory: 'Observatory',
    nav_associations: 'Associations',
    
    // Hero
    hero_title1: 'Sirius',
    hero_title2: 'in Guadeloupe',
    hero_subtitle: 'Wep Ronpet - The Opening of the Cosmic Year',
    hero_description: 'The millennial meeting between Sky, Science and Culture',
    hero_date: 'Heliacal rising: ',
    hero_date_value: 'July 22, 2025',
    hero_cta_predictions: 'Discover Predictions',
    hero_cta_learn: 'Learn More',
    
    // About    about_title: 'The Heliacal Rising of Sirius',
    about_subtitle: 'A millennial astronomical phenomenon',
    about_intro: 'The heliacal rising of Sirius is a celestial event that has shaped civilizations for millennia.',
    
    // Features
    feature_astronomy_title: 'Astronomy',
    feature_astronomy_desc: 'Sirius, the brightest star, celestial navigation guide',
    feature_culture_title: 'Culture',
    feature_culture_desc: 'From Egypt to the Dogon, a universal heritage',
    feature_spirituality_title: 'Spirituality',
    feature_spirituality_desc: 'Renaissance, renewal and cosmic connection',
    
    // Predictions
    predictions_title: 'Predictions 2025',
    predictions_subtitle: 'Calculate the exact date for your observation location',
    predictions_select_location: 'Select your location',
    predictions_results_for: 'Results for',
    predictions_heliacal_rising: 'Heliacal rising',
    predictions_best_observation: 'Best observation',
    predictions_visibility_duration: 'Visibility duration',
    predictions_azimuth: 'Azimuth at rising',
    predictions_max_altitude: 'Maximum altitude',
    predictions_magnitude: 'Apparent magnitude',
    
    // Science
    science_title: 'The Science of Heliacal Rising',
    science_subtitle: 'Understanding the astronomical phenomenon',
    
    // Culture
    culture_title: 'Cultural Heritage',
    culture_subtitle: 'Sirius through civilizations',
    culture_timeline_title: 'Timeline of Knowledge',
    
    // Observatory
    observatory_title: 'Observation Guide',
    observatory_subtitle: 'Everything to observe Sirius in Guadeloupe',
    
    // Associations
    associations_title: 'Associations celebrating Wep Ronpet',
    associations_subtitle: 'Discover events and communities celebrating the Kamit New Year',
    associations_events_title: 'Wep Ronpet 2025 Events',
    associations_community_title: 'Community & Resources',
    associations_video_title: 'Discover Wep Ronpet',
    associations_event1_title: 'Kamite New Year',
    associations_event1_organizer: 'Afrocentricity International & Famille Muntu • FREE under 16',
    associations_event1_desc: 'Sacred time of passage to a new cosmic rotation, lived in harmony with the laws of the universe. Let us reconnect with our spiritual roots, honor our ancestors, and realign our lives with the principles of Maat. Ceremony and rituals, Kamite gastronomy, artisan market.',
    associations_event2_title: 'Kamit New Year 6262',
    associations_event2_organizer: 'Mouvement Politique Spirituel MUN • Le Lamentin, Martinique',
    associations_event2_desc: 'Celebration with the New Moon at KAY NZINGHA. Ceremony, rituals, conferences, Kamit dinner, dance evening for the power and confidence of the country. From 3pm to midnight.',
    associations_link1_title: '14th Member',
    associations_link1_desc: 'Website - Events',
    associations_link2_title: 'Mouvement Politique Spirituel MUN',
    associations_link2_desc: 'Official Facebook page',
    
    // Footer
    footer_copyright: 'Project made with ❤️ by',
    footer_and: 'and'
  },
  
  ht: {
    // Navigation
    nav_home: 'Akèy',
    nav_about: 'Konsènan',
    nav_predictions: 'Prediksyon',
    nav_science: 'Syans',
    nav_culture: 'Kilti',
    nav_observatory: 'Obsèvatwa',
    nav_associations: 'Asosyasyon',
    
    // Hero
    hero_title1: 'Sirius',
    hero_title2: 'nan Gwadloup',
    hero_subtitle: 'Wep Ronpet - Ouvèti Ane Kosmik la',
    hero_description: 'Randevou milenè ant Syèl, Syans ak Kilti',
    hero_date: 'Leve elyak: ',
    hero_date_value: '22 Jiyè 2025',
    hero_cta_predictions: 'Dekouvri Prediksyon yo',    hero_cta_learn: 'Aprann Plis',
    
    // About
    about_title: 'Leve Elyak Sirius la',
    about_subtitle: 'Yon fenomèn astwonomik milenè',
    about_intro: 'Leve elyak Sirius se yon evènman selès ki fòme sivilizasyon yo depi plizyè milye ane.',
    
    // Features
    feature_astronomy_title: 'Astwonomi',
    feature_astronomy_desc: 'Sirius, zetwal ki pi klere a, gid navigasyon selès',
    feature_culture_title: 'Kilti',
    feature_culture_desc: 'Depi Lejip rive Dogon yo, yon eritaj inivèsèl',
    feature_spirituality_title: 'Espiritwalite',
    feature_spirituality_desc: 'Renesans, renouvèlman ak koneksyon kosmik',
    
    // Predictions
    predictions_title: 'Prediksyon 2025',
    predictions_subtitle: 'Kalkile dat egzak pou kote w ap obsève a',
    predictions_select_location: 'Chwazi kote ou ye a',
    predictions_results_for: 'Rezilta pou',
    predictions_heliacal_rising: 'Leve elyak',
    predictions_best_observation: 'Pi bon obsèvasyon',
    predictions_visibility_duration: 'Dire vizibilite',
    predictions_azimuth: 'Azimit nan leve',
    predictions_max_altitude: 'Altitid maksimòm',
    predictions_magnitude: 'Mayitid aparan',
    
    // Science
    science_title: 'Syans Leve Elyak la',
    science_subtitle: 'Konprann fenomèn astwonomik la',
    
    // Culture
    culture_title: 'Eritaj Kiltirèl',
    culture_subtitle: 'Sirius atravè sivilizasyon yo',
    culture_timeline_title: 'Kwonoloji Konesans lan',
    
    // Observatory
    observatory_title: 'Gid Obsèvasyon',
    observatory_subtitle: 'Tout bagay pou obsève Sirius nan Gwadloup',
    
    // Associations
    associations_title: 'Asosyasyon ki fète Wep Ronpet',
    associations_subtitle: 'Dekouvri evènman ak kominote ki selebre Nouvel An Kamit la',
    associations_events_title: 'Evènman Wep Ronpet 2025',
    associations_community_title: 'Kominote & Resous',
    associations_video_title: 'Dekouvri Wep Ronpet',
    associations_event1_title: 'Nouvel An Kamite',
    associations_event1_organizer: 'Afrocentricity International & Famille Muntu • GRATIS - nan 16 an',
    associations_event1_desc: 'Tan sakre pasaj nan yon nouvo wotasyon kosmik, yo viv nan amoni ak lwa inivè yo. Ann rekonekte ak rasin espirituyèl nou yo, onore zansèt nou yo, ak realinye lavi nou yo ak prensip Maât yo. Seremoni ak rituyèl, gastromi kamite, mache atizan.',
    associations_event2_title: 'Nouvel An Kamit 6262',
    associations_event2_organizer: 'Mouvement Politique Spirituel MUN • Le Lamentin, Matinik',
    associations_event2_desc: 'Selebrasyon ak Nouvo Lalin nan nan KAY NZINGHA. Seremoni, rituyèl, konferans, dine kamit, sware danse pou pouvwa ak konfyans peyi a. Depi 3è nan midi.',
    associations_link1_title: '14yèm Manm',
    associations_link1_desc: 'Sit entènèt - Evènman',
    associations_link2_title: 'Mouvement Politique Spirituel MUN',
    associations_link2_desc: 'Paj Facebook ofisyèl',
    
    // Footer
    footer_copyright: 'Pwojè realize avèk ❤️ pa',
    footer_and: 'ak'
  }
};

// Store dérivé pour obtenir les traductions de la langue actuelle
export const t = derived(
  currentLanguage,
  $currentLanguage => key => {
    return translations[$currentLanguage]?.[key] || translations['fr'][key] || key;
  }
);

// Fonction pour changer de langue
export function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage.set(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('preferred-language', lang);
    }
  }
}
// Initialiser avec la langue sauvegardée ou détecter la langue du navigateur
export function initLanguage() {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('preferred-language');
    if (saved && translations[saved]) {
      currentLanguage.set(saved);
      return;
    }
  }
  
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.slice(0, 2);
    if (translations[browserLang]) {
      currentLanguage.set(browserLang);
    }
  }
}

// Liste des langues disponibles
export const availableLanguages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ht', name: 'Kreyòl Ayisyen', flag: '🇭🇹' }
];