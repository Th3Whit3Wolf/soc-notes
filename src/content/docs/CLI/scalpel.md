---
title: Scalpel
template: doc
hero: 
    title: 'Scalpel'
    tagline: a fast file carver that reads a database of header and footer definitions and extracts matching files from a set of image files or raw device files.
---

## Options

| option | description |
| :----- | ----------- |
| -b  | Carve files even if defined footers aren't discovered within maximum carve size for file type [foremost 0.69 compat mode] |
| -c | Choose configuration file.
| -d | Generate header/footer database; will bypass certain optimizations and discover all footers, so performance suffers. Doesn't affect the set of files carved.  **EXPERIMENTAL** |
| -h | Print this help message and exit |
| -i | Read names of disk images from specified file |
| -m | Generate/update carve coverage blockmap file. The first 32bit unsigned int in the file identifies the block size. Thereafter each 32bit unsigned int entry in the blockmap file corresponds to one block in the image file.  Each entry counts how many carved files contain this block. Requires more memory and disk.  **EXPERIMENTAL** |
| -n | Don't add extensions to extracted files |
| -o | Set output directory for carved files |
| -O | Don't organize carved files by type. Default is to organize carved files into subdirectories |
| -p | Perform image file preview; audit log indicates which files would have been carved, but no files are actually carved |
| -q | Carve only when header is cluster-aligned |
| -r | Find only first of overlapping headers/footers [foremost 0.69 compat mode] |
| -s | Skip n bytes in each disk image before carving |
| -t | Set directory for coverage blockmap.  **EXPERIMENTAL** |
| -u | Use carve coverage blockmap when carving. Carve only sections of the image whose entries in the blockmap are 0.  These areas are treated as contiguous regions.  **EXPERIMENTAL** |
| -V | Print copyright information and exit |
| -v | Verbose mode |

## Usage

Scalpel uses a targeted approach, so we need to know what type of file that we’re looking for.
Edit `/etc/scalpel/scalpel.conf` and uncomment the relevant files for what you're looking for.

```bash
sudo nano /etc/scalpel/scalpel.conf
```


```bash
scalpel -b -o <output> <disk image file>
```