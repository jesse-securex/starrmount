/** Builds the public URL for a file in public/images (file names may contain spaces). */
export function imageUrl(fileName: string): string {
  return `${import.meta.env.BASE_URL}images/${encodeURIComponent(fileName)}`;
}

// Held so the browser keeps the decoded images ready for instant display.
const preloaded: HTMLImageElement[] = [];

/** Downloads and decodes images in the background so they show without delay when first rendered. */
export function preloadImages(fileNames: string[]): void {
  for (const fileName of fileNames) {
    const img = new Image();
    img.src = imageUrl(fileName);
    img.decode().catch(() => {});
    preloaded.push(img);
  }
}
