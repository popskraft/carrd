#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path


def minify_css(source: str) -> str:
    """Very small CSS minifier: strips comments and collapses whitespace."""
    text = re.sub(r"/\*.*?\*/", "", source, flags=re.S)
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"\s*([{};:,])\s*", r"\1", text)
    text = text.replace(";}", "}")
    return text.strip()


def minify_js(source: str) -> str:
    """Tiny JS minifier for build assets; removes comments and extra spaces."""
    text = re.sub(r"/\*.*?\*/", "", source, flags=re.S)
    lines = []
    for raw_line in source.splitlines():
        # Remove // comments but keep protocol identifiers like http://
        line = re.sub(r"(?<!:)//.*", "", raw_line)
        line = line.strip()
        if line:
            lines.append(line)
    text = " ".join(lines)
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"\s*([{}()\[\];,:+\-*/<>=&|!?])\s*", r"\1", text)
    return text.strip()


def run(source_dir: Path, dist_dir: Path) -> None:
    if not source_dir.exists():
        raise SystemExit(f"Source directory '{source_dir}' does not exist")

    files_processed = 0
    for path in source_dir.rglob("*"):
        if path.suffix.lower() not in {".css", ".js"} or not path.is_file():
            continue

        rel_path = path.relative_to(source_dir)
        target_path = dist_dir.joinpath(rel_path)
        target_path.parent.mkdir(parents=True, exist_ok=True)

        contents = path.read_text(encoding="utf-8")
        minified = minify_css(contents) if path.suffix == ".css" else minify_js(contents)
        target_path.write_text(minified, encoding="utf-8")
        files_processed += 1
        print(f"[minify] {path} -> {target_path}")

    if files_processed == 0:
        print("No CSS or JS files found to minify.")
    else:
        print(f"Minified {files_processed} file(s) into '{dist_dir}'.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Minify CSS/JS files from plugins into a mirrored dist/plugins directory."
    )
    parser.add_argument(
        "--source",
        type=Path,
        default=Path("plugins"),
        help="Directory that contains original plugin assets (default: plugins)",
    )
    parser.add_argument(
        "--dist",
        type=Path,
        default=Path("dist/plugins"),
        help="Directory to write minified assets into (default: dist/plugins)",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    run(args.source.resolve(), args.dist.resolve())


if __name__ == "__main__":
    main()
