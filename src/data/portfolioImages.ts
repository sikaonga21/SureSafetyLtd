import external01 from "@/assets/portfolio/external/external-01.png";
import external02 from "@/assets/portfolio/external/external-02.png";
import external03 from "@/assets/portfolio/external/external-03.png";
import external04 from "@/assets/portfolio/external/external-04.png";
import interior01 from "@/assets/portfolio/interior/interior-01.png";
import interior02 from "@/assets/portfolio/interior/interior-02.png";
import interior03 from "@/assets/portfolio/interior/interior-03.jpg";
import interior04 from "@/assets/portfolio/interior/interior-04.jpg";
import plan01 from "@/assets/portfolio/plans/plan-01.png";
import plan02 from "@/assets/portfolio/plans/plan-02.png";
import serviceElectrical from "@/assets/portfolio/services/electrical.png";
import servicePavingLaying from "@/assets/portfolio/services/paving-laying.png";
import servicePavingCut from "@/assets/portfolio/services/paving-cut.jpg";
import serviceRoads from "@/assets/portfolio/services/roads.jpg";
import serviceMaintenance from "@/assets/portfolio/services/maintenance.jpg";
import serviceCivil from "@/assets/portfolio/services/civil.jpg";
import serviceMechanical from "@/assets/portfolio/services/mechanical.jpeg";
import serviceCareers from "@/assets/portfolio/services/careers.jpg";
import serviceContact from "@/assets/portfolio/services/contact.jpg";
import aboutTeam from "@/assets/images/home-section-about.jpg";

export type PortfolioCategory = "external" | "interior" | "plans";

export type PortfolioImage = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

export const portfolioCategories: {
  id: PortfolioCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "external",
    label: "External",
    description:
      "Residential and commercial builds — structural shells, industrial facilities, paving, and striking exterior finishes.",
  },
  {
    id: "interior",
    label: "Interior",
    description:
      "Contemporary interiors, kitchens, premium finishes, and professional painting for homes and workplaces.",
  },
  {
    id: "plans",
    label: "Plans",
    description:
      "Architectural drawings, structural layouts, and detailed planning from concept through to construction.",
  },
];

export const portfolioImages: Record<PortfolioCategory, PortfolioImage[]> = {
  external: [
    {
      src: external01,
      alt: "Modern two-storey residential house under construction with scaffolding",
      title: "Residential New Build",
      description:
        "Full structural delivery for modern homes — from groundworks and framing through to roofing and exterior completion.",
    },
    {
      src: external02,
      alt: "Large industrial steel warehouse frame under construction against a clear sky",
      title: "Industrial Warehouse",
      description:
        "Pre-engineered metal buildings and large-span steel structures for warehouses, factories, and commercial facilities.",
    },
    {
      src: external03,
      alt: "3D architectural house model on technical blueprints",
      title: "Architectural Design",
      description:
        "Turning approved plans into built reality with precision layout, material selection, and on-site project coordination.",
    },
    {
      src: external04,
      alt: "Worker precision-cutting a stone paver with a power saw on site",
      title: "Precision Paving",
      description:
        "Custom stone cutting and expert paver installation for driveways, patios, and walkways built to last.",
    },
  ],
  interior: [
    {
      src: interior01,
      alt: "Luxury open-plan living room with polished floors and warm ambient lighting",
      title: "Premium Living Space",
      description:
        "High-end residential finishing — flooring, lighting, and spatial design that elevates everyday living.",
    },
    {
      src: interior02,
      alt: "Modern kitchen with vibrant orange cabinetry, white island, and garden views",
      title: "Bespoke Kitchen Design",
      description:
        "Custom cabinetry, worktops, and integrated appliances for bold, functional kitchen spaces.",
    },
    {
      src: interior03,
      alt: "Construction professional reviewing building work on site",
      title: "Interior Fit-Out",
      description:
        "Complete interior refurbishment including partitions, ceilings, and coordinated MEP installations.",
    },
    {
      src: interior04,
      alt: "Active construction site with structural works in progress",
      title: "Renovation & Refurbishment",
      description:
        "Transforming existing properties with structural upgrades, modern finishes, and compliant safety standards.",
    },
  ],
  plans: [
    {
      src: plan01,
      alt: "Residential floor plans and 3D house model on architectural drawings",
      title: "Residential Floor Plans",
      description:
        "Detailed layouts for new builds and extensions — room planning, services coordination, and client-ready drawings.",
    },
    {
      src: plan02,
      alt: "Cross-section 3D model showing foundation, insulation, and interior floor layers on blueprints",
      title: "Structural & Build-Up Detail",
      description:
        "Layer-by-layer construction planning from foundations and rebar through to finished interior surfaces.",
    },
  ],
};

/** Featured images for hero banners, services, and key page sections */
export const portfolioFeatured = {
  heroCivil: external01,
  heroElectrical: serviceElectrical,
  heroMaintenance: external02,
  about: aboutTeam,
  projectsHero: external02,
  servicesCivil: serviceCivil,
  servicesInterior: interior02,
  servicesRoads: serviceRoads,
  servicesPaving: servicePavingLaying,
  servicesPavingCut: servicePavingCut,
  servicesElectrical: serviceElectrical,
  servicesMechanical: serviceMechanical,
  servicesMaintenance: serviceMaintenance,
  careersHero: serviceCareers,
  careersBanner: serviceCareers,
  contactHero: serviceContact,
} as const;
