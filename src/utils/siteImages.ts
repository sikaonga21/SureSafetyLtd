import { portfolioFeatured } from "@/data/portfolioImages";
import newsHero from "@/assets/images/news-hero.jpg";
import newsFallback from "@/assets/images/construction-1.jpg";

/** Site-wide imagery — local assets aligned with Sure Safety services */
export const siteImages = {
  hero: {
    civil: portfolioFeatured.heroCivil,
    electrical: portfolioFeatured.heroElectrical,
    maintenance: portfolioFeatured.heroMaintenance,
  },
  services: {
    civil: portfolioFeatured.servicesCivil,
    roads: portfolioFeatured.servicesRoads,
    electrical: portfolioFeatured.servicesElectrical,
    mechanical: portfolioFeatured.servicesMechanical,
    maintenance: portfolioFeatured.servicesMaintenance,
    paving: portfolioFeatured.servicesPaving,
  },
  about: {
    hero: portfolioFeatured.servicesElectrical,
    section: portfolioFeatured.about,
    team: portfolioFeatured.about,
  },
  projects: {
    hero: portfolioFeatured.projectsHero,
    residential: portfolioFeatured.heroCivil,
    corporate: portfolioFeatured.servicesInterior,
    industrial: portfolioFeatured.heroMaintenance,
    roads: portfolioFeatured.servicesRoads,
  },
  careers: {
    hero: portfolioFeatured.careersHero,
    banner: portfolioFeatured.careersBanner,
  },
  contact: {
    hero: portfolioFeatured.contactHero,
  },
  news: {
    hero: newsHero,
    fallback: newsFallback,
  },
} as const;
