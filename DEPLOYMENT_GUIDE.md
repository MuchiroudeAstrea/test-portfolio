# Deployment Guide

This guide walks you through deploying your portfolio site to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your computer
- Your portfolio files ready

## Option 1: Deploy from `/docs` Folder (Recommended)

This method keeps your source and deployed files in the same branch.

### Step 1: Prepare Files

```bash
# Create docs folder if it doesn't exist
mkdir -p docs

# Copy all files to docs folder
cp index.html projects.html blog.html post.html robots.txt sitemap.html docs/
cp -r assets data docs/
