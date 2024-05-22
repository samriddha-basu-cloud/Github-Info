// src/app/models/repo.model.ts
export interface Repo {
  name: string;
  description: string;
  topics: string[];
  homepage: string; // Add homepage property
  html_url: string;
  // Add other properties as needed
}
