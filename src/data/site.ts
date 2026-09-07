export const company = {
  name: 'Novand',
  positioning: 'Integrated technology engineering and infrastructure partner',
  email: 'novand.info@gmail.com',
  phone: '+1 (555) 293-8471',
  address: 'Engineering & Infrastructure Systems',
  hours: 'Mon – Fri, 08:00 – 18:00',
};

/**
 * Resolves a root-relative path against the application's base URL.
 * Automatically adapts to GitHub Pages project subpaths (e.g. /novand-astro-site/)
 * and root deployments (local dev, AI Studio, or custom domains like novand.com).
 */
export function path(href: string): string {
  if (!href.startsWith('/')) return href;
  const rawBase = import.meta.env.BASE_URL || '/';
  const cleanBase = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;
  if (href === '/') {
    return cleanBase ? `${cleanBase}/` : '/';
  }
  return `${cleanBase}${href}`;
}

export const navigation = {
  primary: [
    { label: 'Home', href: path('/') },
    { label: 'About', href: path('/about') },
    { label: 'Services', href: path('/services') },
    { label: 'Solutions', href: path('/solutions') },
    { label: 'Projects', href: path('/projects') },
    { label: 'Consulting', href: path('/consulting') },
    { label: 'Contact', href: path('/contact') },
  ],
  services: [
    { id: 'network-infrastructure', label: 'Network Infrastructure & IT', href: path('/services/network-infrastructure') },
    { id: 'enterprise-services', label: 'Enterprise & Network Services', href: path('/services/enterprise-services') },
    { id: 'infrastructure-administration', label: 'Linux & Infrastructure Administration', href: path('/services/infrastructure-administration') },
    { id: 'smart-homes-buildings', label: 'Smart Homes & Buildings', href: path('/services/smart-homes-buildings') },
    { id: 'security-surveillance', label: 'Security & Surveillance', href: path('/services/security-surveillance') },
    { id: 'audio-power', label: 'Audio, Power & Integrated Systems', href: path('/services/audio-power') },
    { id: 'hardware-support', label: 'Hardware & Technical Support', href: path('/services/hardware-support') },
  ],
  solutions: [
    { id: 'business', label: 'Business & Enterprise', href: path('/solutions/business') },
    { id: 'education', label: 'Education', href: path('/solutions/education') },
    { id: 'residential', label: 'Residential', href: path('/solutions/residential') },
    { id: 'healthcare-hospitality', label: 'Healthcare & Hospitality', href: path('/solutions/healthcare-hospitality') },
    { id: 'specialized-facilities', label: 'Specialized Facilities', href: path('/solutions/specialized-facilities') },
  ],
};

export const capabilities = ['Networking', 'Infrastructure', 'Security', 'Automation', 'Virtualization', 'Smart Technology'];

export const process = [
  ['01', 'Understand', 'Clarify requirements, constraints, environment, and priorities.'],
  ['02', 'Design', 'Shape the architecture, equipment strategy, and implementation path.'],
  ['03', 'Implement', 'Configure, integrate, document, and hand over the working system.'],
  ['04', 'Support', 'Keep the environment understandable, maintainable, and ready to evolve.'],
] as const;

export const whyUs = [
  ['Integrated Expertise', 'Technology layers are considered together rather than as disconnected services.'],
  ['Practical Engineering', 'Recommendations are grounded in the real physical and operational environment.'],
  ['Scalable Infrastructure', 'Architecture should support future change without unnecessary complexity.'],
  ['Security & Reliability', 'Security and resilience are treated as system properties, not decorative features.'],
  ['End-to-End Delivery', 'Design, implementation, configuration, and support remain connected.'],
] as const;
