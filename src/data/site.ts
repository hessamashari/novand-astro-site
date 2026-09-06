export const company = {
  name: 'Novand',
  positioning: 'Integrated technology engineering and infrastructure partner',
  email: '[business-email@example.com]',
  phone: '[+00 000 000 0000]',
  address: '[Business address placeholder]',
  hours: '[Working hours placeholder]',
};

export const navigation = {
  primary: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Projects', href: '/projects' },
    { label: 'Consulting', href: '/consulting' },
    { label: 'Contact', href: '/contact' },
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
