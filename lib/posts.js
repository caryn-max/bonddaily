// Blog post data — each post is a JS object with HTML content
// Import all posts here and export helper functions

import { allPosts } from "../content/blog/index";

export function getAllPosts() {
  return allPosts
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return allPosts.find((p) => p.slug === slug) || null;
}

export function getAllSlugs() {
  return allPosts.map((p) => p.slug);
}

export function getPostsByTag(tag) {
  return allPosts
    .filter((p) => p.tags.includes(tag))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getAllTags() {
  const tags = new Set();
  allPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
