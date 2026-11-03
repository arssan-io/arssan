"use client";

import { defineConfig, buildLegacyTheme } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes, SINGLETON_TYPES } from "./sanity/schemas";
import { structure } from "./sanity/structure";

const SINGLETON_NEW_DOCUMENT_FILTER = new Set(["publish", "discardChanges", "restore"]);

/**
 * Asana Minimal-Maximalist Dark Design System Studio Theme
 * Dark core (#0d0d0d canvas, #141416 surfaces, #ededed text, #646f79 muted, #ffffff accent)
 */
const asanaDarkTheme = buildLegacyTheme({
  "--black": "#0d0d0d",
  "--white": "#ffffff",
  "--gray": "#646f79",
  "--gray-base": "#646f79",
  "--component-bg": "#141416",
  "--component-text-color": "#ededed",
  "--brand-primary": "#ffffff",
  "--default-button-color": "#222225",
  "--default-button-primary-color": "#ffffff",
  "--default-button-success-color": "#4cc38a",
  "--default-button-danger-color": "#e5484d",
  "--state-info-color": "#ffffff",
  "--state-success-color": "#4cc38a",
  "--state-danger-color": "#e5484d",
  "--main-navigation-color": "#0d0d0d",
  "--main-navigation-color--inverted": "#ffffff",
  "--focus-color": "#ffffff",
});

export default defineConfig({
  name: "arssan-studio",
  title: "Arssan Studio CMS",
  basePath: "/studio",
  projectId,
  dataset,
  theme: asanaDarkTheme,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    codeInput(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({ action }) => action && SINGLETON_NEW_DOCUMENT_FILTER.has(action))
        : input,
  },
});
