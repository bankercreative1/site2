#!/usr/bin/env python3
"""Check local links and assets referenced by this static site."""

from __future__ import annotations

import re
import sys
from collections import deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent.parent
IGNORED_SCHEMES = {
    "about",
    "blob",
    "data",
    "http",
    "https",
    "javascript",
    "mailto",
    "tel",
}
HTML_ATTRIBUTES = {
    "a": ("href",),
    "audio": ("src",),
    "embed": ("src",),
    "iframe": ("src",),
    "img": ("src", "srcset"),
    "input": ("src",),
    "link": ("href",),
    "object": ("data",),
    "script": ("src",),
    "source": ("src", "srcset"),
    "track": ("src",),
    "video": ("poster", "src"),
}
CSS_REFERENCE = re.compile(
    r"""url\(\s*(?P<quote>['"]?)(?P<url>.*?)(?P=quote)\s*\)"""
    r"""|@import\s+(?:url\(\s*)?(?P<import_quote>['"])(?P<import>.*?)(?P=import_quote)""",
    re.IGNORECASE,
)


class ReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[tuple[str, str]] = []
        self.inline_styles: list[str] = []
        self._in_style = False

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        values = dict(attrs)
        for attribute in HTML_ATTRIBUTES.get(tag, ()):
            value = values.get(attribute)
            if not value:
                continue
            if attribute == "srcset":
                for candidate in parse_srcset(value):
                    self.references.append((f"{tag}[{attribute}]", candidate))
            else:
                self.references.append((f"{tag}[{attribute}]", value))

        if values.get("style"):
            self.inline_styles.append(values["style"] or "")
        if tag == "style":
            self._in_style = True

    def handle_startendtag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag: str) -> None:
        if tag == "style":
            self._in_style = False

    def handle_data(self, data: str) -> None:
        if self._in_style:
            self.inline_styles.append(data)


def parse_srcset(value: str) -> list[str]:
    return [
        candidate.strip().split()[0]
        for candidate in value.split(",")
        if candidate.strip()
    ]


def css_references(css: str) -> list[str]:
    return [
        match.group("url") or match.group("import")
        for match in CSS_REFERENCE.finditer(css)
    ]


def local_target(raw_reference: str, source: Path) -> Path | None:
    reference = raw_reference.strip()
    if not reference or reference.startswith(("#", "//")):
        return None

    parsed = urlsplit(reference)
    if parsed.scheme.lower() in IGNORED_SCHEMES or parsed.netloc:
        return None

    path = unquote(parsed.path).replace("\\", "/")
    if not path:
        return None
    if path == "/video" or path.startswith("/video/"):
        return None

    target = ROOT / path.lstrip("/") if path.startswith("/") else source.parent / path
    return Path(str(target))


def resolve_existing_target(target: Path) -> Path | None:
    candidates = [target]
    if target.is_dir() or str(target).endswith("/"):
        candidates.append(target / "index.html")
    elif not target.suffix:
        candidates.extend((target / "index.html", target.with_suffix(".html")))

    for candidate in candidates:
        try:
            candidate.resolve().relative_to(ROOT)
        except ValueError:
            continue
        if candidate.is_file():
            return candidate.resolve()
    return None


def display(path: Path) -> str:
    try:
        return path.resolve().relative_to(ROOT).as_posix()
    except ValueError:
        return str(path)


def main() -> int:
    html_pages = sorted(
        path
        for path in ROOT.rglob("*.html")
        if not any(part.startswith(".") for part in path.relative_to(ROOT).parts)
    )
    failures: list[str] = []
    checked_references = 0
    css_queue: deque[Path] = deque()
    checked_css: set[Path] = set()

    def check(reference: str, source: Path, context: str) -> None:
        nonlocal checked_references
        target = local_target(reference, source)
        if target is None:
            return
        checked_references += 1
        resolved = resolve_existing_target(target)
        if resolved is None:
            failures.append(
                f"{display(source)}: {context} -> {reference!r} (missing)"
            )
        elif resolved.suffix.lower() == ".css":
            css_queue.append(resolved)

    for page in html_pages:
        parser = ReferenceParser()
        try:
            parser.feed(page.read_text(encoding="utf-8"))
        except (OSError, UnicodeError) as error:
            failures.append(f"{display(page)}: could not parse: {error}")
            continue

        for context, reference in parser.references:
            check(reference, page, context)
        for inline_style in parser.inline_styles:
            for reference in css_references(inline_style):
                check(reference, page, "inline CSS")

    while css_queue:
        stylesheet = css_queue.popleft()
        if stylesheet in checked_css:
            continue
        checked_css.add(stylesheet)
        try:
            css = stylesheet.read_text(encoding="utf-8")
        except (OSError, UnicodeError) as error:
            failures.append(f"{display(stylesheet)}: could not read: {error}")
            continue
        for reference in css_references(css):
            check(reference, stylesheet, "CSS url/import")

    print(
        f"Checked {len(html_pages)} HTML pages, {len(checked_css)} stylesheets, "
        f"and {checked_references} local references."
    )
    if failures:
        print(f"\nFound {len(failures)} broken local reference(s):", file=sys.stderr)
        for failure in failures:
            print(f"- {failure}", file=sys.stderr)
        return 1

    print("No broken local links or missing assets found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())