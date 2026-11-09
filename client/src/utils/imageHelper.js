/**
 * Helper to normalize and resolve image URLs for blogs, portfolios, and courses.
 * Handles:
 *  - Data URLs (data:image/...) -> returned immediately
 *  - Blob URLs (blob:...) -> returned immediately
 *  - Google Drive share links (drive.google.com/file/d/... -> direct export/view link)
 *  - Dropbox share links -> direct raw link
 *  - Imgur preview links -> direct image links
 *  - Relative local paths (/hero.png) -> intact
 *  - Empty, undefined or invalid strings -> fallback image
 */

export const DEFAULT_BLOG_FALLBACK =
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';

export const DEFAULT_PORTFOLIO_FALLBACK =
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';

export function resolveImageUrl(url, fallback = DEFAULT_BLOG_FALLBACK) {
  if (!url || typeof url !== 'string') return fallback;

  const trimmed = url.trim();
  if (!trimmed) return fallback;

  // Direct Base64 Data URL or Blob URL: return intact immediately
  if (trimmed.startsWith('data:image/') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // 1. Google Drive direct link converter
  // Matches: https://drive.google.com/file/d/FILE_ID/view... OR https://drive.google.com/open?id=FILE_ID
  const gDriveMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
  if (trimmed.includes('drive.google.com') && gDriveMatch && gDriveMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${gDriveMatch[1]}`;
  }

  // 2. Dropbox share link converter
  if (trimmed.includes('dropbox.com')) {
    return trimmed.replace('?dl=0', '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
  }

  // 3. Imgur gallery / page -> direct link
  if (trimmed.includes('imgur.com') && !trimmed.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    const imgurId = trimmed.split('/').pop().replace(/[?#].*$/, '');
    if (imgurId && !trimmed.includes('/a/') && !trimmed.includes('/gallery/')) {
      return `https://i.imgur.com/${imgurId}.jpg`;
    }
  }

  // 4. Return original URL (it's already a direct link or relative path)
  return trimmed;
}

export function handleImageError(e, fallback = DEFAULT_BLOG_FALLBACK) {
  if (e && e.target) {
    // Prevent infinite loop if fallback also errors
    if (e.target.src !== fallback) {
      e.target.onerror = null;
      e.target.src = fallback;
    }
  }
}

/**
 * Format bytes to human readable format (KB, MB)
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

/**
 * Reads an uploaded file, compresses/resizes if needed, and returns an optimized Base64 data URL.
 * Automatically constrains dimensions to maxWidth/maxHeight to maintain fast web load speeds and fit in DB.
 */
export function processImageFile(file, options = {}) {
  const { maxWidth = 1400, maxHeight = 1400, quality = 0.82 } = options;

  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided'));
    }

    if (!file.type.startsWith('image/')) {
      return reject(new Error('Selected file must be an image (PNG, JPG, WEBP, GIF, SVG)'));
    }

    // SVGs and GIFs preserve vector/animation data by reading directly as Data URL
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          dataUrl: reader.result,
          name: file.name,
          size: file.size,
          formattedSize: formatFileSize(file.size),
          type: file.type
        });
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
      return;
    }

    // Process raster image (JPEG, PNG, WEBP) via Canvas to resize and compress
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Draw image with smooth scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer image/webp if supported, or image/jpeg, or keep png if transparent
        const isPng = file.type === 'image/png';
        const mimeType = isPng ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);

        // Approximate bytes from Base64
        const base64Len = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const approxBytes = Math.round((base64Len * 3) / 4);

        resolve({
          dataUrl,
          name: file.name,
          size: approxBytes,
          formattedSize: formatFileSize(approxBytes),
          width,
          height,
          type: mimeType
        });
      };
      img.onerror = () => reject(new Error('Failed to parse and process the image'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Error reading image file'));
    reader.readAsDataURL(file);
  });
}
