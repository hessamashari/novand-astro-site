import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const serviceSchema = z.object({
  title: z.string(),
  eyebrow: z.string(),
  description: z.string(),
  intro: z.string(),
  capabilities: z.array(z.string()),
  environments: z.array(z.string()),
  related: z.array(z.string()),
  accent: z.enum(['dark', 'warm', 'light']).default('dark'),
});

const solutionSchema = z.object({
  title: z.string(),
  eyebrow: z.string(),
  description: z.string(),
  priorities: z.array(z.string()),
  relevantServices: z.array(z.string()),
});

const projectSchema = z.object({
  title: z.string(),
  category: z.string(),
  summary: z.string(),
  environment: z.string(),
  services: z.array(z.string()),
  technologies: z.array(z.string()),
  challenge: z.string(),
  solution: z.string(),
  result: z.string(),
  gallery: z.array(z.string()),
  date: z.string(),
  placeholder: z.boolean(),
});

const services = defineCollection({
  loader: file('./src/content/services.json'),
  schema: serviceSchema,
});

const solutions = defineCollection({
  loader: file('./src/content/solutions.json'),
  schema: solutionSchema,
});

const projects = defineCollection({
  loader: file('./src/content/projects.json'),
  schema: projectSchema,
});

export const collections = { services, solutions, projects };
