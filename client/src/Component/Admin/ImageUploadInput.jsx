import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import { processImageFile, resolveImageUrl, formatFileSize } from '../../utils/imageHelper';

export default function ImageUploadInput({
  value = '',
  onChange,
  label = 'Cover Image',
  fallbackUrl = '',
  recommendedText = 'Recommended: 1200×630px JPG, PNG, WEBP, or SVG'
}) {
  // Determine initial mode based on value
  const isDataUrl = value && (value.startsWith('data:image/') || value.startsWith('blob:'));
  const [mode, setMode] = useState(isDataUrl || !value ? 'file' : 'url');
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [fileMeta, setFileMeta] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setErrorMsg('');
    setProcessing(true);

    try {
      const result = await processImageFile(file, { maxWidth: 1400, maxHeight: 1400, quality: 0.84 });
      setFileMeta({
        name: result.name,
        size: result.formattedSize,
        dimensions: result.width && result.height ? `${result.width}×${result.height}px` : null
      });
      onChange(result.dataUrl);
    } catch (err) {
      console.error('Image processing error:', err);
      setErrorMsg(err.message || 'Failed to process selected image');
    } finally {
      setProcessing(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    onChange('');
    setFileMeta(null);
    setErrorMsg('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const displayImage = value ? resolveImageUrl(value, fallbackUrl) : '';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-slate-700 dark:text-slate-300 font-bold text-xs">
          {label}
        </label>

        {/* Tab Toggle: Upload from Files vs Image URL */}
        <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-[11px]">
          <button
            type="button"
            onClick={() => {
              setMode('file');
              setErrorMsg('');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-all ${
              mode === 'file'
                ? 'bg-white dark:bg-slate-900 text-lime-600 dark:text-lime-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('url');
              setErrorMsg('');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-all ${
              mode === 'url'
                ? 'bg-white dark:bg-slate-900 text-lime-600 dark:text-lime-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Image URL</span>
          </button>
        </div>
      </div>

      {/* Mode 1: File Upload */}
      {mode === 'file' && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {value ? (
            /* Selected / Current Image Preview Card */
            <div className="relative p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0">
                  <img
                    src={displayImage}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (fallbackUrl) e.target.src = fallbackUrl;
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {fileMeta?.name || (value.startsWith('data:') ? 'Custom Uploaded File' : 'Attached Image')}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                    {fileMeta?.size && (
                      <span className="font-mono bg-slate-200/70 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                        {fileMeta.size}
                      </span>
                    )}
                    {fileMeta?.dimensions && (
                      <span className="font-mono text-slate-500 dark:text-slate-400">
                        {fileMeta.dimensions}
                      </span>
                    )}
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Ready
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-lime-50 dark:bg-lime-500/10 text-lime-600 dark:text-lime-400 border border-lime-200 dark:border-lime-500/20 hover:bg-lime-400 hover:text-[#022620] dark:hover:bg-lime-400 dark:hover:text-slate-950 transition-colors flex items-center gap-1"
                  title="Upload different file"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Change</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-1.5 rounded-lg text-red-500 hover:text-white hover:bg-red-500 transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Drag and Drop Zone */
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-4 text-center transition-all ${
                dragActive
                  ? 'border-lime-500 bg-lime-50/50 dark:bg-lime-950/20'
                  : 'border-slate-300 dark:border-slate-800 hover:border-lime-500/60 bg-slate-50/70 dark:bg-slate-950/60'
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-lime-100 dark:bg-lime-500/10 text-lime-600 dark:text-lime-400 flex items-center justify-center">
                  {processing ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {processing
                      ? 'Processing and optimizing image...'
                      : 'Click to upload from files, or drag & drop'}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                    Supports PNG, JPG, JPEG, WEBP, GIF, SVG (auto-optimized)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: External Image URL */}
      {mode === 'url' && (
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              placeholder="https://images.unsplash.com/... or Google Drive / direct link"
              value={value.startsWith('data:') ? '' : value}
              onChange={(e) => {
                onChange(e.target.value);
                setFileMeta(null);
                setErrorMsg('');
              }}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 pr-9 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-lime-500 dark:focus:border-lime-400 text-xs"
            />
            {value && !value.startsWith('data:') && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                title="Clear URL"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {value && !value.startsWith('data:') && (
            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <img
                src={displayImage}
                alt="URL Preview"
                className="w-12 h-12 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shrink-0"
                onError={(e) => {
                  if (fallbackUrl) e.target.src = fallbackUrl;
                }}
              />
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">
                  Live Web Image Preview
                </span>
                <span className="text-[10px] text-slate-400 truncate block max-w-xs">
                  {value}
                </span>
              </div>
            </div>
          )}

          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            Supports Unsplash, Google Drive share links, Imgur, or any direct image URL.
          </p>
        </div>
      )}

      {/* Error Message if any */}
      {errorMsg && (
        <div className="flex items-center gap-1.5 text-[11px] text-red-500 dark:text-red-400">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Recommended dimensions tip */}
      {recommendedText && (
        <p className="text-[10px] text-slate-400 dark:text-slate-500">
          {recommendedText}
        </p>
      )}
    </div>
  );
}

